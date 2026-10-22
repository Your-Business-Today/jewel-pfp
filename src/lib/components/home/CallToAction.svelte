<script>
  /** @type {{ text: Record<string, string>, phone: string }} */
  let { text, phone } = $props();
</script>

<section class="bg-signal text-paper">
  <div class="mx-auto max-w-7xl px-6 py-16 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
    <div>
      <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight">{text.ctaHeading}</h2>
      <p class="mt-3 max-w-md leading-relaxed text-paper/90">
        {text.ctaIntro}
      </p>
    </div>
    <div class="flex flex-wrap gap-4">
      <a
        href="/contact"
        class="bg-ink text-paper px-7 py-3.5 text-sm font-semibold hover:bg-ink-2 transition-colors"
      >
        Contact the team
      </a>
      <a
        href="tel:{phone.replaceAll(' ', '')}"
        class="border border-paper/40 px-7 py-3.5 text-sm hover:border-paper transition-colors"
      >
        {phone}
      </a>
    </div>
  </div>
</section>
