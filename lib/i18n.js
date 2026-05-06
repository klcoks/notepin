// 自定义 i18n 模块 - 支持运行时切换语言
// 默认英文，可在设置页切换为中文

const LANG_KEY = 'zhicun_lang';
const DEFAULT_LANG = 'en';

const messages = {
  en: {
    // ============ Brand ============
    'app.name': 'NotePin',
    'app.tagline': 'AI Web Clipper for Notion',
    'app.popup_title': 'NotePin - One-click save to Notion',

    // ============ Popup ============
    'popup.settings_btn_title': 'Settings',
    'popup.banner_msg': 'Please configure your DeepSeek and Notion keys first',
    'popup.go_settings': 'Open Settings',
    'popup.save_page': 'Save whole page',
    'popup.save_selection': 'Save selection',
    'popup.shortcut_label': 'Shortcut: ',
    'popup.recent_saves': 'Recent saves',
    'popup.clear': 'Clear',
    'popup.empty': 'No saves yet',
    'popup.help': 'Help',
    'popup.confirm_clear': 'Clear all local history? (Pages already in Notion are unaffected)',
    'popup.status.processing': 'Analyzing with AI...',
    'popup.status.saved': 'Saved ✓ {category} | {title}',
    'popup.status.failed': 'Failed: {error}',

    // ============ Options ============
    'options.title': 'NotePin Settings',
    'options.subtitle': 'Configure once, use forever. All keys are stored locally on your device — never uploaded.',
    'options.language': 'Language',
    'options.lang_en': 'English',
    'options.lang_zh': '中文',

    'options.deepseek_title': '1. DeepSeek API Key',
    'options.deepseek_hint': 'Used for AI summary, tags and categorization.',
    'options.apply_here': 'Apply here →',
    'options.deepseek_cost': '~ ¥0.5 per 1000 calls',
    'options.deepseek_placeholder': 'sk-xxxxxxxxxxxxxxxxxxxxxxxxx',
    'options.btn_test': 'Test',

    'options.notion_title': '2. Notion Integration',
    'options.notion_intro': 'Save content into your Notion database. Steps:',
    'options.step1': 'Visit',
    'options.step1_after': 'and create a new Internal Integration → copy the Token (starts with',
    'options.step1_after2': 'or',
    'options.step1_after3': ').',
    'options.step2_intro': 'In Notion, create a Database with the following fields (English or Chinese names both work):',
    'options.field_title': 'Title (Title type)',
    'options.field_url': 'URL (URL type)',
    'options.field_summary': 'Summary (Text type)',
    'options.field_tags': 'Tags (Multi-select type)',
    'options.field_category': 'Category (Select type)',
    'options.field_saved_at': 'Saved At (Date type)',
    'options.step3': 'Open the database page → top-right ⋯ → "Connections" → "+ Add connections" → choose your integration',
    'options.step4': 'Copy the database ID from the URL. Format: notion.so/xxx?v=yyy — the xxx (32 chars) is the database ID.',

    'options.notion_token_label': 'Notion Token',
    'options.notion_token_placeholder': 'secret_xxx or ntn_xxx',
    'options.notion_db_label': 'Notion Database ID',
    'options.notion_db_placeholder': 'e.g. a1b2c3d4e5f6...',

    'options.btn_save': 'Save Settings',
    'options.saved_ok': '✓ Saved',

    'options.test.empty_key': 'Please fill in the key first',
    'options.test.testing': 'Testing...',
    'options.test.deepseek_ok': '✓ DeepSeek connected',
    'options.test.deepseek_fail': '✗ Invalid key or network error',
    'options.test.token_invalid': '✗ Invalid Notion Token',
    'options.test.token_ok_no_db': '✓ Token is valid (database ID not filled yet)',
    'options.test.db_missing_fields': '✗ Database missing fields: {fields}',
    'options.test.db_ok': '✓ Notion Token and Database both verified',
    'options.test.db_read_fail': '✗ Failed to read database: {error} (please check ID and ensure the integration is added to Connections)',

    'options.help_title': 'How to Use',
    'options.help_save_page': 'Click the extension icon → "Save whole page"',
    'options.help_save_selection': 'Select text → right-click → "NotePin: save selection"',
    'options.help_shortcut': 'Shortcut',
    'options.help_shortcut_value': 'Ctrl+Shift+S (Mac: Cmd+Shift+S) for one-click save',

    'options.faq_title': 'FAQ',
    'options.faq_q1': 'Why do I need my own API key?',
    'options.faq_a1': 'Your key is used directly without going through any third-party server. Safer and cheaper. DeepSeek gives you free credits on signup.',
    'options.faq_q2': 'Will my keys leak?',
    'options.faq_a2': 'No. All keys are stored only in your local Chrome storage and are used solely to call the official APIs.',
    'options.faq_q3': 'How to find my Notion database ID?',
    'options.faq_a3': 'Open the database page and look at the URL. For example, in https://www.notion.so/myname/abc123def456?v=... the abc123def456 (32 chars) is the database ID.',

    // ============ Background ============
    'bg.menu_save_selection': 'NotePin: Save selection to Notion',
    'bg.menu_save_page': 'NotePin: Save whole page to Notion',
    'bg.notify.processing_title': 'NotePin',
    'bg.notify.processing_msg': 'Fetching content and analyzing with AI...',
    'bg.notify.success_title': 'Saved ✓',
    'bg.notify.need_config_title': 'Configuration needed',
    'bg.notify.need_config_msg': 'Click extension icon → Settings to fill in DeepSeek and Notion keys.',
    'bg.notify.ai_failed_title': 'AI analysis failed',
    'bg.notify.notion_failed_title': 'Save to Notion failed',
    'bg.error.no_tab': 'Active tab not found',
    'bg.error.not_configured': 'API keys not configured',
    'bg.error.no_content': 'Cannot read page content',
    'bg.error.no_selection': 'Please select some text first',
    'bg.error.no_api_key': 'Please fill in the DeepSeek API Key in Settings',
    'bg.error.deepseek_api': 'DeepSeek API error ({status}): {detail}',
    'bg.ai.summary_failed': '(AI summary failed)',
    'bg.ai.default_category': 'Other'
  },

  zh: {
    // ============ Brand ============
    'app.name': '智存',
    'app.tagline': 'AI 智能网页收藏到 Notion',
    'app.popup_title': 'NotePin - 一键存到 Notion',

    // ============ Popup ============
    'popup.settings_btn_title': '设置',
    'popup.banner_msg': '请先配置 DeepSeek 和 Notion 的密钥',
    'popup.go_settings': '去设置',
    'popup.save_page': '收藏整个页面',
    'popup.save_selection': '收藏选中内容',
    'popup.shortcut_label': '快捷键：',
    'popup.recent_saves': '最近收藏',
    'popup.clear': '清空',
    'popup.empty': '暂无收藏记录',
    'popup.help': '使用帮助',
    'popup.confirm_clear': '确定清空所有本地历史吗？（不会影响已存入 Notion 的内容）',
    'popup.status.processing': '正在抓取并 AI 分析...',
    'popup.status.saved': '已保存 ✓ {category}｜{title}',
    'popup.status.failed': '失败：{error}',

    // ============ Options ============
    'options.title': 'NotePin 设置',
    'options.subtitle': '配置一次，永久使用。所有 Key 只存在你本机，不会上传。',
    'options.language': '界面语言',
    'options.lang_en': 'English',
    'options.lang_zh': '中文',

    'options.deepseek_title': '1. DeepSeek API Key',
    'options.deepseek_hint': '用于 AI 总结内容、提取标签和分类。',
    'options.apply_here': '点此申请 →',
    'options.deepseek_cost': '1000 次调用约 ¥0.5',
    'options.deepseek_placeholder': 'sk-xxxxxxxxxxxxxxxxxxxxxxxxx',
    'options.btn_test': '测试',

    'options.notion_title': '2. Notion 集成',
    'options.notion_intro': '把内容写入你的 Notion 数据库。需要先：',
    'options.step1': '访问',
    'options.step1_after': '→ 新建一个 Internal Integration → 复制 Token（以',
    'options.step1_after2': '或',
    'options.step1_after3': '开头）',
    'options.step2_intro': '在 Notion 里新建一个数据库，包含以下字段（中文或英文字段名都支持）：',
    'options.field_title': '标题 / Title（Title 类型）',
    'options.field_url': '链接 / URL（URL/网址 类型）',
    'options.field_summary': '摘要 / Summary（Text/文本 类型）',
    'options.field_tags': '标签 / Tags（Multi-select/多选 类型）',
    'options.field_category': '分类 / Category（Select/选择 类型）',
    'options.field_saved_at': '收藏时间 / Saved At（Date/日期 类型）',
    'options.step3': '打开数据库页面 → 右上角 ⋯ → "Connections" → "+ Add connections" → 选择你的 Integration',
    'options.step4': '复制数据库 ID：URL 里 notion.so/xxx?v=yyy 的 xxx 那段（32 位字符）',

    'options.notion_token_label': 'Notion Token',
    'options.notion_token_placeholder': 'secret_xxx 或 ntn_xxx',
    'options.notion_db_label': 'Notion 数据库 ID',
    'options.notion_db_placeholder': '例如：a1b2c3d4e5f6...',

    'options.btn_save': '保存设置',
    'options.saved_ok': '✓ 已保存',

    'options.test.empty_key': '请先填入 Key',
    'options.test.testing': '测试中...',
    'options.test.deepseek_ok': '✓ DeepSeek 连接正常',
    'options.test.deepseek_fail': '✗ Key 无效或网络异常',
    'options.test.token_invalid': '✗ Notion Token 无效',
    'options.test.token_ok_no_db': '✓ Token 有效（但还没填数据库 ID）',
    'options.test.db_missing_fields': '✗ 数据库缺少字段: {fields}',
    'options.test.db_ok': '✓ Notion Token 与数据库都已通过校验',
    'options.test.db_read_fail': '✗ 数据库读取失败：{error}（请检查 ID，并确保已把 Integration 添加到该数据库的 connections）',

    'options.help_title': '使用方法',
    'options.help_save_page': '点击插件图标 → "收藏整个页面"',
    'options.help_save_selection': '选中文字 → 右键 → "智存：把选中内容存到 Notion"',
    'options.help_shortcut': '快捷键',
    'options.help_shortcut_value': 'Ctrl+Shift+S（Mac: Cmd+Shift+S）一键收藏整页',

    'options.faq_title': '常见问题',
    'options.faq_q1': '为什么要我自己申请 API Key？',
    'options.faq_a1': '因为你的 Key 直接调用，不经过我的服务器，更安全更便宜。DeepSeek 注册送额度，足够用半年。',
    'options.faq_q2': '会泄露我的 Key 吗？',
    'options.faq_a2': '不会。所有 Key 只存在你本机的 Chrome 存储中，仅用于调用对应的官方 API。',
    'options.faq_q3': '怎么找到 Notion 数据库 ID？',
    'options.faq_a3': '打开数据库页面，看浏览器地址栏。例如 https://www.notion.so/myname/abc123def456?v=... 中 abc123def456 就是数据库 ID（32 位字符）。',

    // ============ Background ============
    'bg.menu_save_selection': '智存：把选中内容存到 Notion',
    'bg.menu_save_page': '智存：把整个页面存到 Notion',
    'bg.notify.processing_title': '智存',
    'bg.notify.processing_msg': '正在抓取并 AI 分析...',
    'bg.notify.success_title': '保存成功 ✓',
    'bg.notify.need_config_title': '请先配置',
    'bg.notify.need_config_msg': '点击插件图标 → 设置，填入 DeepSeek 和 Notion 的 Key',
    'bg.notify.ai_failed_title': 'AI 分析失败',
    'bg.notify.notion_failed_title': '保存到 Notion 失败',
    'bg.error.no_tab': '未找到当前标签页',
    'bg.error.not_configured': '未配置 API Key',
    'bg.error.no_content': '无法读取页面内容',
    'bg.error.no_selection': '请先用鼠标选中文字再保存',
    'bg.error.no_api_key': '请先在设置页填入 DeepSeek API Key',
    'bg.error.deepseek_api': 'DeepSeek API 错误 ({status}): {detail}',
    'bg.ai.summary_failed': '（AI 总结失败）',
    'bg.ai.default_category': '其他'
  }
};

