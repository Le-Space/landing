<script>
  import { t } from '@le-space/landing-shared/i18n';
  import { projects } from '@le-space/landing-shared/projects';
  import ProjectCard from './ProjectCard.svelte';

  let { activeLayer = null } = $props();

  const sorted = [...projects].sort((a, b) => (b.featured === true) - (a.featured === true));
</script>

<section id="projects" class="ls-section">
  <div class="ls-container">
    <h2 class="ls-section-title">{$t('projects.title')}</h2>
    <p class="ls-section-sub">{$t('projects.sub')}</p>

    <div class="grid">
      {#each sorted as project (project.id)}
        <ProjectCard
          {project}
          dimmed={activeLayer !== null && !project.layers.includes(activeLayer)}
        />
      {/each}
    </div>
  </div>
</section>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 22px;
  }
</style>
