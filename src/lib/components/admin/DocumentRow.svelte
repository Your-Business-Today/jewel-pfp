<script>
  import DocumentInput from './DocumentInput.svelte';

  let { documentList, row, position, isLast, onmove, onremove } = $props();
  const up = -1;
  const down = 1;
  const isFirst = $derived(position === 0);
  const buttonClass = 'font-label text-[11px] uppercase tracking-widest2 border border-ink/20 px-2.5 py-1.5 hover:border-signal hover:text-signal disabled:opacity-30';
</script>

<div class="mt-4 border border-ink/15 bg-paper-2 px-5 pb-2">
  <div class="flex flex-wrap items-center justify-between gap-3 pt-4">
    <span class="kicker text-gold">Entry {position + 1}</span>
    <div class="flex flex-wrap gap-2">
      <button type="button" class={buttonClass} disabled={isFirst} aria-label="Move up" onclick={() => onmove(position, up)}>▲</button>
      <button type="button" class={buttonClass} disabled={isLast} aria-label="Move down" onclick={() => onmove(position, down)}>▼</button>
      <button type="button" class={buttonClass} onclick={() => onremove(position)}>Remove</button>
    </div>
  </div>
  {#each documentList.columns as column (column.key)}
    <DocumentInput
      name="{documentList.key}.{position}.{column.key}"
      label={column.label}
      kind={column.kind}
      isRequired={column.isRequired}
      bind:text={row[column.key]}
    />
  {/each}
</div>
