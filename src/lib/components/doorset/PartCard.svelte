<script>
  /** @type {{ card: { title: string, does: string, lookFor: string[] } }} */
  let { card } = $props();
</script>

<article class="border border-hairline bg-ink-2 p-6">
  <h2 class="text-2xl font-extrabold tracking-tight">{card.title}</h2>
  <p class="mt-4 text-sm leading-relaxed text-body">{card.does}</p>
  <p class="mt-5 kicker text-gold">What to look for</p>
  <ul class="mt-2 list-disc pl-5 space-y-1 text-sm text-note">
    {#each card.lookFor as point}
      <li>{point}</li>
    {/each}
  </ul>
</article>
