<script>
  import { brandLogo } from '$lib/brand.js';

  /** @type {{ nav: { label: string, href: string }[], contact: Record<string, any> }} */
  let { nav, contact } = $props();
  let menuOpen = $state(false);
</script>

<header class="bg-ink text-paper border-b border-hairline sticky top-0 z-50">
  <nav class="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
    <a href="/" class="shrink-0" aria-label="Jewel Passive Fire Protection — home">
      <img src={brandLogo.src} alt={brandLogo.alt} width={brandLogo.width} height={brandLogo.height} class="h-10 w-auto" />
    </a>

    <div class="hidden md:flex items-center gap-8">
      {#each nav as item}
        <a href={item.href} class="text-sm text-paper/80 hover:text-gold transition-colors">{item.label}</a>
      {/each}
      <a
        href="tel:{contact.phone.replaceAll(' ', '')}"
        class="text-xs border border-hairline px-4 py-2 hover:border-gold hover:text-gold transition-colors"
      >
        {contact.phone}
      </a>
    </div>

    <button
      class="md:hidden text-xs uppercase tracking-widest2 border border-hairline px-3 py-2"
      onclick={() => (menuOpen = !menuOpen)}
      aria-expanded={menuOpen}
      aria-label="Toggle menu"
    >
      {menuOpen ? 'Close' : 'Menu'}
    </button>
  </nav>

  {#if menuOpen}
    <div class="md:hidden border-t border-hairline px-6 py-4 flex flex-col gap-4 bg-ink">
      {#each nav as item}
        <a href={item.href} class="text-sm" onclick={() => (menuOpen = false)}>{item.label}</a>
      {/each}
      <a href="tel:{contact.phone.replaceAll(' ', '')}" class="text-xs text-gold">{contact.phone}</a>
    </div>
  {/if}
</header>
