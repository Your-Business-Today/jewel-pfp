<script>
  import EnquiryCard from '$lib/components/admin/EnquiryCard.svelte';
  import SaveResult from '$lib/components/admin/SaveResult.svelte';

  let { data, form } = $props();
  const { view, enquiries, total, pageCount, pageNumber, problem } = $derived(data);
  const archived = 'archived';
  const isArchiveView = $derived(view === archived);
  const viewQuery = $derived(isArchiveView ? `view=${archived}&` : '');
  const firstPage = 1;
  const hasNewerPage = $derived(pageNumber > firstPage);
  const hasOlderPage = $derived(pageNumber < pageCount);
  const tabClass = 'text-xs uppercase tracking-widest2 pb-1 border-b-2';
</script>

<svelte:head>
  <title>Enquiries | Jewel PFP admin</title>
</svelte:head>

<h1 class="text-3xl font-extrabold tracking-tight">Enquiries</h1>
<p class="mt-3 max-w-2xl text-sm text-body">Every message sent from the contact form. Each one is also emailed to the team.</p>
<nav class="mt-6 flex gap-6">
  <a href="/admin/enquiries" class="{tabClass} {isArchiveView ? 'border-transparent' : 'border-signal'}">Inbox</a>
  <a href="/admin/enquiries?view={archived}" class="{tabClass} {isArchiveView ? 'border-signal' : 'border-transparent'}">Archived</a>
</nav>
{#if problem}
  <p class="mt-6 text-sm text-signal">{problem}</p>
{/if}
<div class="mt-4"><SaveResult result={form} /></div>

<div class="mt-6 space-y-4 max-w-4xl">
  {#each enquiries as enquiry (enquiry.id)}
    <EnquiryCard {enquiry} />
  {:else}
    <p class="text-sm text-body">{isArchiveView ? 'Nothing archived.' : 'No enquiries yet.'}</p>
  {/each}
</div>

{#if hasNewerPage || hasOlderPage}
  <nav class="mt-8 flex items-center gap-6 text-xs">
    {#if hasNewerPage}<a href="?{viewQuery}page={pageNumber - 1}" class="hover:text-gold">← Newer</a>{/if}
    <span class="text-body">Page {pageNumber} of {pageCount} · {total} enquiries</span>
    {#if hasOlderPage}<a href="?{viewQuery}page={pageNumber + 1}" class="hover:text-gold">Older →</a>{/if}
  </nav>
{/if}
