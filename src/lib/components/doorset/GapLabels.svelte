<script>
  /** @type {{ labels: { key: string, label: string, x: number, y: number }[] }} */
  let { labels } = $props();
</script>

{#each labels as label (label.key)}
  <span
    class="pointer-events-none absolute -translate-x-1/2 -translate-y-full whitespace-nowrap bg-status-red px-2 py-1 font-label text-[11px] font-bold text-white"
    style:left="{label.x}px"
    style:top="{label.y}px"
  >
    {label.label}
  </span>
{/each}
