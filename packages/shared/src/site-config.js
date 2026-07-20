/**
 * Le-Space brand configuration.
 * Replaces the old convert-to-personal.js text-rewriting approach:
 * branding is data, not string substitution.
 */
export const siteConfig = {
  org: 'Le-Space',
  domain: 'le-space.de',
  email: {
    contact: 'kontakt@le-space.de',
    contactEn: 'contact@le-space.de',
    privacy: 'datenschutzerklärung@le-space.de'
  },
  urls: {
    home: 'https://le-space.de',
    localFirst: 'https://local-first.le-space.de',
    blog: 'https://blog.le-space.de',
    github: 'https://github.com/le-space'
  },
  // Le-Space mode social links (see nico-krause-landing convert map)
  socials: [
    { name: 'github', title: 'GitHub', url: 'https://github.com/le-space', handle: 'github.com/le-space' },
    { name: 'telegram', title: 'Telegram', url: 'https://t.me/seidenwege', handle: '@seidenwege' },
    { name: 'x', title: 'X (Twitter)', url: 'https://x.com/nicokrausex', handle: '@nicokrausex' },
    { name: 'linkedin', title: 'LinkedIn', url: 'https://www.linkedin.com/in/nicokrause/', handle: '@nicokrause' },
    { name: 'bluesky', title: 'Bluesky', url: 'https://bsky.app/profile/seidenwege.bsky.social', handle: '@seidenwege.bsky.social' },
    { name: 'discord', title: 'Discord', url: 'https://discord.com/users/seidenwege', handle: 'seidenwege' }
  ],
  legal: {
    phone: '+49 / 87 21 / 5 06 49 96',
    // TODO: copy full Impressum/Datenschutz blocks from the existing le-space Footer
    imprintUrl: '#imprint',
    privacyUrl: '#privacy'
  }
};
