<script>
  import { onMount } from 'svelte';

  /** @type {{ seconds: number, isClosed: boolean, isHeldOpen: boolean, onwatch: () => void }} */
  let { seconds, isClosed, isHeldOpen = $bindable(), onwatch } = $props();
  let isMotionReduced = $state(false);
  const shownSeconds = $derived(seconds.toFixed(1));

  onMount(() => {
    isMotionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
</script>

<section class="border border-hairline bg-ink-2 p-5 space-y-3" aria-label="Closing action">
  <p class="kicker text-gold">Closing action</p>
  {#if isMotionReduced}
    <button type="button" class="border border-hairline px-4 py-2 text-xs hover:border-gold" onclick={() => (isHeldOpen = !isHeldOpen)}>
      {isHeldOpen ? 'Show it shut' : 'Show it open'}
    </button>
    <p class="text-sm text-note">Motion is reduced on this device, so the door is shown open and shut as stills.</p>
  {:else}
    <div class="flex items-center gap-4">
      <button type="button" class="border border-hairline px-4 py-2 text-xs hover:border-gold" onclick={onwatch}>Watch it close</button>
      <p class="text-3xl font-extrabold tabular-nums" aria-live="polite">{shownSeconds} s</p>
      {#if isClosed}<p class="text-sm text-note">Shut and latched.</p>{/if}
    </div>
  {/if}
  <p class="text-sm text-note">
    Open the door and let go: it should close fully on its own and click into its latch, without being so strong that people struggle to open it.
  </p>
</section>
