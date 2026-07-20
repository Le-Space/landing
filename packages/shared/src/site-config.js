/**
 * Le-Space brand configuration.
 * Replaces the old convert-to-personal.js text-rewriting approach:
 * branding is data, not string substitution.
 *
 * Handles verified against convert-to-personal.js (Le-Space mode):
 *   X: @le_space_beta · Telegram: t.me/lfp2p · GitHub: github.com/le-space
 *   No LinkedIn in Le-Space mode · Bluesky/Discord identical in both modes
 */
export const siteConfig = {
  org: 'Le-Space',
  legalName: 'Le Space UG (haftungsbeschränkt)',
  domain: 'le-space.de',
  email: {
    contact: 'kontakt@le-space.de',
    contactEn: 'contact@le-space.de',
    info: 'info@le-space.de',
    privacy: 'datenschutzerklärung@le-space.de'
  },
  urls: {
    home: 'https://le-space.de',
    localFirst: 'https://local-first.le-space.de',
    blog: 'https://blog.le-space.de',
    github: 'https://github.com/le-space',
    ogImage: 'https://le-space.de/og-le-image.png'
  },
  // Le-Space mode social links (from convert-to-personal.js reverse mapping)
  socials: [
    { name: 'github', title: 'GitHub', url: 'https://github.com/le-space', handle: 'github.com/le-space' },
    { name: 'telegram', title: 'Telegram', url: 'https://t.me/lfp2p', handle: '@lfp2p' },
    { name: 'x', title: 'X (Twitter)', url: 'https://x.com/le_space_beta', handle: '@le_space_beta' },
    { name: 'bluesky', title: 'Bluesky', url: 'https://bsky.app/profile/seidenwege.bsky.social', handle: '@seidenwege.bsky.social' },
    { name: 'discord', title: 'Discord', url: 'https://discord.com/users/seidenwege', handle: 'seidenwege' }
  ],
  legal: {
    address: ['Le Space UG (haftungsbeschränkt)', 'Lichtenberg 44', '84307 Eggenfelden'],
    representative: 'Nico Krause',
    register: 'HRB 25885',
    registerCourt: 'Amtsgericht Leipzig',
    vatId: 'DE270240660',
    // Phone numbers as published on le-space.de (EN and DE imprint differ in source)
    phone: '+49 / 87 21 / 5 06 49 96',
    fax: '+49 / 87 21 / 5 06 49 94',
    phoneDe: '+498721-1289600-0',
    faxDe: '+498721-1289600-9'
  }
};
