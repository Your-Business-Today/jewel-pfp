<script>
  import { survey } from '$lib/booking/survey.js';
  import { checkoutTicks, paymentLinkFor } from '$lib/booking/checkoutTicks.js';

  /** @type {{ price: string }} */
  let { price } = $props();

  let tickedWords = $state(/** @type {string[]} */ ([]));
  let isReadyToPay = $derived(checkoutTicks.every((tick) => tickedWords.includes(tick.word)));
  let paymentLink = $derived(isReadyToPay ? paymentLinkFor(tickedWords) : undefined);
</script>

<div class="mt-10 space-y-4">
  <a href={survey.termsPdf} target="_blank" rel="noopener" class="inline-block text-sm text-paper underline hover:text-signal">
    Download our terms (PDF)
  </a>
  {#each checkoutTicks as tick}
    <label class="flex gap-3 text-sm leading-relaxed">
      <input type="checkbox" value={tick.word} bind:group={tickedWords} required class="mt-1 h-4 w-4 shrink-0 accent-signal" />
      <span>{tick.label}</span>
    </label>
  {/each}
</div>
<a
  href={paymentLink}
  rel="noopener"
  aria-disabled={!isReadyToPay}
  class="mt-6 inline-block px-7 py-3.5 text-sm font-semibold transition-colors {isReadyToPay
    ? 'bg-signal text-paper hover:bg-signal/90'
    : 'bg-white/15 text-muted-dark pointer-events-none'}"
>
  Pay {price} via Stripe
</a>
{#if !isReadyToPay}
  <p class="mt-2 text-xs text-muted-dark">Tick both boxes to continue to payment.</p>
{/if}
