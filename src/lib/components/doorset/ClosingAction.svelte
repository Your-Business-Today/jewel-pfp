<script>
  import { onMount } from 'svelte';
  import StatusMarker from './StatusMarker.svelte';
  import { markers } from '$lib/doorset/cards.js';
  import { closing } from '$lib/doorset/closing.js';

  /** @type {{ seconds: number, isClosed: boolean, isHeldOpen: boolean, onwatch: () => void }} */
  let { seconds, isClosed, isHeldOpen = $bindable(), onwatch } = $props();
  let isMotionReduced = $state(false);
  const shownSeconds = $derived(seconds.toFixed(1));

  onMount(() => {
    isMotionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
</script>

<section class="border border-white/15 bg-ink-2 p-5 space-y-3" aria-label="Closing action">
  <div class="flex flex-wrap items-center justify-between gap-3">
    <p class="kicker text-gold">Closing action</p>
    <StatusMarker marker={markers.confirm} />
  </div>
  {#if isMotionReduced}
    <button type="button" class="border border-white/20 px-4 py-2 font-label text-xs hover:border-signal" onclick={() => (isHeldOpen = !isHeldOpen)}>
      {isHeldOpen ? 'Show it shut' : 'Show it open'}
    </button>
    <p class="text-sm text-muted-dark">Motion is reduced on this device, so the door is shown open and shut as stills.</p>
  {:else}
    <div class="flex items-center gap-4">
      <button type="button" class="border border-white/20 px-4 py-2 font-label text-xs hover:border-signal" onclick={onwatch}>Watch it close</button>
      <p class="font-display text-3xl font-extrabold tabular-nums" aria-live="polite">{shownSeconds} s</p>
      {#if isClosed}<p class="text-sm text-muted-dark">Shut and latched.</p>{/if}
    </div>
  {/if}
  <p class="text-sm text-muted-dark">
    The door is opened, let go, and closes and latches by itself. It should take no more than {closing.limitSeconds} seconds. This drawing closes in {closing.closeSeconds}.
  </p>
  <p class="text-xs text-muted-dark">To confirm: what the {closing.limitSeconds} seconds is measured from and to.</p>
</section>
