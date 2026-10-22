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

<section class="bg-ink text-paper grid-bg border-b border-white/10">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
    <p class="kicker text-gold mb-6">{text.kicker}</p>
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.05]">
      {text.heading}
    </h1>
    <p class="mt-6 text-lg text-muted-dark max-w-xl leading-relaxed">
      {text.intro}
    </p>
  </div>

  <div class="border-t border-white/10">
    <div class="mx-auto max-w-7xl px-6 py-4 flex flex-wrap gap-x-8 gap-y-2 font-label text-[11px] uppercase tracking-widest2">
      {#each services as s}
        <a href="#{s.slug}" class="text-muted-dark hover:text-signal transition-colors">
          <span class="text-gold">{s.index}</span> {s.title}
        </a>
      {/each}
    </div>
  </div>
</section>

{#each services as s, i}
  <section
    id={s.slug}
    class="scroll-mt-16 {i % 2 === 1 ? 'bg-paper-2' : ''} border-b border-ink/10"
  >
    <div class="mx-auto max-w-7xl px-6 py-16 md:py-24 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <p class="font-label text-sm text-signal">{s.index}</p>
        <h2 class="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">{s.title}</h2>
        <p class="mt-4 text-muted-light leading-relaxed">{s.summary}</p>
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
        <ul class="mt-8 border-t border-ink/15">
          {#each s.points as point, j}
            <li class="flex items-baseline gap-5 border-b border-ink/15 py-4">
              <span class="font-label text-xs text-gold shrink-0">{s.index}.{j + 1}</span>
              <span class="text-sm leading-relaxed">{point}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </section>
{/each}

<section class="bg-ink text-paper grid-bg">
  <div class="mx-auto max-w-7xl px-6 py-16 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
    <div>
      <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight">{text.ctaHeading}</h2>
      <p class="mt-3 max-w-md text-muted-dark leading-relaxed">
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
        class="border border-white/25 px-7 py-3.5 text-sm font-label hover:border-signal hover:text-signal transition-colors"
      >
        {contact.email}
      </a>
    </div>
  </div>
</section>
