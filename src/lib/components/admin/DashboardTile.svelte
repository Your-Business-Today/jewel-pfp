<script>
  let { href, label, figure, note } = $props();
</script>

<a {href} class="block border border-hairline bg-ink p-6 hover:border-gold transition-colors">
  <p class="kicker text-gold">{label}</p>
  <p class="mt-3 text-4xl font-extrabold tracking-tight">{figure ?? '—'}</p>
  <p class="mt-2 text-sm text-body">{note}</p>
</a>
