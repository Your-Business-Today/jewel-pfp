<script>
  import '../app.css';
  import { page } from '$app/state';
  import { contact, site } from '$lib/services.js';
  import { privacyNotice } from '$lib/privacy/notice.js';
  let { children } = $props();
  let menuOpen = $state(false);

  const nav = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
    { label: 'Apartment Bookings', href: contact.booking }
  ];
</script>

<svelte:head>
  <link rel="canonical" href="{site.url}{page.url.pathname}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={site.name} />
  <meta property="og:locale" content="en_GB" />
  <meta property="og:url" content="{site.url}{page.url.pathname}" />
</svelte:head>

<div class="min-h-screen flex flex-col bg-paper text-ink font-sans antialiased">
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

  <main class="flex-1">
    {@render children()}
  </main>

  <footer class="bg-ink text-paper">
    <div class="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-3">
      <div>
        <p class="flex items-baseline gap-2">
          <span class="font-extrabold tracking-tight text-lg text-gold">JEWEL</span>
          <span class="font-label text-signal text-sm">/PFP</span>
        </p>
        <p class="mt-3 text-sm text-muted-dark max-w-xs leading-relaxed">
          Jewel Passive Fire Protection Ltd. Fire door surveying, remediation, installation and
          firestopping across London and the South East.
        </p>
        <p class="mt-4 font-label text-[11px] uppercase tracking-widest2 text-muted-dark">{contact.area}</p>
      </div>

      <div class="font-label text-sm">
        <p class="kicker text-muted-dark mb-4">Contact</p>
        <ul class="space-y-2">
          <li><a href="mailto:{contact.email}" class="hover:text-signal">{contact.email}</a></li>
          <li><a href="tel:{contact.phone.replaceAll(' ', '')}" class="hover:text-signal">{contact.phone}</a></li>
          <li><a href="tel:{contact.mobile.replaceAll(' ', '')}" class="hover:text-signal">{contact.mobile}</a></li>
          <li class="pt-2">
            <a href={contact.booking} class="text-signal hover:underline">Book a £99 fire door survey</a>
          </li>
        </ul>
      </div>

      <div class="font-label text-sm">
        <p class="kicker text-muted-dark mb-4">Elsewhere</p>
        <ul class="space-y-2">
          {#each contact.socials as s}
            <li><a href={s.href} target="_blank" rel="noopener" class="hover:text-signal">{s.name} ↗</a></li>
          {/each}
        </ul>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div
        class="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row gap-2 justify-between font-label text-[11px] uppercase tracking-widest2 text-muted-dark"
      >
        <span>
          © {new Date().getFullYear()} Jewel Passive Fire Protection Ltd ·
          <a href={privacyNotice.path} class="hover:text-signal">Privacy notice</a>
        </span>
        <span>Third-party accredited · Surveying / Remediation / Installation / Firestopping</span>
      </div>
    </div>
  </footer>
</div>
