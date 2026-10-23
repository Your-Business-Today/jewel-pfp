<script>
  /** @type {{ text: Record<string, string>, services: any[] }} */
  let { text, services } = $props();
</script>

<section class="mx-auto max-w-7xl px-6 py-20 md:py-28">
  <div class="flex items-end justify-between mb-12">
    <div>
      <p class="kicker text-gold mb-4">{text.servicesKicker}</p>
      <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight whitespace-pre-line">{text.servicesHeading}</h2>
    </div>
    <a
      href="/services"
      class="hidden md:inline text-xs uppercase tracking-widest2 border-b border-hairline pb-1 hover:text-gold hover:border-gold transition-colors"
    >
      All services →
    </a>
  </div>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-hairline">
    {#each services as s}
      <a
        href="/services#{s.slug}"
        class="group border-b border-r border-hairline p-8 hover:bg-ink-2 transition-colors"
      >
        <p class="text-xs text-gold mb-6">{s.index}</p>
        <h3 class="text-xl font-bold tracking-tight">{s.title}</h3>
        <p class="mt-3 text-sm leading-relaxed text-body group-hover:text-body">
          {s.summary}
        </p>
        <p class="mt-6 text-[11px] uppercase tracking-widest2 text-gold opacity-0 group-hover:opacity-100 transition-opacity">
          Detail →
        </p>
      </a>
    {/each}
  </div>
</section>
