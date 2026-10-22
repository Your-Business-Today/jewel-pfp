<script>
  import { doorTypeChoices } from '$lib/doorset/doorTypes.js';

  /** @type {{ doorType: number, onchoose: (doorType: number) => void }} */
  let { doorType, onchoose } = $props();
</script>

<div class="grid grid-cols-1 sm:grid-cols-3 gap-2" role="group" aria-label="Door type">
  {#each doorTypeChoices as choice (choice.doorType)}
    <button
      type="button"
      class="border px-4 py-3 text-left transition-colors {doorType === choice.doorType ? 'border-gold bg-ink-2' : 'border-hairline hover:border-gold'}"
      aria-pressed={doorType === choice.doorType}
      onclick={() => onchoose(choice.doorType)}
    >
      <span class="block text-xs font-bold tracking-widest2 text-gold">{choice.title.toUpperCase()}</span>
      <span class="block text-sm">{choice.summary}</span>
    </button>
  {/each}
</div>
