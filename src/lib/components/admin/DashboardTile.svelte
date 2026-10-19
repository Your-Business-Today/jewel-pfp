<script>
  let { href, label, figure, note } = $props();
</script>

<a {href} class="block border border-ink/15 bg-paper p-6 hover:border-signal transition-colors">
  <p class="kicker text-muted-light">{label}</p>
  <p class="mt-3 text-4xl font-extrabold tracking-tight">{figure ?? '—'}</p>
  <p class="mt-2 text-sm text-muted-light">{note}</p>
</a>
