<script>
  import '../app.css';
  import { page } from '$app/state';
  import { site } from '$lib/services.js';
  import { privacyNotice } from '$lib/privacy/notice.js';
  import { brandLogo } from '$lib/brand.js';
  let { children, data } = $props();
  const { contact } = $derived(data.site);
  let menuOpen = $state(false);

  const nav = $derived([
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
    { label: 'Apartment Bookings', href: contact.booking }
  ]);
</script>

<svelte:head>
  <link rel="canonical" href="{site.url}{page.url.pathname}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={site.name} />
  <meta property="og:locale" content="en_GB" />
  <meta property="og:url" content="{site.url}{page.url.pathname}" />
</svelte:head>

<div class="min-h-screen flex flex-col bg-ink text-body font-sans antialiased">
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

  <main class="flex-1">
    {@render children()}
  </main>

  <footer class="bg-ink text-paper">
    <div class="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-3">
      <div>
        <img src={brandLogo.src} alt={brandLogo.alt} width={brandLogo.width} height={brandLogo.height} class="h-14 w-auto" />
        <p class="mt-3 text-sm text-footer max-w-xs leading-relaxed">{contact.footerBlurb}</p>
        <p class="mt-4 text-[11px] uppercase tracking-widest2 text-footer">{contact.area}</p>
      </div>

      <div class="text-sm">
        <p class="kicker text-gold mb-4">Contact</p>
        <ul class="space-y-2">
          <li><a href="mailto:{contact.email}" class="hover:text-gold">{contact.email}</a></li>
          <li><a href="tel:{contact.phone.replaceAll(' ', '')}" class="hover:text-gold">{contact.phone}</a></li>
          <li><a href="tel:{contact.mobile.replaceAll(' ', '')}" class="hover:text-gold">{contact.mobile}</a></li>
          <li class="pt-2">
            <a href={contact.booking} class="text-gold hover:underline">Book a £99 fire door survey</a>
          </li>
        </ul>
      </div>

      <div class="text-sm">
        <p class="kicker text-gold mb-4">Elsewhere</p>
        <ul class="space-y-2">
          {#each contact.socials as s}
            <li><a href={s.href} target="_blank" rel="noopener" class="hover:text-gold">{s.name} ↗</a></li>
          {/each}
        </ul>
      </div>
    </div>

    <div class="border-t border-hairline">
      <div
        class="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row gap-2 justify-between text-[11px] uppercase tracking-widest2 text-footer"
      >
        <span>
          © {new Date().getFullYear()} Jewel Passive Fire Protection Ltd ·
          <a href={privacyNotice.path} class="hover:text-gold">Privacy notice</a>
        </span>
        <span>Third-party accredited · Surveying / Remediation / Installation / Firestopping</span>
      </div>
    </div>
  </footer>
</div>
