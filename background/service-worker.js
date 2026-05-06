// 后台 Service Worker
// 负责：右键菜单、快捷键、统一处理"保存"流程
// 支持运行时切换语言（菜单 + 通知）

import { analyzeContent } from '../lib/ai.js';
import { saveToNotion } from '../lib/notion.js';
import { getSettings, addHistory } from '../lib/storage.js';
import { loadLang, t, onLangChange } from '../lib/i18n.js';

// =================== 启动初始化 ===================
async function rebuildContextMenus() {
  await loadLang();
  await chrome.contextMenus.removeAll();
  chrome.contextMenus.create({
    id: 'zhicun-save-selection',
    title: t('bg.menu_save_selection'),
    contexts: ['selection']
  });
  chrome.contextMenus.create({
    id: 'zhicun-save-page',
    title: t('bg.menu_save_page'),
    contexts: ['page']
  });
}

chrome.runtime.onInstalled.addListener(() => {
  rebuildContextMenus();
});

chrome.runtime.onStartup.addListener(() => {
  rebuildContextMenus();
});

// 初次加载（service worker 唤醒时）
loadLang();

// 监听语言变化，重建菜单
onLangChange(() => {
  rebuildContextMenus();
});

// =================== 右键菜单处理 ===================
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab?.id) return;
  if (info.menuItemId === 'zhicun-save-selection') {
    await handleSave(tab, { mode: 'selection' });
  } else if (info.menuItemId === 'zhicun-save-page') {
    await handleSave(tab, { mode: 'page' });
  }
});

// =================== 快捷键处理 ===================
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'save-page') {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) await handleSave(tab, { mode: 'page' });
  }
});

// =================== Popup 调用入口 ===================
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.type === 'SAVE') {
    (async () => {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const result = await handleSave(tab, { mode: msg.mode || 'page' });
        sendResponse({ ok: true, result });
      } catch (e) {
        sendResponse({ ok: false, error: String(e?.message || e) });
      }
    })();
    return true; // 异步响应
  }
});

// =================== 核心：保存流程 ===================
async function handleSave(tab, { mode }) {
  await loadLang(); // 确保语言已加载

  if (!tab?.id) throw new Error(t('bg.error.no_tab'));

  const settings = await getSettings();
  if (!settings.deepseekKey || !settings.notionToken || !settings.notionDbId) {
    notify(t('bg.notify.need_config_title'), t('bg.notify.need_config_msg'));
    chrome.runtime.openOptionsPage();
    throw new Error(t('bg.error.not_configured'));
  }

  // 通知用户：开始处理
  notify(t('bg.notify.processing_title'), t('bg.notify.processing_msg'));

  // 1. 从页面抓取内容
  const pageData = await extractPageContent(tab.id, mode);

  // 2. AI 分析
  let aiResult;
  try {
    aiResult = await analyzeContent(
      settings.deepseekKey,
      pageData.content,
      pageData.title,
      pageData.url
    );
  } catch (e) {
    notify(t('bg.notify.ai_failed_title'), e.message);
    throw e;
  }

  // 3. 写入 Notion
  let notionResult;
  try {
    notionResult = await saveToNotion(settings.notionToken, settings.notionDbId, {
      title: pageData.title,
      url: pageData.url,
      summary: aiResult.summary,
      tags: aiResult.tags,
      category: aiResult.category,
      content: pageData.content
    });
  } catch (e) {
    notify(t('bg.notify.notion_failed_title'), e.message);
    throw e;
  }

  // 4. 写入本地历史
  await addHistory({
    title: pageData.title,
    url: pageData.url,
    summary: aiResult.summary,
    tags: aiResult.tags,
    category: aiResult.category,
    notionUrl: notionResult.url
  });

  notify(t('bg.notify.success_title'), `${aiResult.category} | ${pageData.title.slice(0, 40)}`);
  return { ...aiResult, notionUrl: notionResult.url, title: pageData.title };
}

// 从页面抓取内容
async function extractPageContent(tabId, mode) {
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId },
    func: extractInPage,
    args: [mode]
  });
  if (!result) throw new Error(t('bg.error.no_content'));
  if (mode === 'selection' && !result.content) {
    throw new Error(t('bg.error.no_selection'));
  }
  return result;
}

// 这个函数会在页面里执行（无法访问扩展的模块）
function extractInPage(mode) {
  const title = document.title || '';
  const url = location.href;

  if (mode === 'selection') {
    const sel = window.getSelection?.().toString() || '';
    return { title, url, content: sel.trim() };
  }

  // mode === 'page' : 抓取主体内容
  const candidates = [
    document.querySelector('article'),
    document.querySelector('main'),
    document.querySelector('[role="main"]'),
    document.querySelector('#content'),
    document.querySelector('.content'),
    document.body
  ].filter(Boolean);

  const root = candidates[0] || document.body;
  const clone = root.cloneNode(true);
  clone.querySelectorAll('script,style,nav,header,footer,aside,iframe,noscript').forEach(n => n.remove());
  const text = (clone.innerText || clone.textContent || '').replace(/\s+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  return { title, url, content: text.slice(0, 8000) };
}

// 系统通知
function notify(title, message) {
  try {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: chrome.runtime.getURL('icons/icon128.png'),
      title,
      message: String(message || '').slice(0, 200),
      priority: 1
    });
  } catch (e) {
    console.warn('Notification failed', e);
  }
}
