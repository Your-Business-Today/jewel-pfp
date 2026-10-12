<script>
  /** @type {{ kicker: string, title: string, isOnDark?: boolean }} */
  let { kicker, title, isOnDark = false } = $props();
</script>

<p class="kicker text-gold mb-4">{kicker}</p>
<h2
  class="text-3xl md:text-4xl font-extrabold tracking-tight max-w-3xl leading-[1.1]"
  class:text-paper={isOnDark}
>
  {title}
</h2>
