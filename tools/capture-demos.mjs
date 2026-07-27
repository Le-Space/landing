/**
 * Captures the Simple Todo tutorial demos for the project card slideshow.
 *
 *   NODE_PATH=<playwright> node tools/capture-demos.mjs [--raw]
 *
 * Each chapter is opened in a fresh context, the demo's consent dialog is
 * accepted, the app is switched to dark mode (the card sits on a dark page),
 * a few neutral todos are seeded, and the chapter-specific region is written
 * to sites/local-first/public/media/simple-todo-<chapter>.png.
 *
 * --raw skips cropping and writes full 1280x720 frames to the scratch dir,
 * which is how the crop regions below were chosen in the first place.
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const raw = process.argv.includes('--raw');
const outDir = raw ? resolve(root, '.capture-raw') : resolve(root, 'sites/local-first/public/media');
mkdirSync(outDir, { recursive: true });

const TODOS = [
  'Sketch the local-first architecture',
  'Check replication across two browsers',
  'Write up the relay setup notes'
];

// The app renders in a fixed centre column; clip that at 16:9 to match the
// card's media box. `y` is chosen per chapter so the frame lands on what makes
// the chapter different, not on the boilerplate every chapter shares.
const CLIP = { x: 200, width: 880, height: 495 };

const CHAPTERS = [
  // the populated shared list — everyone lands in the same one, so frame the
  // list itself rather than the input box every chapter has
  { id: 'main', url: 'https://simple-todo.le-space.de', todos: TODOS, anchor: /^TODO Items/, anchorOffset: 70 },
  // "Shared list · <mnemonic>" plus the list it unlocks
  { id: 'collab01', url: 'https://collab01.le-space.de', todos: TODOS, y: 195 },
  // the green "Passkey DID did:key:…" badge in the header
  { id: 'passkey01', url: 'https://passkey01.le-space.de', todos: TODOS, passkey: true, y: 15 },
  // "Create a private list" + "Open a shared list by address"
  { id: 'acl01', url: 'https://acl01.le-space.de', todos: TODOS, y: 175 }
];

/**
 * passkey01's whole point is the WebAuthn identity, which "continue without a
 * passkey" hides. Attach a CDP virtual authenticator so the real create-a-passkey
 * path runs — no physical key, no credential of the user's ever involved.
 */
async function useVirtualPasskey(page, context) {
  const client = await context.newCDPSession(page);
  await client.send('WebAuthn.enable');
  await client.send('WebAuthn.addVirtualAuthenticator', {
    options: {
      protocol: 'ctap2',
      transport: 'internal',
      hasResidentKey: true,
      hasUserVerification: true,
      isUserVerified: true,
      automaticPresenceSimulation: true
    }
  });
}

// The dialog's confirm button is named per chapter: "Proceed to Test the App"
// on main, "Open shared list" from collab01 onwards.
const CONFIRM = /proceed to test the app|open shared list/i;

/** Tick every box in the demo's consent dialog and proceed. */
async function acceptConsent(page) {
  const boxes = page.locator('input[type="checkbox"]');
  for (let i = 0; i < (await boxes.count()); i++) {
    const box = boxes.nth(i);
    if (await box.isVisible().catch(() => false)) await box.check().catch(() => {});
  }
  const confirm = page.getByRole('button', { name: CONFIRM });
  if (!(await confirm.count())) return false;
  await confirm.first().scrollIntoViewIfNeeded().catch(() => {});
  await confirm.first().click({ timeout: 15_000 });
  await page.waitForTimeout(2000);
  return true;
}

async function useDarkMode(page) {
  const toggle = page.getByRole('button', { name: /switch to dark mode/i });
  if (await toggle.count()) {
    await toggle.first().click();
    await page.waitForTimeout(600);
  }
}

async function addTodos(page, todos) {
  for (const text of todos) {
    const input = page.getByPlaceholder('What needs to be done?').first();
    await input.click();
    await input.fill(text);
    // Enter is not wired on every chapter — click the button and wait for the
    // entry to actually appear before moving on, so a slow oplog write cannot
    // silently swallow a todo.
    await page.getByRole('button', { name: /^add todo$/i }).first().click();
    await page.getByText(text, { exact: false }).first().waitFor({ timeout: 20_000 }).catch(() => {});
    await page.waitForTimeout(600);
  }
}

const only = process.argv.find((a) => a.startsWith('--only='))?.split('=')[1];
const browser = await chromium.launch();
for (const chapter of CHAPTERS.filter((c) => !only || c.id === only)) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2,
    colorScheme: 'dark'
  });
  const page = await context.newPage();
  console.log(`→ ${chapter.id}: ${chapter.url}`);
  if (chapter.passkey) await useVirtualPasskey(page, context);
  await page.goto(chapter.url, { waitUntil: 'domcontentloaded', timeout: 90_000 });
  await page.waitForTimeout(4000);
  if (chapter.passkey) {
    const create = page.getByRole('radio', { name: /create a passkey/i });
    if (await create.count()) {
      await create.first().check().catch(() => {});
      await page.waitForTimeout(500);
      // Both fields are required; an empty user id makes the WebAuthn create
      // call fail and the app falls back to "no identity".
      await page.getByPlaceholder(/user id/i).fill('ada@le-space.de');
      await page.getByPlaceholder(/display name/i).fill('Ada');
    }
  }
  await acceptConsent(page).catch((e) => console.log(`   consent: ${e.message}`));
  await useDarkMode(page);
  // The libp2p/OrbitDB boot chain needs a moment before the status pills go green.
  await page.waitForTimeout(12_000);
  await addTodos(page, chapter.todos).catch((e) => console.log(`   todos: ${e.message}`));
  await page.waitForTimeout(1500);
  const out = `${outDir}/simple-todo-${chapter.id}.png`;
  let y = chapter.y;
  if (chapter.anchor) {
    const box = await page.getByText(chapter.anchor).first().boundingBox();
    if (box) y = Math.max(0, box.y + (await page.evaluate(() => window.scrollY)) - chapter.anchorOffset);
  }
  await page.screenshot(raw ? { path: out } : { path: out, fullPage: true, clip: { ...CLIP, y } });
  if (!raw) {
    // WebP keeps these dark UI shots around a tenth of the PNG size; four of
    // them load on every visit to the projects section.
    execFileSync('magick', [out, '-quality', '82', out.replace(/\.png$/, '.webp')]);
    rmSync(out);
  }
  console.log(`   wrote ${raw ? out : out.replace(/\.png$/, '.webp')}`);
  await context.close();
}
await browser.close();
