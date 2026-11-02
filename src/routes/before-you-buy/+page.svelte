<script>
  import { hero, audiences, steps } from '$lib/beforeYouBuy/content.js';
  import PageHero from '$lib/components/page/PageHero.svelte';
  import SectionHeading from '$lib/components/book/SectionHeading.svelte';
  import StepList from '$lib/components/book/StepList.svelte';
  import AudienceList from '$lib/components/beforeYouBuy/AudienceList.svelte';
  import BookTheCheck from '$lib/components/beforeYouBuy/BookTheCheck.svelte';
</script>

<svelte:head>
  <title>Before You Buy: Pre-Purchase Fire Door Check | Jewel Passive Fire Protection</title>
  <meta
    name="description"
    content="Buying a flat? Have the flat entrance fire door inspected before you commit: our £99 + VAT apartment door survey, booked online."
  />
</svelte:head>

<PageHero kicker={hero.kicker} heading={hero.heading} intro={hero.intro} />

<section class="border-b border-hairline">
  <div class="mx-auto max-w-7xl px-6 py-16 md:py-24">
    <SectionHeading kicker="Who it is for" title="Buyers, and the people helping them buy." />
    <div class="mt-10">
      <AudienceList {audiences} />
    </div>
  </div>
</section>

<section class="border-b border-hairline bg-ink-2">
  <div class="mx-auto max-w-7xl px-6 py-16 md:py-24 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
    <SectionHeading kicker="How it works" title="Booked online, inspected in person." />
    <StepList {steps} />
  </div>
</section>

<BookTheCheck />
