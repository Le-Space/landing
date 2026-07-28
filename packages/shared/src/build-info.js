/**
 * Build stamp shown in the footer.
 *
 * The values are replaced at build time by the `define` block in each site's
 * vite.config.js. A bare package version would not answer the question the
 * footer is actually there for — "is the deploy I am looking at the one I just
 * pushed?" — so the commit and build date travel with it.
 *
 * The fallbacks apply only in `vite dev`, where no define is substituted.
 */
export const version = typeof __APP_VERSION__ === 'string' ? __APP_VERSION__ : '0.0.0';
export const commit = typeof __APP_COMMIT__ === 'string' ? __APP_COMMIT__ : 'dev';
export const builtAt = typeof __APP_BUILT_AT__ === 'string' ? __APP_BUILT_AT__ : '';

/** e.g. "v0.1.0 · a1b2c3d · 2026-07-28" */
export const buildStamp = [`v${version}`, commit, builtAt].filter(Boolean).join(' · ');
