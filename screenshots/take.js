/**
 * NotePin Screenshot Generator
 *
 * Renders 5 promotional screenshots at 1280x800 for Chrome Web Store submission.
 *
 * Usage:
 *   cd screenshots
 *   npm install
 *   npm run shoot
 *
 * Output: screenshots/output/scene-1.png ... scene-5.png
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCENES = [
  { id: 1, name: 'hero',      desc: 'Hero — One-click save' },
  { id: 2, name: 'ai',        desc: 'AI processing' },
  { id: 3, name: 'history',   desc: 'Saved + recent history' },
  { id: 4, name: 'notion',    desc: 'Notion database result' },
  { id: 5, name: 'bilingual', desc: 'Bilingual settings' }
];

const OUT_DIR = path.join(__dirname, 'output');

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log('🚀 Launching Chromium...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2 // retina-quality screenshots
  });
  const page = await context.newPage();

  const sceneUrl = 'file://' + path.resolve(__dirname, 'scenes.html');
  await page.goto(sceneUrl);
  await page.waitForLoadState('networkidle');

  for (const scene of SCENES) {
    console.log(`📸 Capturing scene ${scene.id}: ${scene.desc}`);
    await page.evaluate(s => window.showScene(s), scene.id);
    // Small wait so transitions / fonts settle
    await page.waitForTimeout(300);

    const file = path.join(OUT_DIR, `${scene.id}-${scene.name}.png`);
    await page.locator(`#scene-${scene.id}`).screenshot({
      path: file,
      omitBackground: false
    });
    const size = (fs.statSync(file).size / 1024).toFixed(1);
    console.log(`   → ${file}  (${size} KB)`);
  }

  await browser.close();
  console.log('\n✅ Done! All 5 screenshots saved to:', OUT_DIR);
  console.log('   Upload these to Chrome Web Store submission form.');
})().catch(e => {
  console.error('❌ Failed:', e);
  process.exit(1);
});
