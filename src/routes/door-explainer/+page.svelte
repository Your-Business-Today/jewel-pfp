<script>
  import DoorsetCanvas from '$lib/components/doorset/DoorsetCanvas.svelte';
  import ExplainerControls from '$lib/components/doorset/ExplainerControls.svelte';
  import PartCard from '$lib/components/doorset/PartCard.svelte';
  import PartPicker from '$lib/components/doorset/PartPicker.svelte';
  import DoorTypePicker from '$lib/components/doorset/DoorTypePicker.svelte';
  import { cardFor } from '$lib/doorset/cards.js';
  import { gaps, surround } from '$lib/doorset/measures.js';
  import { doorTypes } from '$lib/doorset/doorTypes.js';

  let chosen = $state('');
  let doorType = $state(doorTypes.flush);
  let explode = $state(0);
  let isShowingGaps = $state(false);
  const card = $derived(cardFor(chosen, doorType));

  /** @param {number} choice */
  function chooseDoorType(choice) {
    doorType = choice;
    chosen = '';
  }
</script>

<svelte:head>
  <title>Door set explainer (draft) | Jewel Passive Fire Protection</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="bg-ink text-paper">
  <div class="bg-status-yellow text-black px-6 py-3 text-center font-label text-xs font-bold tracking-widest2">
    DRAFT FOR STUART’S SIGN-OFF · WORDING TO BE EXPANDED ON · NOT YET ON THE HOME PAGE
  </div>
  <div class="mx-auto max-w-7xl px-6 py-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
    <div class="h-[70vh] min-h-[28rem] border border-white/10 grid-bg">
      <DoorsetCanvas {chosen} {doorType} {explode} {isShowingGaps} onchoose={(key) => (chosen = key)} />
    </div>
    <div class="space-y-6">
      <p class="kicker text-gold">Apartment entrance door set</p>
      <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1]">Take a fire door set apart.</h1>
      <DoorTypePicker {doorType} onchoose={chooseDoorType} />
      <ExplainerControls bind:explode bind:isShowingGaps />
      <PartPicker {chosen} {doorType} onchoose={(key) => (chosen = key)} />
      {#if isShowingGaps}
        <p class="text-sm text-muted-dark">
          Leaf to frame {gaps.edgeRange}; threshold {gaps.thresholdFigure}; frame to wall {surround.fireStoppingFigure}, behind the architrave. The gaps are drawn larger than life so they can be seen.
        </p>
      {/if}
      {#if card}
        <PartCard {card} />
      {:else}
        <p class="text-sm text-muted-dark">Select a part, on the door or above, to see what it does and what to look for. Drag the door to turn it and see the outer face.</p>
      {/if}
      <p class="text-xs text-muted-dark">A drawing of how a door set looks. It does not show that any door is certified.</p>
    </div>
  </div>
</section>
