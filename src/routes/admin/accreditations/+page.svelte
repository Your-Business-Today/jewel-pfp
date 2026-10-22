<script>
  import AccreditationForm from '$lib/components/admin/AccreditationForm.svelte';
  import CopyBuiltIn from '$lib/components/admin/CopyBuiltIn.svelte';
  import RowControls from '$lib/components/admin/RowControls.svelte';
  import SaveResult from '$lib/components/admin/SaveResult.svelte';

  let { data, form } = $props();
  const { rows, isConfigured, problem } = $derived(data);
  const lastPosition = $derived(rows.length - 1);
</script>

<svelte:head>
  <title>Accreditations | Jewel PFP admin</title>
</svelte:head>

<h1 class="text-3xl font-extrabold tracking-tight">Accreditations</h1>
<p class="mt-3 max-w-2xl text-sm text-body">The accreditation list on the home page, in the order shown here.</p>
{#if problem}
  <p class="mt-6 text-sm text-signal">{problem}</p>
{/if}
<div class="mt-4"><SaveResult result={form} /></div>

{#if isConfigured && !problem && !rows.length}
  <CopyBuiltIn listName="accreditations" />
{/if}

<ul class="mt-8 border-t border-hairline">
  {#each rows as accreditation, position (accreditation.id)}
    <li class="border-b border-hairline py-5 space-y-3 {accreditation.visible ? '' : 'opacity-50'}">
      <AccreditationForm {accreditation} action="?/save" buttonLabel="Save" />
      <RowControls
        id={accreditation.id}
        name={accreditation.name}
        isVisible={accreditation.visible}
        isFirst={!position}
        isLast={position === lastPosition}
      />
    </li>
  {/each}
</ul>

{#if isConfigured && rows.length}
  <div class="mt-10">
    <p class="kicker text-gold mb-3">Add an accreditation</p>
    <AccreditationForm action="?/add" buttonLabel="Add" />
  </div>
{/if}
