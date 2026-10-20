<script>
  import StatusMarker from './StatusMarker.svelte';
  import { markers } from '$lib/doorset/cards.js';
  import { sectionShapes } from '$lib/doorset/sealSection.js';

  /** @type {{ sealConfiguration: string }} */
  let { sealConfiguration } = $props();
  const shapes = $derived(sectionShapes(sealConfiguration));
  const labelX = 122;
  /** @type {Record<string, string>} */
  const toneClass = { frame: 'fill-paper-2', leaf: 'fill-muted-light', intumescent: 'fill-gold', smoke: 'fill-muted-dark' };
</script>

<figure class="border border-white/15 bg-ink-2 p-4">
  <svg viewBox="0 0 250 112" class="w-full" role="img" aria-label="Close-up plan section through the lock side of the frame, showing the seals">
    {#each shapes as shape (shape.key)}
      <rect x={shape.x} y={shape.y} width={shape.width} height={shape.height} class={toneClass[shape.tone]} />
    {/each}
    {#each shapes as shape (shape.key)}
      <line x1={shape.pointX} y1={shape.pointY} x2={labelX - 2} y2={shape.labelY} class="stroke-muted-dark" stroke-width="0.4" />
      <circle cx={shape.pointX} cy={shape.pointY} r="0.9" class="fill-paper" />
      <text x={labelX} y={shape.labelY + 1.5} font-size="4.5" class="fill-paper">{shape.label}</text>
    {/each}
  </svg>
  <figcaption class="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-dark">
    <StatusMarker marker={markers.confirm} />
    <span>Seal type, size and position. Close-up looking down on the lock side, drawn larger than life.</span>
  </figcaption>
</figure>
