<script>
  import { surveyServices, serviceNotes } from '$lib/booking/survey.js';
  import SectionHeading from './SectionHeading.svelte';

  /** @type {{ price: string }} */
  let { price } = $props();
</script>

<section id="why-survey" class="scroll-mt-16 mx-auto max-w-7xl px-6 py-20 md:py-28">
  <SectionHeading
    kicker="Three services, same £99 price"
    title="Choose what the £99 buys you — all three include an in-person inspection."
  />
  <div class="mt-12 grid gap-6 md:grid-cols-3">
    {#each surveyServices as surveyService, i}
      <article class="border border-hairline p-8 bg-ink-2">
        <p class="text-sm text-gold">0{i + 1}</p>
        <h3 class="mt-4 text-xl font-extrabold tracking-tight">{surveyService.title}</h3>
        <p class="mt-3 text-sm text-body leading-relaxed">{surveyService.body}</p>
        <p class="mt-6 text-xs uppercase tracking-widest2 text-gold">{price}</p>
      </article>
    {/each}
  </div>
  <ul class="mt-10 grid gap-3 md:grid-cols-3 text-sm text-body">
    {#each serviceNotes as note}
      <li class="flex gap-3"><span class="text-gold">✓</span>{note}</li>
    {/each}
  </ul>
</section>
