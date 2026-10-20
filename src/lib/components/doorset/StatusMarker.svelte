<script>
  import { markers } from '$lib/doorset/cards.js';

  /** @type {{ marker: string }} */
  let { marker } = $props();
  const isSeen = $derived(marker === markers.seen);
</script>

<span class="inline-block px-2 py-1 font-label text-[11px] font-bold tracking-widest2 {isSeen ? 'bg-status-green text-white' : 'bg-status-yellow text-black'}">
  {marker}
</span>
