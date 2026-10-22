<script>
  import { enhance } from '$app/forms';
  import ContentField from '$lib/components/admin/ContentField.svelte';
  import SaveResult from '$lib/components/admin/SaveResult.svelte';

  let { data, form } = $props();
  const { contentPage, saved, problem } = $derived(data);
</script>

<svelte:head>
  <title>{contentPage.label} | Jewel PFP admin</title>
</svelte:head>

<a href="/admin/content" class="text-xs text-body hover:text-gold">← All page text</a>
<h1 class="mt-4 text-3xl font-extrabold tracking-tight">{contentPage.label}</h1>
<p class="mt-3 max-w-2xl text-sm text-body">
  {contentPage.blurb} Anything left as the original keeps following the website's built-in text.
</p>
{#if contentPage.path}
  <a href={contentPage.path} target="_blank" rel="noopener" class="mt-3 inline-block text-xs text-gold">View the page ↗</a>
{/if}
{#if problem}
  <p class="mt-6 text-sm text-signal">{problem}</p>
{/if}

{#key saved}
  <form method="POST" action="?/save" use:enhance={() => ({ update }) => update({ reset: false })} class="mt-8 max-w-3xl">
    {#each contentPage.fields as field (field.key)}
      <ContentField {field} savedValue={saved[field.key]} />
    {/each}
    <div class="sticky bottom-0 bg-ink py-5 flex items-center gap-6">
      <button class="bg-ink text-paper px-8 py-3 text-sm font-semibold hover:bg-signal transition-colors">Save</button>
      <SaveResult result={form} />
    </div>
  </form>
{/key}
