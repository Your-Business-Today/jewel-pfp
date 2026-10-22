<script>
  /** @type {{ nav: { label: string, href: string }[], contact: Record<string, any> }} */
  let { nav, contact } = $props();
  let menuOpen = $state(false);
</script>

<header class="bg-ink text-paper border-b border-white/10 sticky top-0 z-50">
  <nav class="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
    <a href="/" class="flex items-baseline gap-2 shrink-0" aria-label="Jewel Passive Fire Protection — home">
      <span class="font-extrabold tracking-tight text-lg text-gold">JEWEL</span>
      <span class="font-label text-signal text-sm">/PFP</span>
      <span class="hidden lg:inline font-label text-[11px] uppercase tracking-widest2 text-muted-dark ml-2">
        Passive Fire Protection
      </span>
    </a>

    <div class="hidden md:flex items-center gap-8">
      {#each nav as item}
        <a href={item.href} class="text-sm text-paper/80 hover:text-signal transition-colors">{item.label}</a>
      {/each}
      <a
        href="tel:{contact.phone.replaceAll(' ', '')}"
        class="font-label text-xs border border-white/20 px-4 py-2 hover:border-signal hover:text-signal transition-colors"
      >
        {contact.phone}
      </a>
    </div>

    <button
      class="md:hidden font-label text-xs uppercase tracking-widest2 border border-white/20 px-3 py-2"
      onclick={() => (menuOpen = !menuOpen)}
      aria-expanded={menuOpen}
      aria-label="Toggle menu"
    >
      {menuOpen ? 'Close' : 'Menu'}
    </button>
  </nav>

  {#if menuOpen}
    <div class="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-4 bg-ink">
      {#each nav as item}
        <a href={item.href} class="text-sm" onclick={() => (menuOpen = false)}>{item.label}</a>
      {/each}
      <a href="tel:{contact.phone.replaceAll(' ', '')}" class="font-label text-xs text-signal">{contact.phone}</a>
    </div>
  {/if}
</header>
