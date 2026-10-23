<script>
  import { replacementVisitReasons } from '$lib/booking/approvals.js';
  import SectionHeading from './SectionHeading.svelte';

  /** @type {{ replacementFactors: string[] }} */
  let { replacementFactors } = $props();
</script>

<section class="mx-auto max-w-7xl px-6 py-20 md:py-28 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
  <div class="space-y-4 text-body leading-relaxed">
    <SectionHeading kicker="Replacement doorsets" title="Thinking of replacing your door?" />
    <p class="pt-2">
      If you would like a replacement doorset, or an existing fire door survey report strongly indicates
      that replacement is required, opt in to the measure up and invasive check. We can then get all the
      information we need to provide an accurate quote for replacement in one visit.
    </p>
    <p>
      Replacement fire doorsets typically cost around £2,000–£3,000. This is why it’s so important for us
      to undertake a site visit to:
    </p>
    <ul class="list-disc pl-5 space-y-1">
      {#each replacementVisitReasons as reason}
        <li>{reason}</li>
      {/each}
    </ul>
    <p>
      The specification is usually determined by what’s required to meet fire door standards, rather than
      a style you can pick off a shelf, which can also influence the price. Following the site visit, we
      will issue a quotation for the confirmed scope of supply and installation.
    </p>
    <p>
      If you don’t opt in to the invasive check and it transpires that replacement is required, we will
      have to return – this additional visit is chargeable.
    </p>
  </div>
  <div>
    <h3 class="text-2xl font-extrabold tracking-tight">What can affect a replacement quote</h3>
    <p class="mt-3 mb-6 text-sm text-body leading-relaxed">
      The £99 site visit, if you opt in to an invasive check, also allows us to produce an accurate quote
      for replacement, which can vary depending on:
    </p>
    <ul class="border-t border-hairline">
      {#each replacementFactors as factor, i}
        <li class="flex items-baseline gap-5 border-b border-hairline py-4">
          <span class="text-xs text-gold shrink-0">{i + 1}</span>
          <span class="text-sm leading-relaxed">{factor}</span>
        </li>
      {/each}
    </ul>
  </div>
</section>
