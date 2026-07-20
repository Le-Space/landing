<script>
  import ParticlesBackground from '@le-space/landing-shared/components/ParticlesBackground.svelte';
  import Footer from '@le-space/landing-shared/components/Footer.svelte';
  import Hero from './components/Hero.svelte';
  import StackSection from './components/StackSection.svelte';
  import ProjectsSection from './components/ProjectsSection.svelte';

  let activeLayer = $state(null);
</script>

<ParticlesBackground />

<main>
  <Hero />
  <StackSection bind:activeLayer />
  <ProjectsSection {activeLayer} />

  <!-- Phase 2: <LiveTodos addresses={[...]} bootstrap={[...]} /> -->
</main>

<Footer />

<style>
  main {
    position: relative;
    z-index: 1;
  }
</style>
