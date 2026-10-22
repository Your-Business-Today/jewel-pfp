<script>
  import DocumentParagraph from './DocumentParagraph.svelte';
  let { entries } = $props();
</script>

<ul class="list-disc pl-5 space-y-2">
  {#each entries as entry}
    <li>
      <DocumentParagraph lead={entry.lead} text={entry.text} />
      {#if entry.items}
        <ul class="mt-2 list-[circle] pl-5 space-y-1">
          {#each entry.items as item}
            <li>{item}</li>
          {/each}
        </ul>
      {/if}
    </li>
  {/each}
</ul>
