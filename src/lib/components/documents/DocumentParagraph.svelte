<script>
  let { lead = '', text } = $props();
</script>

<p>
  {#if lead}<strong class="text-ink">{lead}</strong>{/if}
  {text}
</p>
