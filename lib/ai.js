// DeepSeek AI 调用封装
// 文档: https://api-docs.deepseek.com/

import { t } from './i18n.js';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEFAULT_MODEL = 'deepseek-chat';

/**
 * 调用 DeepSeek 进行文本分析
 * @param {string} apiKey - DeepSeek API Key
 * @param {string} content - 要分析的文本
 * @param {string} title - 网页标题
 * @param {string} url - 网页 URL
 * @returns {Promise<{summary: string, tags: string[], category: string}>}
 */
export async function analyzeContent(apiKey, content, title, url) {
  if (!apiKey) {
    throw new Error(t('bg.error.no_api_key'));
  }

  const truncated = content.length > 4000 ? content.slice(0, 4000) + '...' : content;

  // Prompt 依据当前语言选择输出语言
  const lang = (typeof t === 'function') ? t('app.name') : 'NotePin';
  const isZh = lang === '智存';
  const prompt = isZh
    ? `你是一个专业的内容整理助手。请分析以下网页内容，输出严格的 JSON 格式。

【网页标题】${title}
【网页URL】${url}
【内容】
${truncated}

请输出 JSON（不要任何其他文字，不要 markdown 代码块）：
{
  "summary": "用 3 句话总结核心内容，每句不超过 30 字",
  "tags": ["标签1", "标签2", "标签3"],
  "category": "技术|行业|工具|灵感|资讯|教程|其他 中的一个"
}`
    : `You are a professional content curator. Analyze the following web page and output strict JSON.

[Title] ${title}
[URL] ${url}
[Content]
${truncated}

Output JSON only (no extra text, no markdown code block):
{
  "summary": "3 sentences summarizing the core content, each under 25 words",
  "tags": ["tag1", "tag2", "tag3"],
  "category": "one of: Tech | Business | Tools | Inspiration | News | Tutorial | Other"
}`;

  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      messages: [
        { role: 'system', content: '你是专业的内容整理助手，只输出 JSON。' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 500,
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(t('bg.error.deepseek_api', { status: response.status, detail: errText }));
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content || '{}';

  let result;
  try {
    result = JSON.parse(text);
  } catch (e) {
    // 容错：尝试从 markdown 代码块里抽取
    const match = text.match(/\{[\s\S]*\}/);
    result = match ? JSON.parse(match[0]) : {};
  }

  return {
    summary: result.summary || t('bg.ai.summary_failed'),
    tags: Array.isArray(result.tags) ? result.tags.slice(0, 5) : [],
    category: result.category || t('bg.ai.default_category')
  };
}

/**
 * 简单测试 API Key 是否有效
 */
export async function testDeepSeekKey(apiKey) {
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [{ role: 'user', content: 'hi' }],
        max_tokens: 5
      })
    });
    return response.ok;
  } catch (e) {
    return false;
  }
}
