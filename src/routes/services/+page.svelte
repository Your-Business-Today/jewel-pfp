<script>
  import { pageText } from '$lib/content/pageText.js';

  let { data } = $props();
  const { services, contact, text: savedText } = $derived(data.site);
  const text = $derived(pageText(savedText, 'services'));
</script>

<svelte:head>
  <title>{text.seoTitle}</title>
  <meta name="description" content={text.seoDescription} />
</svelte:head>

<!-- HEADER -->
<section class="bg-ink text-paper grid-bg border-b border-hairline">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
    <p class="kicker text-gold mb-6">{text.kicker}</p>
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.05]">
      {text.heading}
    </h1>
    <p class="mt-6 text-lg text-body max-w-xl leading-relaxed">
      {text.intro}
    </p>
  </div>

  <!-- index strip -->
  <div class="border-t border-hairline">
    <div class="mx-auto max-w-7xl px-6 py-4 flex flex-wrap gap-x-8 gap-y-2 text-[11px] uppercase tracking-widest2">
      {#each services as s}
        <a href="#{s.slug}" class="text-note hover:text-gold transition-colors">
          <span class="text-gold">{s.index}</span> {s.title}
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- SERVICE SECTIONS -->
{#each services as s, i}
  <section
    id={s.slug}
    class="scroll-mt-16 {i % 2 === 1 ? 'bg-ink-2' : ''} border-b border-hairline"
  >
    <div class="mx-auto max-w-7xl px-6 py-16 md:py-24 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <p class="text-sm text-gold">{s.index}</p>
        <h2 class="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">{s.title}</h2>
        <p class="mt-4 text-body leading-relaxed">{s.summary}</p>
        {#if s.cta}
          <a
            href={s.cta.href}
            class="mt-8 inline-block bg-signal text-paper px-6 py-3 text-sm font-semibold hover:bg-signal/90 transition-colors"
          >
            {s.cta.label} →
          </a>
        {/if}
      </div>

      <div>
        <p class="text-lg leading-relaxed max-w-2xl">{s.detail}</p>
        <ul class="mt-8 border-t border-hairline">
          {#each s.points as point, j}
            <li class="flex items-baseline gap-5 border-b border-hairline py-4">
              <span class="text-xs text-gold shrink-0">{s.index}.{j + 1}</span>
              <span class="text-sm leading-relaxed">{point}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </section>
{/each}

<!-- CTA -->
<section class="bg-ink text-paper grid-bg">
  <div class="mx-auto max-w-7xl px-6 py-16 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
    <div>
      <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight">{text.ctaHeading}</h2>
      <p class="mt-3 max-w-md text-body leading-relaxed">
        {text.ctaIntro}
      </p>
    </div>
    <div class="flex flex-wrap gap-4">
      <a
        href="/contact"
        class="bg-signal text-paper px-7 py-3.5 text-sm font-semibold hover:bg-signal/90 transition-colors"
      >
        Contact the team
      </a>
      <a
        href="mailto:{contact.email}"
        class="border border-white/25 px-7 py-3.5 text-sm hover:border-gold hover:text-gold transition-colors"
      >
        {contact.email}
      </a>
    </div>
  </div>
</section>
