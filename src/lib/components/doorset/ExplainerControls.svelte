<script>
  /** @type {{ explode: number, isShowingGaps: boolean }} */
  let { explode = $bindable(), isShowingGaps = $bindable() } = $props();
</script>

<div class="flex flex-wrap items-center gap-x-8 gap-y-4">
  <label class="flex flex-1 min-w-[16rem] items-center gap-4 text-sm">
    <span class="kicker text-gold shrink-0">Put together</span>
    <input type="range" min="0" max="1" step="0.01" bind:value={explode} class="w-full accent-signal" aria-label="Take the door set apart" />
    <span class="kicker text-gold shrink-0">Take apart</span>
  </label>
  <label class="flex items-center gap-3 text-sm">
    <input type="checkbox" bind:checked={isShowingGaps} class="h-4 w-4 accent-signal" />
    Show the gaps
  </label>
</div>
