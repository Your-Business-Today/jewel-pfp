<script>
  import { higherRiskBuildings } from '$lib/booking/approvals.js';
  import SectionHeading from './SectionHeading.svelte';

  /** @type {{ signOffs: string[] }} */
  let { signOffs } = $props();
</script>

<section class="bg-ink text-paper grid-bg">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-28 grid gap-12 lg:grid-cols-2">
    <div>
      <SectionHeading
        kicker="Approvals matter"
        title="Even if you are paying, you usually still need the right approval before works start."
        isOnDark
      />
      <p class="mt-6 text-muted-dark leading-relaxed max-w-xl">
        Your front door may form part of the building’s wider fire safety strategy, which means you
        cannot always arrange works independently.
      </p>
      <ul class="mt-8 border-t border-white/15">
        {#each signOffs as signOff}
          <li class="border-b border-white/15 py-4 text-sm">{signOff}</li>
        {/each}
      </ul>
    </div>

    <div class="border border-white/15 bg-ink-2 p-8">
      <h3 class="text-2xl font-extrabold tracking-tight">Practical works approval — relevant authorities</h3>
      <div class="mt-6 space-y-4 text-sm text-muted-dark leading-relaxed">
        {#each higherRiskBuildings as paragraph}
          <p>{paragraph}</p>
        {/each}
      </div>
    </div>
  </div>
</section>
