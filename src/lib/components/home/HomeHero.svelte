<script>
  /** @type {{ text: Record<string, string>, heroOpacity: number }} */
  let { text, heroOpacity } = $props();
</script>

<div
  class="absolute inset-0 flex items-center pointer-events-none"
  style:opacity={heroOpacity}
  style:visibility={heroOpacity <= 0.01 ? 'hidden' : 'visible'}
>
  <div class="mx-auto w-full max-w-7xl px-6">
    <div class="max-w-2xl pointer-events-auto">
      <p class="kicker text-gold mb-6">{text.heroKicker}</p>
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
        {text.heroHeading}
      </h1>
      <p class="mt-6 text-lg text-body max-w-xl leading-relaxed">
        {text.heroIntro}
      </p>
      <div class="mt-10 flex flex-wrap gap-4">
        <a
          href="/contact"
          class="bg-signal text-paper px-7 py-3.5 text-sm font-semibold hover:bg-signal/90 transition-colors"
        >
          Book a survey
        </a>
        <a
          href="/services"
          class="border border-white/25 px-7 py-3.5 text-sm font-semibold hover:border-gold hover:text-gold transition-colors"
        >
          Our services
        </a>
      </div>
      <p class="mt-14 text-[11px] uppercase tracking-widest2 text-note animate-pulse">
        Scroll to inspect the door ↓
      </p>
    </div>
  </div>
</div>
