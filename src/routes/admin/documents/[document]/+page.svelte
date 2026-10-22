<script>
  import { enhance } from '$app/forms';
  import DocumentInput from '$lib/components/admin/DocumentInput.svelte';
  import DocumentRows from '$lib/components/admin/DocumentRows.svelte';
  import SaveResult from '$lib/components/admin/SaveResult.svelte';
  import { documentValues } from '$lib/content/documents/parts.js';

  let { data, form } = $props();
  const { siteDocument, saved, problem } = $derived(data);
  const values = $derived(documentValues(siteDocument, saved));
  const hasSavedWording = $derived(Object.keys(saved).length > 0);

  /** @type {import('@sveltejs/kit').SubmitFunction} */
  function confirmRestore({ cancel }) {
    const isConfirmed = confirm(`Put the ${siteDocument.label.toLowerCase()} back to the website's built-in wording?`);
    if (!isConfirmed) cancel();
  }
</script>

<svelte:head>
  <title>{siteDocument.label} | Jewel PFP admin</title>
</svelte:head>

<a href="/admin/documents" class="text-xs text-body hover:text-gold">← Booking and privacy</a>
<h1 class="mt-4 text-3xl font-extrabold tracking-tight">{siteDocument.label}</h1>
<p class="mt-3 max-w-2xl text-sm text-body">{siteDocument.blurb}</p>
<a href={siteDocument.path} target="_blank" rel="noopener" class="mt-3 inline-block text-xs text-gold">View the page ↗</a>
{#if problem}
  <p class="mt-6 text-sm text-signal">{problem}</p>
{/if}

{#key saved}
  <form method="POST" action="?/save" use:enhance={() => ({ update }) => update({ reset: false })} class="mt-8 max-w-3xl">
    {#each siteDocument.fields as field (field.key)}
      <DocumentInput name={field.key} label={field.label} kind={field.kind} value={values[field.key]} />
    {/each}
    {#each siteDocument.lists as documentList (documentList.key)}
      <DocumentRows {documentList} savedRows={values[documentList.key]} />
    {/each}
    <div class="sticky bottom-0 bg-ink py-5 flex flex-wrap items-center gap-6">
      <button class="bg-ink text-paper px-8 py-3 text-sm font-semibold hover:bg-signal transition-colors">Save</button>
      <SaveResult result={form} />
    </div>
  </form>
{/key}

{#if hasSavedWording}
  <form method="POST" action="?/restore" use:enhance={confirmRestore} class="mt-6 max-w-3xl border-t border-hairline pt-6">
    <button class="text-xs uppercase tracking-widest2 hover:text-gold">Use the built-in wording again</button>
  </form>
{/if}
