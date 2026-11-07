<script>
  import { goto } from '$app/navigation';
  import DoorsetCanvas from '$lib/components/doorset/DoorsetCanvas.svelte';
  import { doorTypes } from '$lib/doorset/doorTypes.js';
  import { sealConfigurations } from '$lib/doorset/seals.js';

  /** @type {{ text: Record<string, string> }} */
  let { text } = $props();
  const explainerPath = '/door-explainer';
</script>

<section class="bg-ink text-paper">
  <div class="mx-auto max-w-7xl px-6 py-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
    <div>
      <p class="kicker text-gold mb-6">{text.heroKicker}</p>
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">{text.heroHeading}</h1>
      <p class="mt-6 text-lg text-body max-w-xl leading-relaxed">{text.heroIntro}</p>
      <div class="mt-10 flex flex-wrap gap-4">
        <a href="/contact" class="bg-signal text-paper px-7 py-3.5 text-sm font-semibold hover:bg-signal/90 transition-colors">Book a survey</a>
        <a href={explainerPath} class="border border-white/25 px-7 py-3.5 text-sm font-semibold hover:border-gold hover:text-gold transition-colors">
          Take a fire door apart
        </a>
      </div>
    </div>
    <div class="h-[60vh] min-h-[24rem] border border-hairline grid-bg">
      <DoorsetCanvas
        chosen=""
        doorType={doorTypes.flush}
        sealConfiguration={sealConfigurations.twoIntumescent}
        explode={0}
        isShowingGaps={false}
        closingRequest={0}
        isHeldOpen={false}
        onchoose={() => goto(explainerPath)}
        onclosing={() => {}}
      />
    </div>
  </div>
</section>
