# 📌 NotePin (智存) - AI Web Clipper for Notion

> Save any web page or selection to Notion with AI-generated summaries, tags and categories.
> 一键收藏网页到 Notion，AI 自动生成摘要、标签、分类。让收藏不再是吃灰。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-4285f4)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Bilingual](https://img.shields.io/badge/i18n-English%20%7C%20%E4%B8%AD%E6%96%87-success)]()

---

## ✨ Features

- 📄 **One-click save** — Click the toolbar icon, hit `Ctrl+Shift+S`, or right-click on any selection
- 🤖 **AI organization** — Auto-generates a 3-sentence summary, 3-5 relevant tags, and a category for every saved page (powered by DeepSeek)
- 📚 **Direct to Notion** — Content goes straight into your own Notion database. No middleman, no subscription
- 🌐 **Bilingual UI** — English by default, switch to 中文 in one click. Smart field-name detection (works with English or Chinese database fields)
- 🔒 **Privacy first** — No backend server. Your API keys and content never leave your browser except to call DeepSeek and Notion APIs directly
- 🕐 **Local history** — The last 100 saves are kept locally for quick access from the popup

## 🎯 Who is this for

- Researchers tired of bookmarks they never revisit
- Knowledge workers building a second brain in Notion
- Developers and designers collecting inspiration daily
- Anyone who wants AI-organized clipping without paying for another SaaS

---

## 🚀 Quick Start

### 1. Install

**From Chrome Web Store** (coming soon)

**From source (now)**:

```bash
git clone https://github.com/klcoks/notepin.git
```

Then in Chrome:
1. Open `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked" and select the cloned folder

### 2. Get a DeepSeek API key

Visit [platform.deepseek.com](https://platform.deepseek.com/api_keys), register (free credits on signup), and copy your API key (starts with `sk-`).

> Cost: roughly ¥0.5 per 1000 saves.

### 3. Set up Notion

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations) → **New integration** → copy the token (starts with `secret_` or `ntn_`)
2. Create a Notion database with these fields. **Field names can be in English OR Chinese** — NotePin auto-detects which set you use:

   | Field (English) | Field (中文) | Type |
   |-----------------|--------------|------|
   | Title           | 标题          | Title |
   | URL             | 链接          | URL |
   | Summary         | 摘要          | Text |
   | Tags            | 标签          | Multi-select |
   | Category        | 分类          | Select |
   | Saved At        | 收藏时间       | Date |

3. On the database page → top-right `⋯` → **Connections** → add your integration
4. Copy the database ID from the URL: `https://notion.so/<database_id>?v=<view_id>`

### 4. Configure

Click the NotePin icon → ⚙️ → paste DeepSeek key, Notion token, and database ID → click Test → Save.

### 5. Use

| Action | How |
|--------|-----|
| Save whole page | Click the icon → "Save whole page" |
| Save selection | Select text → right-click → "NotePin: Save selection" |
| Keyboard shortcut | `Ctrl+Shift+S` (Mac: `Cmd+Shift+S`) |

---

## 🗂️ Project Structure

```
notepin/
├── manifest.json              # Extension config (Manifest V3)
├── background/
│   └── service-worker.js      # Background logic (menus, save flow)
├── content/
│   └── content.js             # Content script (placeholder for future)
├── popup/                     # Toolbar popup UI
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── options/                   # Settings page
│   ├── options.html
│   ├── options.css
│   └── options.js
├── lib/
│   ├── ai.js                  # DeepSeek API wrapper
│   ├── notion.js              # Notion API wrapper (auto field-name detection)
│   ├── storage.js             # chrome.storage helpers
│   └── i18n.js                # Custom i18n engine (en/zh)
├── icons/                     # PNG icons (16/48/128)
├── store-assets/
│   ├── privacy-policy.html    # Bilingual privacy policy
│   └── STORE-LISTING.md       # Chrome Web Store submission notes
├── build.ps1                  # Packaging script (outputs notepin-vX.zip)
└── README.md
```

---

## 🛠️ Development

### Reload after changes
Go to `chrome://extensions/` → find NotePin → click 🔄 reload.

### Debug logs
- **Popup**: right-click the icon → "Inspect popup"
- **Background**: `chrome://extensions/` → NotePin → "Service worker" link
- **In-page**: F12 on any tab

### Build a release zip

```powershell
powershell -File build.ps1
```

Outputs `dist/notepin-vX.Y.Z.zip` ready for Chrome Web Store upload.

---

## 🔐 Privacy

NotePin has **no backend**. We don't collect anything. All API keys and history are stored locally via `chrome.storage.local`. Web content is sent **directly from your browser** to DeepSeek (for AI processing) and Notion (for storage).

Full privacy policy: [`store-assets/privacy-policy.html`](store-assets/privacy-policy.html)

---

## 📜 License

MIT - free for commercial use, modification, and distribution.

---

## 🙋 Author

**klcoks** · [klcoks@gmail.com](mailto:klcoks@gmail.com) · [github.com/klcoks](https://github.com/klcoks)

Issues, ideas and PRs are very welcome.
