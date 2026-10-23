<script>
  import StatusMarker from './StatusMarker.svelte';
  import { markers } from '$lib/doorset/cards.js';

  /** @type {{ card: { title: string, marker: string, does: string, lookFor: string[], toConfirm: string[] } }} */
  let { card } = $props();
</script>

<article class="border border-hairline bg-ink-2 p-6">
  <div class="flex flex-wrap items-center justify-between gap-3">
    <h2 class="text-2xl font-extrabold tracking-tight">{card.title}</h2>
    <StatusMarker marker={card.marker} />
  </div>
  <p class="mt-4 text-sm leading-relaxed text-body">{card.does}</p>
  <p class="mt-5 kicker text-gold">What to look for</p>
  <ul class="mt-2 list-disc pl-5 space-y-1 text-sm text-note">
    {#each card.lookFor as point}
      <li>{point}</li>
    {/each}
  </ul>
  <p class="mt-5 kicker text-gold">Still to confirm</p>
  <ul class="mt-2 space-y-2 text-sm text-note">
    {#each card.toConfirm as point}
      <li class="flex items-start gap-3"><StatusMarker marker={markers.confirm} /><span>{point}</span></li>
    {/each}
  </ul>
</article>
