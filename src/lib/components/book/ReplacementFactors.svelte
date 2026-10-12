<script>
  import { replacementFactors } from '$lib/booking/approvals.js';
  import SectionHeading from './SectionHeading.svelte';
</script>

<section class="mx-auto max-w-7xl px-6 py-20 md:py-28 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
  <div>
    <SectionHeading kicker="Replacement doorsets" title="Thinking of replacing your door?" />
    <p class="mt-6 text-muted-light leading-relaxed">
      Replacement fire doorsets typically cost around £2,000–£3,000. Opt in to the measure up &amp;
      invasive check when you book, or a return visit to measure is chargeable.
    </p>
  </div>
  <div>
    <p class="kicker text-muted-light mb-4">What can affect a replacement quote</p>
    <ul class="border-t border-ink/15">
      {#each replacementFactors as factor, i}
        <li class="flex items-baseline gap-5 border-b border-ink/15 py-4">
          <span class="font-label text-xs text-gold shrink-0">{i + 1}</span>
          <span class="text-sm leading-relaxed">{factor}</span>
        </li>
      {/each}
    </ul>
  </div>
</section>
