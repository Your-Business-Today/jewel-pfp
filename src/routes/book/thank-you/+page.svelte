<script>
  import { page } from '$app/state';
  import { survey } from '$lib/booking/survey.js';
  import { afterBooking } from '$lib/booking/process.js';
  import { bookingPageLink, bookingReference } from '$lib/booking/reference.js';
  import StepList from '$lib/components/book/StepList.svelte';

  let { data } = $props();
  const { contact } = $derived(data.site);

  const sessionId = $derived(page.url.searchParams.get('session_id'));
  const reference = $derived(bookingReference(sessionId));
  const bookingLink = $derived(bookingPageLink(sessionId));
</script>

<svelte:head>
  <title>Booking Confirmed | Jewel Passive Fire Protection</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="bg-ink text-paper grid-bg border-b border-white/10">
  <div class="mx-auto max-w-3xl px-6 py-20 md:py-24">
    <p class="kicker text-gold mb-6">Booking confirmed</p>
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">Thank you.</h1>
    <p class="mt-6 text-muted-dark leading-relaxed">
      Your {survey.price} site survey is booked. A VAT invoice is on its way to your inbox via Xero.
    </p>
    {#if reference}
      <p class="mt-6 kicker text-muted-dark">Your reference</p>
      <p class="mt-1 font-label text-2xl text-gold">{reference}</p>
    {/if}
  </div>
</section>

<section class="mx-auto max-w-3xl px-6 py-16 md:py-20 space-y-14">
  <div class="border border-ink/15 bg-paper-2 p-8">
    <h2 class="text-2xl font-extrabold tracking-tight">Complete your booking now</h2>
    <p class="mt-3 text-sm text-muted-light leading-relaxed">
      Answer a few questions about your flat and your visit, and send us your fire door report, any supporting
      datasheets, and (if you can find it) a photo of the certification plug or label on your door. Photos of
      the door are welcome but not required — tenants may restrict access. No login needed.
    </p>
    {#if bookingLink}
      <a
        href={bookingLink}
        class="mt-6 inline-block bg-signal text-paper px-7 py-3.5 text-sm font-semibold hover:bg-signal/90 transition-colors"
      >
        Complete your booking →
      </a>
    {:else}
      <p class="mt-6 text-sm text-muted-light leading-relaxed">
        Open this page from Stripe after paying, or email
        <a href="mailto:{contact.email}" class="text-signal hover:underline">{contact.email}</a> and we will send you the link.
      </p>
    {/if}
  </div>

  <div>
    <h2 class="text-2xl font-extrabold tracking-tight mb-8">What happens next</h2>
    <StepList steps={afterBooking} />
  </div>

  <p class="text-sm text-muted-light leading-relaxed">
    Questions or didn’t receive your invoice within an hour? Email
    <a href="mailto:{contact.email}" class="text-signal hover:underline">{contact.email}</a> quoting your
    reference.
  </p>
</section>
