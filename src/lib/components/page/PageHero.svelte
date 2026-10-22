<script>
  /** @type {{ kicker: string, heading: string, intro: string, children?: import('svelte').Snippet }} */
  let { kicker, heading, intro, children } = $props();
</script>

<section class="bg-ink text-paper grid-bg border-b border-hairline">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
    <p class="kicker text-gold mb-6">{kicker}</p>
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.05]">
      {heading}
    </h1>
    <p class="mt-6 text-lg text-body max-w-xl leading-relaxed">
      {intro}
    </p>
  </div>
  {@render children?.()}
</section>
