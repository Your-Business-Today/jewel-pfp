<script>
  import { steps } from '$lib/booking/survey.js';
  import StepList from './StepList.svelte';

  /** @type {{ intro: string, highlights: string[] }} */
  let { intro, highlights } = $props();
</script>

<section id="top" class="bg-ink text-paper grid-bg border-b border-hairline">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-28 grid gap-12 lg:grid-cols-[1.2fr_1fr] items-start">
    <div>
      <p class="kicker text-gold mb-6">Apartment door remedial works</p>
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
        Apartment door remedial works process.
      </h1>
      <p class="mt-6 text-body max-w-xl leading-relaxed">{intro}</p>
      <ul class="mt-8 flex flex-wrap gap-2">
        {#each highlights as highlight}
          <li class="text-[11px] uppercase tracking-widest2 border border-hairline px-3 py-1.5">
            {highlight}
          </li>
        {/each}
      </ul>
      <div class="mt-10 flex flex-wrap gap-4">
        <a href="#book" class="bg-signal text-paper px-7 py-3.5 text-sm font-semibold hover:bg-signal/90 transition-colors">
          Book your survey
        </a>
        <a href="#how-it-works" class="border border-white/25 px-7 py-3.5 text-sm hover:border-gold hover:text-gold transition-colors">
          See how it works
        </a>
      </div>
    </div>

    <div class="border border-hairline bg-ink-2 p-8">
      <p class="kicker text-gold mb-3">What happens next</p>
      <h2 class="text-2xl font-extrabold tracking-tight mb-8">One clear path from report to completed works.</h2>
      <StepList {steps} />
    </div>
  </div>
</section>