let currentLang = DEFAULT_LANG;

/** Load saved language from storage. Call this before applyI18n. */
export async function loadLang() {
  try {
    const data = await chrome.storage.local.get(LANG_KEY);
    currentLang = data[LANG_KEY] || DEFAULT_LANG;
  } catch {
    currentLang = DEFAULT_LANG;
  }
  return currentLang;
}

export async function setLang(lang) {
  if (!messages[lang]) lang = DEFAULT_LANG;
  currentLang = lang;
  await chrome.storage.local.set({ [LANG_KEY]: lang });
}

export function getCurrentLang() {
  return currentLang;
}

/** Translate a key, with optional variable substitution: t('foo.bar', { name: 'X' }) */
export function t(key, vars) {
  let str = messages[currentLang]?.[key];
  if (str === undefined) str = messages[DEFAULT_LANG][key];
  if (str === undefined) str = key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      str = str.split(`{${k}}`).join(String(v));
    });
  }
  return str;
}

/**
 * Apply i18n to all elements in `root` that have data-i18n / data-i18n-attr / data-i18n-html attributes.
 * - data-i18n="key"            → element.textContent = t(key)
 * - data-i18n-html="key"       → element.innerHTML = t(key)
 * - data-i18n-attr="title:keyA,placeholder:keyB"  → element.setAttribute(...)
 */
export function applyI18n(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  root.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.getAttribute('data-i18n-html'));
  });
  root.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const spec = el.getAttribute('data-i18n-attr');
    spec.split(',').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });
}

/** Listen for language change in storage and re-apply. */
export function onLangChange(callback) {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes[LANG_KEY]) {
      currentLang = changes[LANG_KEY].newValue || DEFAULT_LANG;
      callback?.(currentLang);
    }
  });
}
