<script>
  /** @type {{ text: Record<string, string>, explainerPath: string }} */
  let { text, explainerPath } = $props();
</script>

<div>
  <p class="kicker text-gold mb-4 lg:mb-6">{text.heroKicker}</p>
  <h1 class="text-3xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">{text.heroHeading}</h1>
  <p class="mt-4 lg:mt-6 text-base md:text-lg text-body max-w-xl leading-relaxed">{text.heroIntro}</p>
  <div class="mt-6 lg:mt-10 flex flex-wrap gap-4">
    <a href="/contact" class="bg-signal text-paper px-7 py-3.5 text-sm font-semibold hover:bg-signal/90 transition-colors">Book a survey</a>
    <a href={explainerPath} class="border border-white/25 px-7 py-3.5 text-sm font-semibold hover:border-gold hover:text-gold transition-colors">
      Take a fire door apart
    </a>
  </div>
  <p class="mt-6 lg:mt-12 text-[11px] uppercase tracking-widest2 text-note">Scroll to take the door set apart ↓</p>
</div>
