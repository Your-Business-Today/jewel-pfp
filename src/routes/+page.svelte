<script>
  import { onMount } from 'svelte';
  import { pageText } from '$lib/content/pageText.js';
  import { captionsFrom, stepsFrom } from '$lib/content/homeSections.js';

  let { data } = $props();
  const { services, accreditations, contact, text: savedText } = $derived(data.site);
  const text = $derived(pageText(savedText, 'home'));

  // ---------- scroll-driven 3D door ----------
  const STAGES = 7; // hero + 5 components + outro

  const captions = $derived(captionsFrom(text));

  /** @type {HTMLElement | null} */
  let wrap = $state(null);
  /** @type {HTMLCanvasElement | null} */
  let canvas = $state(null);
  let progress = $state(0);
  let webglFailed = $state(false);

  const active = $derived(Math.min(STAGES - 1, Math.floor(progress * STAGES)));
  const heroOpacity = $derived(Math.max(0, 1 - progress * STAGES * 1.4));

  onMount(() => {
    /** @type {any} */
    let doorScene;
    let destroyed = false;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onScroll = () => {
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      progress = p;
      if (doorScene) {
        doorScene.setProgress(p);
        doorScene.setStage(Math.min(STAGES - 1, Math.floor(p * STAGES)));
        if (reduced) doorScene.snap();
      }
    };

    const onResize = () => {
      doorScene?.resize();
      onScroll();
    };

    (async () => {
      try {
        const { createDoorScene } = await import('$lib/door3d.js');
        if (destroyed || !canvas) return;
        doorScene = createDoorScene(canvas);
        onScroll();
      } catch (e) {
        console.error('WebGL init failed', e);
        webglFailed = true;
      }
    })();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();

    return () => {
      destroyed = true;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      doorScene?.destroy();
    };
  });

  const steps = $derived(stepsFrom(text));
</script>

<svelte:head>
  <title>{text.seoTitle}</title>
  <meta name="description" content={text.seoDescription} />
</svelte:head>

