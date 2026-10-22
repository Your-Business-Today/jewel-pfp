<script>
  import { fieldKinds, limitFor } from '$lib/content/limits.js';

  let { name, field, value } = $props();
  const isParagraph = $derived(field.kind === fieldKinds.paragraph);
  const limit = $derived(limitFor(field.kind));
  const inputClass = 'w-full border border-gold bg-ink-3 px-3 py-2 text-sm focus:outline-none focus:border-signal';
</script>

<label class="block border-b border-hairline py-4">
  <span class="kicker text-gold block mb-2">{field.label}</span>
  {#if isParagraph}
    <textarea class={inputClass} {name} rows="4" required={field.isRequired} maxlength={limit} value={value ?? ''}></textarea>
  {:else}
    <input class={inputClass} {name} required={field.isRequired} maxlength={limit} value={value ?? ''} />
  {/if}
</label>
