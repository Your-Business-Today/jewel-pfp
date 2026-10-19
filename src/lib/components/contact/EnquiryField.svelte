<script>
  let { label, children } = $props();
</script>

<label class="block">
  <span class="font-label text-[11px] uppercase tracking-widest2 text-muted-light block mb-2">{label}</span>
  {@render children()}
</label>
