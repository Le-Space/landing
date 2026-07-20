<script>
  import { siteConfig } from '../site-config.js';
  import TelegramIcon from '../icons/telegram.svg?raw';
  import GithubIcon from '../icons/github.svg?raw';
  import XTwitterIcon from '../icons/x-twitter.svg?raw';
  import LinkedinIcon from '../icons/linkedin.svg?raw';
  import BlueskyIcon from '../icons/bluesky.svg?raw';
  import DiscordIcon from '../icons/discord.svg?raw';

  const icons = {
    telegram: TelegramIcon,
    github: GithubIcon,
    x: XTwitterIcon,
    linkedin: LinkedinIcon,
    bluesky: BlueskyIcon,
    discord: DiscordIcon
  };
</script>

<div class="social-icons">
  {#each siteConfig.socials as s (s.name)}
    <a
      class="social-icon"
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      title="{s.title} — {s.handle}"
      aria-label={s.title}
    >
      {@html icons[s.name]}
    </a>
  {/each}
</div>

<style>
  .social-icons {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .social-icon {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--ls-card-border);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ls-text);
    transition: all 0.25s ease;
  }

  .social-icon:hover {
    background: rgba(255, 255, 255, 0.14);
    transform: translateY(-2px) scale(1.08);
    box-shadow: var(--ls-glow-accent);
  }

  .social-icon :global(svg) {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
</style>
