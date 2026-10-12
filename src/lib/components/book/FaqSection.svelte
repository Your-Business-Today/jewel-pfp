<script>
  import { faqGroups } from '$lib/booking/faq.js';
  import SectionHeading from './SectionHeading.svelte';
  import FaqItem from './FaqItem.svelte';
</script>

<section id="faq" class="scroll-mt-16 bg-paper-2 border-y border-ink/10">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
    <SectionHeading kicker="Questions" title="Frequently asked questions." />
    <div class="mt-12 grid gap-12 lg:grid-cols-2">
      {#each faqGroups as group}
        <div>
          <p class="kicker text-muted-light mb-2">{group.title}</p>
          <div class="border-t border-ink/15">
            {#each group.questions as item}
              <FaqItem question={item.question} answer={item.answer} />
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
