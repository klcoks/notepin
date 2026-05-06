# NotePin Screenshot Generator

Auto-generates 5 promotional screenshots (1280×800 retina) for Chrome Web Store submission.

## Quick Start

```bash
# 1. Make sure Node.js is installed (https://nodejs.org)
node --version   # should be v18 or higher

# 2. Install dependencies (one-time, ~50 MB)
cd screenshots
npm install

# 3. Generate screenshots
npm run shoot
```

Output goes to `screenshots/output/`:
- `1-hero.png`        — One-click save (main marketing shot)
- `2-ai.png`          — AI processing
- `3-history.png`     — Saved + recent history
- `4-notion.png`      — Notion database result
- `5-bilingual.png`   — Bilingual settings

## Customizing

Edit `scenes.html` to:
- Change copy / colors / layout
- Add more scenes (then update `SCENES` array in `take.js`)
- Tweak text in headlines

The screenshots are pure HTML/CSS — no images, no Photoshop needed.

## Why this approach?

Loading the actual Chrome extension into Playwright requires `--load-extension` and a non-headless Chromium, which is fragile. Instead, this script renders pixel-perfect mockups of the extension UI directly in HTML — same visual design, but fully scriptable.

## Troubleshooting

**"playwright: command not found"** → Run `npx playwright install chromium`

**Screenshots look blurry** → Make sure `deviceScaleFactor: 2` is set in `take.js`

**Want PNG vs JPG?** → Change file extension in `take.js` line `path: file`
