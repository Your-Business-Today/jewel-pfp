<script>
  import { untrack } from 'svelte';
  import { listLimits } from '$lib/content/limits.js';
  import { textFromValue } from '$lib/content/documents/kinds.js';
  import DocumentRow from './DocumentRow.svelte';

  /** @type {{ documentList: import('$lib/content/documents/parts.js').DocumentList, savedRows: Record<string, any>[] }} */
  let { documentList, savedRows } = $props();
  const columns = untrack(() => documentList.columns);

  /** @param {Record<string, any>} row */
  function editableRow(row) {
    return Object.fromEntries(columns.map((column) => [column.key, textFromValue(column.kind, row[column.key])]));
  }

  let rows = $state(untrack(() => savedRows.map(editableRow)));
  const isFull = $derived(rows.length >= listLimits.rows);

  /** @param {number} position @param {number} step */
  function move(position, step) {
    const [row] = rows.splice(position, 1);
    rows.splice(position + step, 0, row);
  }

  /** @param {number} position */
  function remove(position) {
    rows.splice(position, 1);
  }

  function add() {
    rows.push(editableRow({}));
  }
</script>

<fieldset class="mt-10">
  <legend class="text-xl font-bold tracking-tight">{documentList.label}</legend>
  <input type="hidden" name="{documentList.key}.count" value={rows.length} />
  {#each rows as row, position (row)}
    <DocumentRow {documentList} {row} {position} isLast={position === rows.length - 1} onmove={move} onremove={remove} />
  {/each}
  <button type="button" class="mt-4 font-label text-xs uppercase tracking-widest2 border border-ink/20 px-3 py-2 hover:border-signal hover:text-signal disabled:opacity-30" disabled={isFull} onclick={add}>
    Add an entry
  </button>
</fieldset>
