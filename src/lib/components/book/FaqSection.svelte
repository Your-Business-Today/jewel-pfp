<script>
  import SectionHeading from './SectionHeading.svelte';
  import FaqItem from './FaqItem.svelte';

  /** @type {{ faqGroups: { title: string, questions: { question: string, answer: string }[] }[] }} */
  let { faqGroups } = $props();
</script>

<section id="faq" class="scroll-mt-16 bg-ink-2 border-y border-hairline">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
    <SectionHeading kicker="Questions" title="Answers before you even need to ask." />
    <div class="mt-12 grid gap-12 lg:grid-cols-2">
      {#each faqGroups as group}
        <div>
          <p class="kicker text-gold mb-2">{group.title}</p>
          <div class="border-t border-hairline">
            {#each group.questions as item}
              <FaqItem question={item.question} answer={item.answer} />
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
