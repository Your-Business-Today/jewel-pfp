<script>
  let { result } = $props();
</script>

{#if result?.problem}
  <p class="text-sm text-signal">{result.problem}</p>
{:else if result?.isSaved}
  <p class="text-sm text-muted-light">Saved. The website shows it now.</p>
{/if}
