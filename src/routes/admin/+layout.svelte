<script>
  import { page } from '$app/state';
  import SetupNotice from '$lib/components/admin/SetupNotice.svelte';

  let { data, children } = $props();
  const loginPath = '/admin/login';
  const { pathname } = $derived(page.url);
  const isLoginPage = $derived(pathname === loginPath);

  const sections = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Enquiries', href: '/admin/enquiries', showsUnread: true },
    { label: 'Page text', href: '/admin/content' },
    { label: 'Services', href: '/admin/services' },
    { label: 'Accreditations', href: '/admin/accreditations' },
    { label: 'Booking and privacy', href: '/admin/documents' }
  ];
</script>

<svelte:head>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if isLoginPage}
  {@render children()}
{:else}
  <div class="border-b border-ink/15 bg-paper-2">
    <nav class="mx-auto max-w-7xl px-6 py-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
      <span class="kicker text-gold">Admin</span>
      {#each sections as section}
        <a href={section.href} class="hover:text-signal">
          {section.label}
          {#if section.showsUnread && data.unreadEnquiries}
            <span class="ml-1 bg-signal text-paper px-2 py-0.5 font-label text-[11px]">{data.unreadEnquiries}</span>
          {/if}
        </a>
      {/each}
      <form method="POST" action="/admin/logout" class="ml-auto">
        <button class="font-label text-xs uppercase tracking-widest2 hover:text-signal">Sign out</button>
      </form>
    </nav>
  </div>
  <div class="mx-auto max-w-7xl px-6 py-12">
    {#if !data.isDatabaseConfigured}
      <SetupNotice />
    {/if}
    {@render children()}
  </div>
{/if}
