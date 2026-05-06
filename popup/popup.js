import { getSettings, getHistory, clearHistory } from '../lib/storage.js';
import { loadLang, applyI18n, t, onLangChange } from '../lib/i18n.js';

const $ = (id) => document.getElementById(id);

async function init() {
  await loadLang();
  applyI18n();
  document.documentElement.lang = (await loadLang()) === 'zh' ? 'zh-CN' : 'en';
  onLangChange(() => { applyI18n(); renderHistory(); });
  // 1. 检查配置
  const settings = await getSettings();
  if (!settings.deepseekKey || !settings.notionToken || !settings.notionDbId) {
    $('not-configured').classList.remove('hidden');
  }

  // 2. 渲染历史
  await renderHistory();

  // 3. 绑定事件
  $('btn-options').addEventListener('click', () => chrome.runtime.openOptionsPage());
  $('btn-go-options').addEventListener('click', () => chrome.runtime.openOptionsPage());
  $('btn-help').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: chrome.runtime.getURL('options/options.html#help') });
  });
  $('btn-save-page').addEventListener('click', () => triggerSave('page'));
  $('btn-save-selection').addEventListener('click', () => triggerSave('selection'));
  $('btn-clear').addEventListener('click', async () => {
    if (confirm(t('popup.confirm_clear'))) {
      await clearHistory();
      await renderHistory();
    }
  });
}

function showStatus(text, type = 'loading') {
  const el = $('status');
  el.classList.remove('hidden', 'loading', 'success', 'error');
  el.classList.add(type);
  el.textContent = text;
}

function hideStatus() {
  $('status').classList.add('hidden');
}

async function triggerSave(mode) {
  $('btn-save-page').disabled = true;
  $('btn-save-selection').disabled = true;
  showStatus(t('popup.status.processing'), 'loading');

  try {
    const resp = await chrome.runtime.sendMessage({ type: 'SAVE', mode });
    if (resp?.ok) {
      showStatus(t('popup.status.saved', { category: resp.result.category, title: resp.result.title.slice(0, 30) }), 'success');
      await renderHistory();
    } else {
      showStatus(t('popup.status.failed', { error: resp?.error || 'unknown' }), 'error');
    }
  } catch (e) {
    showStatus(t('popup.status.failed', { error: e.message }), 'error');
  } finally {
    $('btn-save-page').disabled = false;
    $('btn-save-selection').disabled = false;
    setTimeout(hideStatus, 4000);
  }
}

async function renderHistory() {
  const list = await getHistory();
  const ul = $('history-list');
  const empty = $('history-empty');
  ul.innerHTML = '';
  if (!list.length) {
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  list.slice(0, 20).forEach(item => {
    const li = document.createElement('li');
    li.className = 'history-item';

    const a = document.createElement('a');
    a.className = 'history-title';
    a.href = item.notionUrl || item.url;
    a.target = '_blank';
    a.textContent = item.title || 'Untitled';
    li.appendChild(a);

    const meta = document.createElement('div');
    meta.className = 'history-meta';
    if (item.category) {
      const c = document.createElement('span');
      c.className = 'cat';
      c.textContent = item.category;
      meta.appendChild(c);
    }
    (item.tags || []).slice(0, 3).forEach(t => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = t;
      meta.appendChild(span);
    });
    li.appendChild(meta);

    ul.appendChild(li);
  });
}

init();
