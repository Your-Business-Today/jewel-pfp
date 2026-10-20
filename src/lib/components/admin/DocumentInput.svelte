<script>
  import { untrack } from 'svelte';
  import { documentKinds, kindRule, textFromValue } from '$lib/content/documents/kinds.js';

  let { name, label, kind, value = undefined, text = $bindable(untrack(() => textFromValue(kind, value))), isRequired = true } = $props();
  const rule = $derived(kindRule(kind));
  const isOneLine = $derived(kind === documentKinds.line);
  const inputClass = 'w-full border border-ink/25 bg-paper px-3 py-2 text-sm focus:outline-none focus:border-signal';
</script>

<label class="block border-b border-ink/10 py-4">
  <span class="kicker text-muted-light block mb-2">{label}</span>
  {#if isOneLine}
    <input class={inputClass} {name} required={isRequired} maxlength={rule.limit} bind:value={text} />
  {:else}
    <textarea class="{inputClass} font-mono" {name} rows={rule.rows} required={isRequired} maxlength={rule.limit} bind:value={text}></textarea>
  {/if}
  {#if rule.hint}
    <span class="mt-2 block text-xs text-muted-light">{rule.hint}</span>
  {/if}
</label>