<!-- SCROLL EXPERIENCE: anatomy of a fire door -->
<section bind:this={wrap} class="relative bg-ink text-paper" style="height: {STAGES * 100}vh">
  <div class="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden grid-bg">
    {#if !webglFailed}
      <canvas bind:this={canvas} class="absolute inset-0 h-full w-full"></canvas>
    {:else}
      <!-- static fallback -->
      <div class="absolute inset-0 flex items-center justify-end pr-[8vw]" aria-hidden="true">
        <svg viewBox="0 0 420 480" class="hidden lg:block w-full max-w-sm" fill="none">
          <rect x="90" y="30" width="200" height="420" stroke="#9BA0A8" stroke-width="1.5" />
          <rect x="102" y="42" width="176" height="408" stroke="#F2F1EC" stroke-width="1.5" />
          <line x1="96" y1="36" x2="96" y2="450" stroke="#D7282E" stroke-width="2" />
          <rect x="160" y="90" width="60" height="130" stroke="#9BA0A8" stroke-width="1" />
          <rect x="102" y="110" width="8" height="26" fill="#D7282E" />
          <rect x="102" y="230" width="8" height="26" fill="#D7282E" />
          <rect x="102" y="350" width="8" height="26" fill="#D7282E" />
        </svg>
      </div>
    {/if}

    <!-- HERO overlay -->
    <div
      class="absolute inset-0 flex items-center pointer-events-none"
      style="opacity: {heroOpacity}; visibility: {heroOpacity <= 0.01 ? 'hidden' : 'visible'}"
    >
      <div class="mx-auto w-full max-w-7xl px-6">
        <div class="max-w-2xl pointer-events-auto">
          <p class="kicker text-gold mb-6">{text.heroKicker}</p>
          <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
            {text.heroHeading}
          </h1>
          <p class="mt-6 text-lg text-muted-dark max-w-xl leading-relaxed">
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
              class="border border-white/25 px-7 py-3.5 text-sm font-semibold hover:border-signal hover:text-signal transition-colors"
            >
              Our services
            </a>
          </div>
          <p class="mt-14 font-label text-[11px] uppercase tracking-widest2 text-muted-dark animate-pulse">
            Scroll to inspect the door ↓
          </p>
        </div>
      </div>
    </div>

    <!-- STAGE CAPTIONS -->
    {#each captions as cap, i}
      {#if cap}
        <div
          class="absolute inset-x-0 bottom-0 md:inset-y-0 md:left-0 md:right-auto md:flex md:items-center pointer-events-none transition-all duration-500
                 {active === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}"
        >
          <div
            class="pointer-events-auto m-4 md:m-0 md:ml-[6vw] max-w-md border border-white/10 bg-ink/85 backdrop-blur-sm p-7 md:p-9"
          >
            <p class="kicker text-gold mb-4">{cap.label}</p>
            <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight">{cap.title}</h2>
            <p class="mt-4 text-sm md:text-base text-muted-dark leading-relaxed">{cap.body}</p>
            {#if cap.hasCallToAction}
              <div class="mt-6 flex flex-wrap gap-3">
                <a
                  href="/contact"
                  class="bg-signal text-paper px-6 py-3 text-sm font-semibold hover:bg-signal/90 transition-colors"
                >
                  Book a survey
                </a>
                <a
                  href="/services"
                  class="border border-white/25 px-6 py-3 text-sm font-semibold hover:border-signal hover:text-signal transition-colors"
                >
                  Our services
                </a>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    {/each}

    <!-- PROGRESS RAIL -->
    <div class="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3 items-center">
      {#each Array(STAGES) as _, i}
        <span
          class="font-label text-[10px] transition-colors duration-300 {active === i
            ? 'text-gold'
            : 'text-muted-dark/50'}"
        >
          {String(i).padStart(2, '0')}
        </span>
        {#if i < STAGES - 1}
          <span class="w-px h-6 {active > i ? 'bg-gold' : 'bg-white/15'} transition-colors duration-300"></span>
        {/if}
      {/each}
    </div>
  </div>
</section>

<!-- stat strip -->
<div class="bg-ink text-paper border-t border-white/10">
  <div
    class="mx-auto max-w-7xl px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 font-label text-[11px] uppercase tracking-widest2 text-muted-dark"
  >
    <span><span class="text-gold">4×</span> third-party accreditations</span>
    <span><span class="text-gold">{services.length}</span> core services</span>
    <span>Residential &amp; commercial</span>
    <span>Epsom / London / South East</span>
  </div>
</div>

<!-- SERVICES -->
<section class="mx-auto max-w-7xl px-6 py-20 md:py-28">
  <div class="flex items-end justify-between mb-12">
    <div>
      <p class="kicker text-gold mb-4">{text.servicesKicker}</p>
      <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight whitespace-pre-line">{text.servicesHeading}</h2>
    </div>
    <a
      href="/services"
      class="hidden md:inline font-label text-xs uppercase tracking-widest2 border-b border-ink pb-1 hover:text-signal hover:border-signal transition-colors"
    >
      All services →
    </a>
  </div>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-ink/15">
    {#each services as s}
      <a
        href="/services#{s.slug}"
        class="group border-b border-r border-ink/15 p-8 hover:bg-ink hover:text-paper transition-colors"
      >
        <p class="font-label text-xs text-gold mb-6">{s.index}</p>
        <h3 class="text-xl font-bold tracking-tight">{s.title}</h3>
        <p class="mt-3 text-sm leading-relaxed text-muted-light group-hover:text-muted-dark">
          {s.summary}
        </p>
        <p class="mt-6 font-label text-[11px] uppercase tracking-widest2 text-signal opacity-0 group-hover:opacity-100 transition-opacity">
          Detail →
        </p>
      </a>
    {/each}
  </div>
</section>

<!-- PROCESS -->
<section class="bg-ink text-paper grid-bg">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
    <p class="kicker text-gold mb-4">{text.processKicker}</p>
    <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight max-w-2xl">
      {text.processHeading}
    </h2>
    <div class="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-4 bg-white/10 border border-white/10">
      {#each steps as step}
        <div class="bg-ink p-8">
          <p class="font-label text-xs text-gold">{step.n}</p>
          <h3 class="mt-6 text-lg font-bold">{step.title}</h3>
          <p class="mt-3 text-sm text-muted-dark leading-relaxed">{step.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ACCREDITATIONS -->
<section class="mx-auto max-w-7xl px-6 py-20 md:py-28">
  <p class="kicker text-gold mb-4">{text.accreditationKicker}</p>
  <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight max-w-2xl">
    {text.accreditationHeading}
  </h2>
  <p class="mt-6 text-muted-light max-w-xl leading-relaxed">
    {text.accreditationIntro}
  </p>

  <ul class="mt-12 border-t border-ink/15">
    {#each accreditations as a, i}
      <li class="flex items-baseline gap-6 border-b border-ink/15 py-4">
        <span class="font-label text-xs text-gold w-8 shrink-0">{String(i + 1).padStart(2, '0')}</span>
        <a
          href={a.href}
          target="_blank"
          rel="noopener"
          class="font-bold tracking-tight text-lg w-64 shrink-0 hover:text-signal transition-colors"
        >
          {a.name} ↗
        </a>
        <span class="font-label text-xs uppercase tracking-widest2 text-muted-light hidden sm:inline">{a.role}</span>
      </li>
    {/each}
  </ul>
</section>

<!-- CTA -->
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
        href="tel:{contact.phone.replaceAll(' ', '')}"
        class="border border-paper/40 px-7 py-3.5 text-sm font-label hover:border-paper transition-colors"
      >
        {contact.phone}
      </a>
    </div>
  </div>
</section>
