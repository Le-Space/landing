<script>
  import ParticlesBackground from '@le-space/landing-shared/components/ParticlesBackground.svelte';
  import LanguageSwitcher from '@le-space/landing-shared/components/LanguageSwitcher.svelte';
  import Footer from '@le-space/landing-shared/components/Footer.svelte';
  import Hero from './components/Hero.svelte';
  import StackSection from './components/StackSection.svelte';
  import ProjectsSection from './components/ProjectsSection.svelte';
  import FaqSection from './components/FaqSection.svelte';

  let activeLayer = $state(null);
</script>

<ParticlesBackground />
<LanguageSwitcher />

<main>
  <Hero />
  <StackSection bind:activeLayer />
  <ProjectsSection {activeLayer} />
  <FaqSection />

  <!-- Phase 2: <LiveTodos addresses={[...]} bootstrap={[...]} /> -->
</main>

<Footer />

<style>
  main {
    position: relative;
    z-index: 1;
  }
</style>
