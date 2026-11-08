<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import DoorsetCanvas from '$lib/components/doorset/DoorsetCanvas.svelte';
  import HomeIntro from './HomeIntro.svelte';
  import { doorTypes } from '$lib/doorset/doorTypes.js';
  import { sealConfigurations } from '$lib/doorset/seals.js';
  import { scrollProgressThrough } from '$lib/doorset/scrollProgress.js';

  /** @type {{ text: Record<string, string> }} */
  let { text } = $props();
  const explainerPath = '/door-explainer';
  /** @type {HTMLElement | undefined} */
  let section = $state();
  let explode = $state(0);

  onMount(() => {
    const followScroll = () => {
      if (section) explode = scrollProgressThrough(section);
    };
    window.addEventListener('scroll', followScroll, { passive: true });
    window.addEventListener('resize', followScroll);
    followScroll();
    return () => {
      window.removeEventListener('scroll', followScroll);
      window.removeEventListener('resize', followScroll);
    };
  });
</script>

<section bind:this={section} class="relative bg-ink text-paper lg:h-[250vh]">
  <div class="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-hidden">
    <div class="mx-auto lg:h-full max-w-7xl px-6 py-10 lg:py-14 grid gap-6 lg:gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
      <HomeIntro {text} {explainerPath} />
      <div class="h-[55vh] lg:h-full lg:max-h-[70vh] min-h-[16rem] border border-hairline grid-bg">
        <DoorsetCanvas
          chosen=""
          doorType={doorTypes.flush}
          sealConfiguration={sealConfigurations.twoIntumescent}
          {explode}
          isShowingGaps={false}
          closingRequest={0}
          isHeldOpen={false}
          onchoose={() => goto(explainerPath)}
          onclosing={() => {}}
        />
      </div>
    </div>
  </div>
</section>
