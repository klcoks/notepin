import { getSettings, saveSettings } from '../lib/storage.js';
import { testDeepSeekKey } from '../lib/ai.js';
import { testNotionToken, getDatabase, resolveFieldMap } from '../lib/notion.js';
import { loadLang, setLang, applyI18n, t, getCurrentLang } from '../lib/i18n.js';

const $ = (id) => document.getElementById(id);

async function init() {
  // 1. 加载语言并应用
  await loadLang();
  applyI18n();
  document.documentElement.lang = getCurrentLang() === 'zh' ? 'zh-CN' : 'en';

  // 2. 加载已保存的设置
  const s = await getSettings();
  $('deepseekKey').value = s.deepseekKey || '';
  $('notionToken').value = s.notionToken || '';
  $('notionDbId').value = s.notionDbId || '';

  // 3. 语言切换器
  const sel = $('lang-select');
  sel.value = getCurrentLang();
  sel.addEventListener('change', async (e) => {
    await setLang(e.target.value);
    applyI18n();
    document.documentElement.lang = getCurrentLang() === 'zh' ? 'zh-CN' : 'en';
    // 触发 storage change 事件，让 background 重建菜单
  });

  // 4. 按钮事件
  $('btn-save').addEventListener('click', onSave);
  $('btn-test-deepseek').addEventListener('click', onTestDeepSeek);
  $('btn-test-notion').addEventListener('click', onTestNotion);
}

async function onSave() {
  const settings = {
    deepseekKey: $('deepseekKey').value.trim(),
    notionToken: $('notionToken').value.trim(),
    notionDbId: normalizeDbId($('notionDbId').value.trim())
  };
  await saveSettings(settings);
  const el = $('saveStatus');
  el.textContent = t('options.saved_ok');
  el.className = 'hint success';
  setTimeout(() => { el.textContent = ''; }, 3000);
}

function normalizeDbId(input) {
  if (!input) return '';
  // 支持用户粘贴整段 URL（带或不带连字符的 32 位 hex）
  const match = input.match(/[a-f0-9]{32}/i) || input.match(/[a-f0-9-]{36}/i);
  return match ? match[0].replace(/-/g, '') : input;
}

async function onTestDeepSeek() {
  const key = $('deepseekKey').value.trim();
  const el = $('deepseekStatus');
  if (!key) { el.textContent = t('options.test.empty_key'); el.className = 'hint error'; return; }
  el.textContent = t('options.test.testing'); el.className = 'hint';
  const ok = await testDeepSeekKey(key);
  el.textContent = ok ? t('options.test.deepseek_ok') : t('options.test.deepseek_fail');
  el.className = ok ? 'hint success' : 'hint error';
}

async function onTestNotion() {
  const token = $('notionToken').value.trim();
  const dbId = normalizeDbId($('notionDbId').value.trim());
  const el = $('notionStatus');
  if (!token) { el.textContent = t('options.test.empty_key'); el.className = 'hint error'; return; }

  el.textContent = t('options.test.testing'); el.className = 'hint';
  const ok = await testNotionToken(token);
  if (!ok) {
    el.textContent = t('options.test.token_invalid');
    el.className = 'hint error';
    return;
  }

  if (!dbId) {
    el.textContent = t('options.test.token_ok_no_db');
    el.className = 'hint success';
    return;
  }

  try {
    const db = await getDatabase(token, dbId);
    const { missing } = resolveFieldMap(db);
    if (missing.length) {
      el.textContent = t('options.test.db_missing_fields', { fields: missing.join(', ') });
      el.className = 'hint error';
    } else {
      el.textContent = t('options.test.db_ok');
      el.className = 'hint success';
    }
  } catch (e) {
    el.textContent = t('options.test.db_read_fail', { error: e.message });
    el.className = 'hint error';
  }
}

init();
