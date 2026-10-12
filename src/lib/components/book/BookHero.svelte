<script>
  import { highlights, steps } from '$lib/booking/survey.js';
  import StepList from './StepList.svelte';
</script>

<section id="top" class="bg-ink text-paper grid-bg border-b border-white/10">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-28 grid gap-12 lg:grid-cols-[1.2fr_1fr] items-start">
    <div>
      <p class="kicker text-gold mb-6">Apartment door remedial works</p>
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
        Apartment door remedial works process.
      </h1>
      <p class="mt-6 text-lg text-muted-dark max-w-xl leading-relaxed">
        We take the defects raised in your existing fire door survey and clarify the real-world
        actions needed to make your door compliant.
      </p>
      <p class="mt-4 text-muted-dark max-w-xl leading-relaxed">
        From there we provide an accurate, bespoke quotation, removing the need for variations,
        abortive costs or uplifts later on.
      </p>
      <ul class="mt-8 flex flex-wrap gap-2">
        {#each highlights as highlight}
          <li class="font-label text-[11px] uppercase tracking-widest2 border border-white/20 px-3 py-1.5">
            {highlight}
          </li>
        {/each}
      </ul>
      <div class="mt-10 flex flex-wrap gap-4">
        <a href="#book" class="bg-signal text-paper px-7 py-3.5 text-sm font-semibold hover:bg-signal/90 transition-colors">
          Book your survey
        </a>
        <a href="#how-it-works" class="border border-white/25 px-7 py-3.5 text-sm font-label hover:border-signal hover:text-signal transition-colors">
          See how it works
        </a>
      </div>
    </div>

    <div id="how-it-works" class="scroll-mt-24 border border-white/15 bg-ink-2 p-8">
      <p class="kicker text-gold mb-3">What happens next</p>
      <h2 class="text-2xl font-extrabold tracking-tight mb-8">One clear path from report to completed works.</h2>
      <StepList {steps} isOnDark />
    </div>
  </div>
</section>
