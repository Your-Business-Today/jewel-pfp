<script>
  import { enhance } from '$app/forms';
  import CopyBuiltIn from '$lib/components/admin/CopyBuiltIn.svelte';
  import RowControls from '$lib/components/admin/RowControls.svelte';
  import SaveResult from '$lib/components/admin/SaveResult.svelte';
  import { numbered } from '$lib/content/lists.js';
  import { textLimits } from '$lib/content/limits.js';

  let { data, form } = $props();
  const { rows, isConfigured, problem } = $derived(data);
  const lastPosition = $derived(rows.length - 1);
</script>

<svelte:head>
  <title>Services | Jewel PFP admin</title>
</svelte:head>

<h1 class="text-3xl font-extrabold tracking-tight">Services</h1>
<p class="mt-3 max-w-2xl text-sm text-muted-light">
  The services on the home page, the services page and the contact form. Their order sets the 01, 02… numbering.
</p>
{#if problem}
  <p class="mt-6 text-sm text-signal">{problem}</p>
{/if}
<div class="mt-4"><SaveResult result={form} /></div>

{#if isConfigured && !problem && !rows.length}
  <CopyBuiltIn listName="services" />
{/if}

<ul class="mt-8 border-t border-ink/15 max-w-4xl">
  {#each rows as service, position (service.id)}
    <li class="border-b border-ink/15 py-5 flex flex-wrap items-center justify-between gap-4 {service.visible ? '' : 'opacity-50'}">
      <a href="/admin/services/{service.id}" class="hover:text-signal">
        <span class="font-label text-xs text-gold mr-3">{numbered(position)}</span>
        <span class="text-lg font-bold tracking-tight">{service.title}</span>
        {#if !service.visible}<span class="ml-2 font-label text-[11px] text-muted-light">hidden</span>{/if}
      </a>
      <RowControls id={service.id} name={service.title} isVisible={service.visible} isFirst={!position} isLast={position === lastPosition} />
    </li>
  {/each}
</ul>

{#if isConfigured && rows.length}
  <form method="POST" action="?/add" use:enhance class="mt-8 flex flex-wrap gap-3 max-w-4xl">
    <input name="title" required maxlength={textLimits.line} placeholder="New service title" class="flex-1 border border-ink/25 bg-paper px-3 py-2 text-sm" />
    <button class="bg-ink text-paper px-6 py-2 text-sm font-semibold hover:bg-signal transition-colors">Add a service</button>
  </form>
{/if}
