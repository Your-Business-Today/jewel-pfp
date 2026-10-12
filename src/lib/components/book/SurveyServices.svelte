<script>
  import { surveyServices, survey } from '$lib/booking/survey.js';
  import SectionHeading from './SectionHeading.svelte';
</script>

<section id="why-survey" class="scroll-mt-16 mx-auto max-w-7xl px-6 py-20 md:py-28">
  <SectionHeading
    kicker="Three services, same £99 price"
    title="Choose what the £99 buys you. All three include an in-person inspection."
  />
  <div class="mt-12 grid gap-6 md:grid-cols-3">
    {#each surveyServices as surveyService, i}
      <article class="border border-ink/15 p-8 bg-paper-2">
        <p class="font-label text-sm text-signal">0{i + 1}</p>
        <h3 class="mt-4 text-xl font-extrabold tracking-tight">{surveyService.title}</h3>
        <p class="mt-3 text-sm text-muted-light leading-relaxed">{surveyService.body}</p>
        <p class="mt-6 font-label text-xs uppercase tracking-widest2 text-gold">{survey.price}</p>
      </article>
    {/each}
  </div>
</section>
