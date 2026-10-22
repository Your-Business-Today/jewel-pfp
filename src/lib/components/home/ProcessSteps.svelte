<script>
  /** @type {{ text: Record<string, string>, steps: any[] }} */
  let { text, steps } = $props();
</script>

<section class="bg-ink text-paper grid-bg">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
    <p class="kicker text-gold mb-4">{text.processKicker}</p>
    <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight max-w-2xl">
      {text.processHeading}
    </h2>
    <div class="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-4 bg-white/10 border border-hairline">
      {#each steps as step}
        <div class="bg-ink p-8">
          <p class="text-xs text-gold">{step.n}</p>
          <h3 class="mt-6 text-lg font-bold">{step.title}</h3>
          <p class="mt-3 text-sm text-body leading-relaxed">{step.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
