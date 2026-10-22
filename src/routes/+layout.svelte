<script>
  import '../app.css';
  import { page } from '$app/state';
  import { site } from '$lib/services.js';
  import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
  import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
  let { children, data } = $props();
  const { contact } = $derived(data.site);

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

<div class="min-h-screen flex flex-col bg-paper text-ink font-sans antialiased">
  <SiteHeader {nav} {contact} />

  <main class="flex-1">
    {@render children()}
  </main>

  <SiteFooter {contact} />
</div>
