<script>
  let { lead = '', text } = $props();
</script>

<p>
  {#if lead}<strong class="text-paper">{lead}</strong>{/if}
  {text}
</p>
