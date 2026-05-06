// 配置和历史记录存储封装

const SETTINGS_KEY = 'zhicun_settings';
const HISTORY_KEY = 'zhicun_history';
const HISTORY_MAX = 100;

/**
 * 读取所有设置
 * @returns {Promise<{deepseekKey:string, notionToken:string, notionDbId:string}>}
 */
export async function getSettings() {
  const data = await chrome.storage.local.get(SETTINGS_KEY);
  return data[SETTINGS_KEY] || {
    deepseekKey: '',
    notionToken: '',
    notionDbId: ''
  };
}

export async function saveSettings(settings) {
  await chrome.storage.local.set({ [SETTINGS_KEY]: settings });
}

/**
 * 添加历史记录
 */
export async function addHistory(item) {
  const data = await chrome.storage.local.get(HISTORY_KEY);
  const list = data[HISTORY_KEY] || [];
  list.unshift({
    ...item,
    savedAt: Date.now()
  });
  // 只保留最近 N 条
  const trimmed = list.slice(0, HISTORY_MAX);
  await chrome.storage.local.set({ [HISTORY_KEY]: trimmed });
}

export async function getHistory() {
  const data = await chrome.storage.local.get(HISTORY_KEY);
  return data[HISTORY_KEY] || [];
}

export async function clearHistory() {
  await chrome.storage.local.set({ [HISTORY_KEY]: [] });
}
