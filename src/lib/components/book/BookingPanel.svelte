<script>
  import { survey, bookingIncludes, bookingNotes, afterPayment } from '$lib/booking/survey.js';
  import SectionHeading from './SectionHeading.svelte';
  import StepList from './StepList.svelte';
</script>

<section id="book" class="scroll-mt-16 bg-ink text-paper grid-bg">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-28 grid gap-12 lg:grid-cols-2">
    <div>
      <SectionHeading kicker="Book now" title="Book your site survey." isOnDark />
      <p class="mt-6 text-muted-dark leading-relaxed max-w-xl">
        Pay {survey.price} via Stripe. After payment we’ll email you a secure upload link for your
        documents.
      </p>
      <p class="mt-8 text-4xl font-extrabold tracking-tight">
        {survey.price} <span class="text-lg font-label text-muted-dark">({survey.priceWithVat})</span>
      </p>
      <ul class="mt-6 space-y-2 text-sm">
        {#each bookingIncludes as included}
          <li class="flex gap-3"><span class="text-signal">✓</span>{included}</li>
        {/each}
      </ul>
      <ul class="mt-6 space-y-1 text-sm text-muted-dark">
        {#each bookingNotes as note}
          <li>{note}</li>
        {/each}
      </ul>
    </div>

    <div class="border border-white/15 bg-ink-2 p-8">
      <p class="kicker text-gold mb-3">Site survey</p>
      <h3 class="text-2xl font-extrabold tracking-tight">Complete your {survey.price} booking.</h3>
      <p class="mt-2 mb-8 text-sm text-muted-dark">All three services are the same {survey.price} booking.</p>
      <StepList steps={afterPayment} isOnDark />
      <a
        href={survey.paymentLink}
        rel="noopener"
        class="mt-10 inline-block bg-signal text-paper px-7 py-3.5 text-sm font-semibold hover:bg-signal/90 transition-colors"
      >
        Pay {survey.price} via Stripe
      </a>
      <p class="mt-6 text-xs text-muted-dark leading-relaxed">
        Secure payment by Stripe. VAT invoice issued automatically via Xero. By continuing you accept
        the <a href={survey.termsPath} class="text-paper underline hover:text-signal">survey terms</a>,
        including that the {survey.price} is non-refundable once we attend site.
      </p>
    </div>
  </div>
</section>
