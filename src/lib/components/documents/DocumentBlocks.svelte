<script>
  import DocumentParagraph from './DocumentParagraph.svelte';
  import DocumentList from './DocumentList.svelte';
  import DocumentTable from './DocumentTable.svelte';
  let { blocks } = $props();
</script>

<div class="space-y-4 text-sm leading-relaxed text-muted-light">
  {#each blocks as block}
    {#if block.list}
      <DocumentList entries={block.list} />
    {:else if block.table}
      <DocumentTable table={block.table} />
    {:else}
      <DocumentParagraph lead={block.lead} text={block.text} />
    {/if}
  {/each}
</div>
