<script>
  import SectionHeading from './SectionHeading.svelte';

  /** @type {{ processSteps: { title: string, body: string }[], assurances: { title: string, body: string }[] }} */
  let { processSteps, assurances } = $props();
</script>

<section id="how-it-works" class="scroll-mt-16 mx-auto max-w-7xl px-6 py-20 md:py-28">
  <SectionHeading kicker="How it works" title="A simple process that removes uncertainty." />
  <ol class="mt-12 grid gap-px bg-ink/15 border border-ink/15 md:grid-cols-2 lg:grid-cols-4">
    {#each processSteps as step, i}
      <li class="bg-paper p-8">
        <p class="font-label text-sm text-signal">0{i + 1}</p>
        <h3 class="mt-4 text-xl font-extrabold tracking-tight">{step.title}</h3>
        <p class="mt-3 text-sm text-muted-light leading-relaxed">{step.body}</p>
      </li>
    {/each}
  </ol>
  <ul class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {#each assurances as assurance}
      <li>
        <p class="font-label text-xs uppercase tracking-widest2 text-gold">{assurance.title}</p>
        <p class="mt-2 text-sm text-muted-light">{assurance.body}</p>
      </li>
    {/each}
  </ul>
</section>
