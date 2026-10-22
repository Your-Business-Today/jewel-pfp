<script>
  import { onMount } from 'svelte';
  import DoorFallback from '$lib/components/home/DoorFallback.svelte';
  import HomeHero from '$lib/components/home/HomeHero.svelte';
  import StageCaptions from '$lib/components/home/StageCaptions.svelte';
  import ProgressRail from '$lib/components/home/ProgressRail.svelte';

  /** @type {{ text: Record<string, string>, captions: any[] }} */
  let { text, captions } = $props();

  const stageCount = 7;

  /** @type {HTMLElement | null} */
  let wrap = $state(null);
  /** @type {HTMLCanvasElement | null} */
  let canvas = $state(null);
  let progress = $state(0);
  let webglFailed = $state(false);

  const active = $derived(Math.min(stageCount - 1, Math.floor(progress * stageCount)));
  const heroOpacity = $derived(Math.max(0, 1 - progress * stageCount * 1.4));

  onMount(() => {
    /** @type {any} */
    let doorScene;
    let destroyed = false;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onScroll = () => {
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      progress = p;
      if (doorScene) {
        doorScene.setProgress(p);
        doorScene.setStage(Math.min(stageCount - 1, Math.floor(p * stageCount)));
        if (reduced) doorScene.snap();
      }
    };

    const onResize = () => {
      doorScene?.resize();
      onScroll();
    };

    (async () => {
      try {
        const { createDoorScene } = await import('$lib/door3d.js');
        if (destroyed || !canvas) return;
        doorScene = createDoorScene(canvas);
        onScroll();
      } catch (e) {
        console.error('WebGL init failed', e);
        webglFailed = true;
      }
    })();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();

    return () => {
      destroyed = true;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      doorScene?.destroy();
    };
  });
</script>

<section bind:this={wrap} class="relative bg-ink text-paper" style:height="{stageCount * 100}vh">
  <div class="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden grid-bg">
    {#if !webglFailed}
      <canvas bind:this={canvas} class="absolute inset-0 h-full w-full"></canvas>
    {:else}
      <DoorFallback />
    {/if}
    <HomeHero {text} {heroOpacity} />
    <StageCaptions {captions} {active} />
    <ProgressRail stageCount={stageCount} {active} />
  </div>
</section>
