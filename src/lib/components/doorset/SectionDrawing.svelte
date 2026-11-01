<script>
  import StatusMarker from './StatusMarker.svelte';
  import { markers } from '$lib/doorset/cards.js';

  /** @typedef {{ key: string, tone: string, x: number, y: number, width: number, height: number }} Shape */
  /** @typedef {{ key: string, label: string, labelY: number, pointX: number, pointY: number }} Callout */
  /** @type {{ shapes: Shape[], callouts: Callout[], width: number, height: number, labelX: number, description: string, caption: string }} */
  let { shapes, callouts, width, height, labelX, description, caption } = $props();
  /** @type {Record<string, string>} */
  const toneClass = {
    frame: 'fill-body',
    leaf: 'fill-hairline',
    intumescent: 'fill-gold',
    smoke: 'fill-note',
    wall: 'fill-footer',
    fireStopping: 'fill-gold'
  };
</script>

<figure class="border border-hairline bg-ink-2 p-4">
  <svg viewBox="0 0 {width} {height}" class="w-full" role="img" aria-label={description}>
    {#each shapes as shape (shape.key)}
      <rect x={shape.x} y={shape.y} width={shape.width} height={shape.height} class={toneClass[shape.tone]} />
    {/each}
    {#each callouts as callout (callout.key)}
      <line x1={callout.pointX} y1={callout.pointY} x2={labelX - 2} y2={callout.labelY} class="stroke-note" stroke-width="0.4" />
      <circle cx={callout.pointX} cy={callout.pointY} r="0.9" class="fill-paper" />
      <text x={labelX} y={callout.labelY + 1.5} font-size="4.5" class="fill-paper">{callout.label}</text>
    {/each}
  </svg>
  <figcaption class="mt-3 flex flex-wrap items-center gap-3 text-xs text-note">
    <StatusMarker marker={markers.confirm} />
    <span>{caption}</span>
  </figcaption>
</figure>
