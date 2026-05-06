// Notion API 封装
// 文档: https://developers.notion.com/

const NOTION_API_VERSION = '2022-06-28';
const NOTION_API_URL = 'https://api.notion.com/v1';

// 字段别名：支持中文/英文/常见变体，自动匹配用户数据库实际的字段名
const FIELD_ALIASES = {
  title:    ['标题', 'Title', 'Name', '名称'],
  url:      ['链接', 'URL', 'Link', '网址'],
  summary:  ['摘要', 'Summary', 'Description', '描述'],
  tags:     ['标签', 'Tags', 'Tag'],
  category: ['分类', 'Category', 'Categories'],
  savedAt:  ['收藏时间', 'Saved At', 'SavedAt', 'Date', 'Created', 'Saved Time']
};

// 必须的字段（标题之外）
const REQUIRED_KEYS = ['url', 'summary', 'tags', 'category', 'savedAt'];

function headers(token) {
  return {
    'Authorization': `Bearer ${token}`,
    'Notion-Version': NOTION_API_VERSION,
    'Content-Type': 'application/json'
  };
}

/**
 * 校验 Notion Token 是否有效
 */
export async function testNotionToken(token) {
  try {
    const res = await fetch(`${NOTION_API_URL}/users/me`, {
      method: 'GET',
      headers: headers(token)
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * 获取数据库结构（用于检查字段是否齐全）
 */
export async function getDatabase(token, databaseId) {
  const res = await fetch(`${NOTION_API_URL}/databases/${databaseId}`, {
    method: 'GET',
    headers: headers(token)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  return res.json();
}

/**
 * 解析数据库的字段映射：把内部 key (title/url/summary/...) 映射到用户实际的字段名
 * @returns {{ map: Record<string,string>, missing: string[] }}
 */
export function resolveFieldMap(database) {
  const props = database?.properties || {};
  const propNames = Object.keys(props);
  const map = {};
  const missing = [];

  // title 字段优先用 type === 'title' 的那个（Notion 数据库必有一个 title 字段）
  const titleProp = propNames.find(n => props[n]?.type === 'title');
  if (titleProp) map.title = titleProp;

  for (const key of REQUIRED_KEYS) {
    const candidates = FIELD_ALIASES[key];
    const found = candidates.find(name => propNames.includes(name));
    if (found) {
      map[key] = found;
    } else {
      missing.push(candidates[0]); // 报错时显示第一个别名（中文）
    }
  }

  if (!map.title) missing.unshift(FIELD_ALIASES.title[0]);
  return { map, missing };
}

/**
 * 把内容写入 Notion 数据库的新页面
 * 自动识别用户数据库的中/英文字段名
 */
export async function saveToNotion(token, databaseId, payload) {
  const { title, url, summary, tags = [], category = 'Other', content = '' } = payload;

  // 1. 先获取数据库结构，解析字段映射
  const db = await getDatabase(token, databaseId);
  const { map, missing } = resolveFieldMap(db);
  if (missing.length) {
    throw new Error(`Database missing fields: ${missing.join(', ')}`);
  }

  // 2. 根据用户实际字段名构建 properties
  const properties = {
    [map.title]: {
      title: [{ text: { content: (title || 'Untitled').slice(0, 200) } }]
    },
    [map.url]: {
      url: url || null
    },
    [map.summary]: {
      rich_text: [{ text: { content: (summary || '').slice(0, 2000) } }]
    },
    [map.tags]: {
      multi_select: tags.filter(Boolean).slice(0, 10).map(name => ({ name: String(name).slice(0, 30) }))
    },
    [map.category]: {
      select: { name: String(category).slice(0, 30) }
    },
    [map.savedAt]: {
      date: { start: new Date().toISOString() }
    }
  };

  // 正文：把原文也存进去（分块，每块 2000 字以内）
  const children = [];
  if (summary) {
    children.push({
      object: 'block',
      type: 'callout',
      callout: {
        icon: { type: 'emoji', emoji: '✨' },
        rich_text: [{ type: 'text', text: { content: summary } }]
      }
    });
  }
  if (content) {
    const chunks = chunkText(content, 1900);
    for (const chunk of chunks) {
      children.push({
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{ type: 'text', text: { content: chunk } }]
        }
      });
    }
  }

  const res = await fetch(`${NOTION_API_URL}/pages`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties,
      children: children.slice(0, 100) // Notion 限制单次最多 100 块
    })
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`写入 Notion 失败: ${err}`);
  }
  const data = await res.json();
  return { id: data.id, url: data.url };
}

function chunkText(text, size) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}
