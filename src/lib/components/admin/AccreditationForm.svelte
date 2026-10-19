<script>
  import { enhance } from '$app/forms';
  import { accreditationFields } from '$lib/content/listFields.js';
  import { limitFor } from '$lib/content/limits.js';

  let { accreditation = null, action, buttonLabel } = $props();
  const inputClass = 'w-full border border-ink/25 bg-paper px-3 py-2 text-sm focus:outline-none focus:border-signal';
</script>

<form method="POST" {action} use:enhance={() => ({ update }) => update({ reset: !accreditation })} class="grid gap-3 md:grid-cols-[1fr_1fr_1.4fr_auto] items-end">
  {#if accreditation}
    <input type="hidden" name="id" value={accreditation.id} />
  {/if}
  {#each Object.entries(accreditationFields) as [column, field] (column)}
    <label class="block">
      <span class="kicker text-muted-light block mb-1">{field.label}</span>
      <input class={inputClass} name={column} required={field.isRequired} maxlength={limitFor(field.kind)} value={accreditation?.[column] ?? ''} />
    </label>
  {/each}
  <button class="bg-ink text-paper px-5 py-2 text-sm font-semibold hover:bg-signal transition-colors">{buttonLabel}</button>
</form>
