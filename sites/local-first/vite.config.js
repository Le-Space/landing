import { defineConfig } from 'vite';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// Build stamp for the footer. GITHUB_SHA is set in CI, where the checkout is a
// detached HEAD that `git rev-parse` would still answer correctly — but reading
// the env avoids shelling out at all. SOURCE_DATE_EPOCH keeps the stamp
// reproducible if the build is ever pinned.
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const commit = (
  // APP_COMMIT wins: in CI the release bump lands after the trigger, so
  // GITHUB_SHA would name the commit before the version this build carries.
  process.env.APP_COMMIT ??
  process.env.GITHUB_SHA ??
  (() => {
    try {
      return execSync('git rev-parse HEAD', { encoding: 'utf8' });
    } catch {
      return 'unknown';
    }
  })()
)
  .trim()
  .slice(0, 7);
const builtAt = new Date(
  process.env.SOURCE_DATE_EPOCH ? Number(process.env.SOURCE_DATE_EPOCH) * 1000 : Date.now()
)
  .toISOString()
  .slice(0, 10);

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __APP_COMMIT__: JSON.stringify(commit),
    __APP_BUILT_AT__: JSON.stringify(builtAt)
  },
  plugins: [
    svelte(),
    // libp2p (used by the live NetworkViz) needs a few Node globals/shims in the browser.
    nodePolyfills({
      include: [
        'path',
        'util',
        'buffer',
        'process',
        'events',
        'crypto',
        'os',
        'stream',
        'string_decoder',
        'readable-stream',
        'safe-buffer'
      ],
      globals: { Buffer: true, global: true, process: true },
      protocolImports: true
    })
  ],
  optimizeDeps: {
    exclude: ['@le-space/landing-shared']
  },
  build: {
    target: 'es2022'
  }
});
