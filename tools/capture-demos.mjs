/**
 * Captures live demos for the project card slideshows.
 *
 *   node tools/capture-demos.mjs [--raw] [--only=<id>]
 *
 * Two families, sharing everything except how a page is made ready:
 *
 *  - the Simple Todo tutorial chapters, which need the consent dialog accepted,
 *    dark mode switched on and a few neutral todos seeded;
 *  - the OrbitDB WebAuthn DID demos, which need Carbon's theme attribute pinned
 *    to dark and a virtual authenticator so the passkey path is reachable.
 *
 * Each target is opened in a fresh context and the region that makes it
 * different is written to sites/local-first/public/media/<out>.webp.
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

// The WebAuthn demos use a wider content column than Simple Todo, so they get
// their own 16:9 window. The frame lands on the hero — heading, the highlighted
// claim and the technology label are what actually distinguish the three; the
// panel below them is near-identical everywhere.
const WADID_CLIP = { x: 128, width: 1024, height: 576 };

// Universal Connectivity fills the window, so the whole 16:9 viewport is the shot.
const FULL_CLIP = { x: 0, width: 1280, height: 720 };

const WADID = 'https://le-space.github.io/orbitdb-identity-provider-webauthn-did';

const CHAPTERS = [
  // --- Simple Todo tutorial chapters ---------------------------------------
  // the populated shared list — everyone lands in the same one, so frame the
  // list itself rather than the input box every chapter has
  { id: 'main', out: 'simple-todo-main', url: 'https://simple-todo.le-space.de', todos: TODOS, anchor: /^TODO Items/, anchorOffset: 70 },
  // "Shared list · <mnemonic>" plus the list it unlocks
  { id: 'collab01', out: 'simple-todo-collab01', url: 'https://collab01.le-space.de', todos: TODOS, y: 195 },
  // the green "Passkey DID did:key:…" badge in the header
  { id: 'passkey01', out: 'simple-todo-passkey01', url: 'https://passkey01.le-space.de', todos: TODOS, passkey: true, y: 15 },
  // "Create a private list" + "Open a shared list by address"
  { id: 'acl01', out: 'simple-todo-acl01', url: 'https://acl01.le-space.de', todos: TODOS, y: 175 },

  // --- OrbitDB WebAuthn DID demos ------------------------------------------
  // No consent gate here; the theme comes from Carbon's `theme` attribute, and
  // a virtual authenticator makes the passkey path reachable in all three.
  { id: 'webauthn-did', out: 'webauthn-did-identity', url: `${WADID}/webauthn-todo-demo/`, carbon: true, passkeyOnly: true, clip: 'wadid', y: 250 },
  { id: 'keystore', out: 'webauthn-did-keystore', url: `${WADID}/ed25519-encrypted-keystore-demo/`, carbon: true, passkeyOnly: true, clip: 'wadid', y: 250 },
  { id: 'varsig', out: 'webauthn-did-varsig', url: `${WADID}/webauthn-varsig-demo/`, carbon: true, passkeyOnly: true, clip: 'wadid', y: 250 },

  // --- Universal Connectivity ----------------------------------------------
  // Peer discovery needs a good half-minute before the list fills; a shot taken
  // earlier shows a lone "(You)" and quietly contradicts the card's claim of a
  // cross-language chat. `minPeers` makes the script wait for it rather than
  // trust a fixed timeout.
  { id: 'uc-chat', out: 'uc-chat-peers', url: 'https://connect.nicokrause.com', plain: true, minPeers: 2, clip: 'full', y: 0 },
  { id: 'uc-relay', out: 'uc-chat-relay', url: 'https://connect.nicokrause.com', plain: true, minPeers: 2, openRelay: true, clip: 'full', y: 0 },

  // --- plain pages, nothing to wait for -------------------------------------
  // These two cards showed the placeholder because no file ever existed for
  // them; both have a reachable page, so there is nothing to invent.
  // The blog boots a libp2p node behind a "Loading…" overlay; a fixed wait
  // caught it mid-initialisation, so wait for the overlay to actually go.
  // BLOCKED: blog.le-space.de currently hangs on its loading overlay because the
  // default blog address is wrong, so any shot taken here would advertise a
  // broken app. Re-enable once that is fixed — the target is otherwise ready.
  // { id: 'orbit-blog', out: 'orbit-blog', url: 'https://blog.le-space.de', plain: true, readyWhenGone: /Loading Peer-to-Peer/i, readyTimeout: 150_000, clip: 'full', y: 0 },
  { id: 'orbitdb-relay', out: 'orbitdb-relay', url: 'https://nikrause.github.io/orbitdb-relay/', plain: true, clip: 'full', y: 0 }
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

/**
 * Wait until the peer list has more than just us. Discovery routinely takes ~30s,
 * and a screenshot taken before that shows an empty room.
 */
async function waitForPeers(page, min, timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const n = await page.evaluate(() => {
      const panel = document.body.innerText.split('Peers')[1] ?? '';
      return panel.split('\n').filter((l) => /\S/.test(l)).length;
    });
    if (n >= min) return n;
    await page.waitForTimeout(5000);
  }
  console.log(`   warning: only saw fewer than ${min} peers before the timeout`);
  return 0;
}

/**
 * Poll until a loading marker is gone. Currently unused — the one target that
 * needed it (orbit-blog) is disabled above. Better than a longer fixed wait: it
 * neither cuts the shot short nor pads every run with dead time.
 */
async function waitUntilGone(page, pattern, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const present = await page.evaluate(
      (src) => new RegExp(src, 'i').test(document.body.innerText),
      pattern.source
    );
    if (!present) return true;
    await page.waitForTimeout(2000);
  }
  console.log('   warning: loading marker never disappeared; shooting anyway');
  return false;
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
  if (chapter.passkey || chapter.passkeyOnly) await useVirtualPasskey(page, context);
  // Carbon reads its palette off a `theme` attribute the demo's store writes on
  // mount from localStorage; seed it so the shot is dark without a UI round trip.
  if (chapter.carbon) {
    await context.addInitScript(() => {
      try {
        localStorage.setItem('carbon-theme', 'g100');
      } catch {
        /* ignore */
      }
    });
  }
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
  if (!chapter.passkeyOnly && !chapter.plain) {
    await acceptConsent(page).catch((e) => console.log(`   consent: ${e.message}`));
    await useDarkMode(page);
  }
  if (chapter.minPeers) await waitForPeers(page, chapter.minPeers);
  if (chapter.openRelay) {
    await page.getByRole('button', { name: /relay button/i }).first().click({ timeout: 20_000 });
    await page.waitForTimeout(6000);
  }
  // The libp2p/OrbitDB boot chain needs a moment before the status pills go green.
  await page.waitForTimeout(12_000);
  await addTodos(page, chapter.todos ?? []).catch((e) => console.log(`   todos: ${e.message}`));
  await page.waitForTimeout(1500);
  const out = `${outDir}/${chapter.out}.png`;
  let y = chapter.y;
  if (chapter.anchor) {
    const box = await page.getByText(chapter.anchor).first().boundingBox();
    if (box) y = Math.max(0, box.y + (await page.evaluate(() => window.scrollY)) - chapter.anchorOffset);
  }
  const box = chapter.clip === 'wadid' ? WADID_CLIP : chapter.clip === 'full' ? FULL_CLIP : CLIP;
  await page.screenshot(raw ? { path: out } : { path: out, fullPage: true, clip: { ...box, y } });
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
