<script>
  import { cardsFor } from '$lib/doorset/cards.js';

  /** @type {{ chosen: string, doorType: number, onchoose: (key: string) => void }} */
  let { chosen, doorType, onchoose } = $props();
  const cards = $derived(cardsFor(doorType));
  const buttonClass = 'border px-3 py-2 text-xs transition-colors';
</script>

<div class="flex flex-wrap gap-2" role="group" aria-label="Parts of the door set">
  {#each cards as card (card.key)}
    <button
      type="button"
      class="{buttonClass} {chosen === card.key ? 'border-signal bg-signal text-paper' : 'border-hairline hover:border-gold'}"
      aria-pressed={chosen === card.key}
      onclick={() => onchoose(chosen === card.key ? '' : card.key)}
    >
      {card.title}
    </button>
  {/each}
</div>
