<script>
  import { enhance } from '$app/forms';
  import ListField from '$lib/components/admin/ListField.svelte';
  import SaveResult from '$lib/components/admin/SaveResult.svelte';
  import { serviceFields } from '$lib/content/listFields.js';

  let { data, form } = $props();
  const { service } = $derived(data);
  const pointsColumn = 'points';
  const pointsText = $derived(service.points.join('\n'));
</script>

<svelte:head>
  <title>{service.title} | Jewel PFP admin</title>
</svelte:head>

<a href="/admin/services" class="font-label text-xs text-muted-light hover:text-signal">← All services</a>
<h1 class="mt-4 text-3xl font-extrabold tracking-tight">{service.title}</h1>
<a href="/services#{service.slug}" target="_blank" rel="noopener" class="mt-3 inline-block font-label text-xs text-signal">View on the site ↗</a>

<form method="POST" action="?/save" use:enhance={() => ({ update }) => update({ reset: false })} class="mt-8 max-w-3xl">
  {#each Object.entries(serviceFields) as [column, field] (column)}
    <ListField name={column} {field} value={column === pointsColumn ? pointsText : service[column]} />
  {/each}
  <div class="py-5 flex items-center gap-6">
    <button class="bg-ink text-paper px-8 py-3 text-sm font-semibold hover:bg-signal transition-colors">Save</button>
    <SaveResult result={form} />
  </div>
</form>
