import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
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
