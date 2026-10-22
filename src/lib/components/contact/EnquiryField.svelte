<script>
  let { label, children } = $props();
</script>

<label class="block">
  <span class="text-[11px] uppercase tracking-widest2 text-body block mb-2">{label}</span>
  {@render children()}
</label>
