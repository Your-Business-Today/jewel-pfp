<script>
  import { survey } from '$lib/booking/survey.js';
  import { privacyNotice } from '$lib/privacy/notice.js';
  import { bookingIncludes, afterPayment } from '$lib/booking/process.js';
  import SectionHeading from './SectionHeading.svelte';
  import StepList from './StepList.svelte';
  import CheckoutTicks from './CheckoutTicks.svelte';

  /** @type {{ price: string, priceWithVat: string }} */
  let { price, priceWithVat } = $props();
</script>

<section id="book" class="scroll-mt-16 bg-ink text-paper grid-bg">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-28 grid gap-12 lg:grid-cols-2">
    <div>
      <SectionHeading kicker="Book now" title="Book your site survey." isOnDark />
      <p class="mt-6 text-muted-dark leading-relaxed max-w-xl">
        Click the button below to pay {price} via Stripe. After payment we’ll email you a secure
        upload link for your documents.
      </p>
      <p class="mt-8 kicker text-muted-dark">What you pay today</p>
      <p class="mt-2 text-4xl font-extrabold tracking-tight">
        {price} <span class="text-lg font-label text-muted-dark">({priceWithVat})</span>
      </p>
      <p class="mt-2 text-sm text-muted-dark">
        Deducted in full from your final invoice if you go ahead with the works.
      </p>
      <ul class="mt-6 space-y-2 text-sm">
        {#each bookingIncludes as included}
          <li class="flex gap-3"><span class="text-signal">✓</span>{included}</li>
        {/each}
      </ul>
      <h3 class="mt-10 text-xl font-extrabold tracking-tight">Ready when you are</h3>
      <p class="mt-2 text-sm text-muted-dark leading-relaxed max-w-xl">
        Stripe handles the payment page — we never see or store your card details. You’ll enter your name,
        email, billing address and the property address. You tell us which service you want when you
        upload your documents.
      </p>
    </div>

    <div class="border border-white/15 bg-ink-2 p-8">
      <p class="kicker text-gold mb-3">Site survey</p>
      <h3 class="text-2xl font-extrabold tracking-tight">Complete your {price} booking.</h3>
      <p class="mt-2 mb-8 text-sm text-muted-dark leading-relaxed">
        All three services are the same {price} booking. You’ll be taken to Stripe’s secure payment
        page to enter your contact and billing details and pay, then tell us which service you want when
        you upload your documents.
      </p>
      <p class="kicker text-muted-dark mb-4">What happens next</p>
      <StepList steps={afterPayment} isOnDark />
      <CheckoutTicks {price} />
      <p class="mt-6 text-xs text-muted-dark leading-relaxed">
        Secure payment by Stripe. You do not need a Stripe account. By continuing you accept our
        <a href={survey.termsPath} class="text-paper underline hover:text-signal">consumer terms</a>,
        including your right to cancel within 14 days, and that the {price} is deducted in full from
        your final invoice if you go ahead with the works. Our
        <a href={privacyNotice.path} class="text-paper underline hover:text-signal">privacy notice</a> explains how
        we use your details.
      </p>
    </div>
  </div>
</section>
