<script>
  import DashboardTile from '$lib/components/admin/DashboardTile.svelte';
  import EnquiryCard from '$lib/components/admin/EnquiryCard.svelte';
  import { contentPages } from '$lib/content/pages/index.js';
  import { siteDocuments } from '$lib/content/documents/index.js';

  let { data } = $props();
  const { counts, recent, unreadEnquiries } = $derived(data);
  const pagesEdited = $derived(counts?.pagesEdited ?? 0);
  const documentsEdited = $derived(counts?.documentsEdited ?? 0);
</script>

<svelte:head>
  <title>Dashboard | Jewel PFP admin</title>
</svelte:head>

<h1 class="text-3xl font-extrabold tracking-tight">Website admin</h1>
<p class="mt-3 max-w-2xl text-sm text-muted-light">Everything saved here shows on the website straight away.</p>

<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
  <DashboardTile href="/admin/enquiries" label="Enquiries" figure={counts?.enquiries} note="{unreadEnquiries} unread" />
  <DashboardTile href="/admin/content" label="Page text" figure={contentPages.length} note="{pagesEdited} changed from the original" />
  <DashboardTile href="/admin/services" label="Services" figure={counts?.services} note="Add, edit, reorder or hide" />
  <DashboardTile href="/admin/accreditations" label="Accreditations" figure={counts?.accreditations} note="Add, edit, reorder or hide" />
  <DashboardTile href="/admin/documents" label="Booking and privacy" figure={siteDocuments.length} note="{documentsEdited} changed from the original" />
</div>

<section class="mt-12 max-w-4xl">
  <div class="flex items-baseline justify-between">
    <h2 class="text-xl font-bold tracking-tight">Latest enquiries</h2>
    <a href="/admin/enquiries" class="font-label text-xs text-signal hover:underline">All enquiries →</a>
  </div>
  <div class="mt-4 space-y-4">
    {#each recent as enquiry (enquiry.id)}
      <a href="/admin/enquiries" class="block hover:opacity-80"><EnquiryCard {enquiry} isCompact /></a>
    {:else}
      <p class="text-sm text-muted-light">No enquiries yet.</p>
    {/each}
  </div>
</section>
