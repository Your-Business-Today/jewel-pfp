<script>
  /** @type {{ kicker: string, title: string }} */
  let { kicker, title } = $props();
</script>

<p class="kicker text-gold mb-4">{kicker}</p>
<h2 class="text-3xl md:text-4xl font-extrabold tracking-tight max-w-3xl leading-[1.1]">
  {title}
</h2>
