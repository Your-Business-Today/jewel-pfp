<script>
  import { untrack } from 'svelte';
  import { fieldKinds, limitFor } from '$lib/content/limits.js';

  let { field, savedValue } = $props();
  let value = $state(untrack(() => savedValue ?? field.default));
  const isParagraph = $derived(field.kind === fieldKinds.paragraph);
  const isChanged = $derived(value.trim() !== field.default.trim());
  const limit = $derived(limitFor(field.kind));
  const inputClass = 'w-full border border-gold bg-ink-3 px-3 py-2 text-sm focus:outline-none focus:border-signal';
</script>

<label class="block border-b border-hairline py-5">
  <span class="flex items-baseline justify-between gap-4 mb-2">
    <span class="kicker text-gold">{field.label}</span>
    {#if isChanged}
      <button type="button" class="text-[11px] text-gold hover:underline" onclick={() => (value = field.default)}>
        Use the original
      </button>
    {/if}
  </span>
  {#if isParagraph}
    <textarea class={inputClass} name={field.key} rows="4" maxlength={limit} bind:value></textarea>
  {:else}
    <input class={inputClass} name={field.key} maxlength={limit} bind:value />
  {/if}
</label>
