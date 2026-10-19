<script>
  import NoticeParagraph from './NoticeParagraph.svelte';
  import NoticeList from './NoticeList.svelte';
  import NoticeTable from './NoticeTable.svelte';
  let { blocks } = $props();
</script>

<div class="space-y-4 text-sm leading-relaxed text-muted-light">
  {#each blocks as block}
    {#if block.list}
      <NoticeList entries={block.list} />
    {:else if block.table}
      <NoticeTable table={block.table} />
    {:else}
      <NoticeParagraph lead={block.lead} text={block.text} />
    {/if}
  {/each}
</div>
