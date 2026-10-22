<script>
  /** @type {{ text: Record<string, string>, accreditations: any[] }} */
  let { text, accreditations } = $props();
</script>

<section class="mx-auto max-w-7xl px-6 py-20 md:py-28">
  <p class="kicker text-gold mb-4">{text.accreditationKicker}</p>
  <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight max-w-2xl">
    {text.accreditationHeading}
  </h2>
  <p class="mt-6 text-body max-w-xl leading-relaxed">
    {text.accreditationIntro}
  </p>

  <ul class="mt-12 border-t border-hairline">
    {#each accreditations as a, i}
      <li class="flex items-baseline gap-6 border-b border-hairline py-4">
        <span class="text-xs text-gold w-8 shrink-0">{String(i + 1).padStart(2, '0')}</span>
        <a
          href={a.href}
          target="_blank"
          rel="noopener"
          class="font-bold tracking-tight text-lg w-64 shrink-0 hover:text-gold transition-colors"
        >
          {a.name} ↗
        </a>
        <span class="text-xs uppercase tracking-widest2 text-body hidden sm:inline">{a.role}</span>
      </li>
    {/each}
  </ul>
</section>
