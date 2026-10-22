<script>
  import { pageText } from '$lib/content/pageText.js';
  import EnquiryForm from '$lib/components/contact/EnquiryForm.svelte';

  let { data, form } = $props();
  const { contact, services, text: savedText } = $derived(data.site);
  const text = $derived(pageText(savedText, 'contact'));
</script>

<svelte:head>
  <title>{text.seoTitle}</title>
  <meta name="description" content={text.seoDescription} />
</svelte:head>

<!-- HEADER -->
<section class="bg-ink text-paper grid-bg border-b border-hairline">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
    <p class="kicker text-gold mb-6">{text.kicker}</p>
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.05]">
      {text.heading}
    </h1>
    <p class="mt-6 text-lg text-body max-w-xl leading-relaxed">
      {text.intro}
    </p>
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 py-16 md:py-24 grid gap-16 lg:grid-cols-[1fr_1.4fr]">
  <!-- DETAILS -->
  <div>
    <ul class="border-t border-hairline text-sm">
      <li class="border-b border-hairline py-5">
        <p class="kicker text-gold mb-2">Email</p>
        <a href="mailto:{contact.email}" class="text-lg hover:text-gold">{contact.email}</a>
      </li>
      <li class="border-b border-hairline py-5">
        <p class="kicker text-gold mb-2">Phone</p>
        <a href="tel:{contact.phone.replaceAll(' ', '')}" class="text-lg hover:text-gold">{contact.phone}</a>
      </li>
      <li class="border-b border-hairline py-5">
        <p class="kicker text-gold mb-2">Office</p>
        <a href="tel:{contact.mobile.replaceAll(' ', '')}" class="text-lg hover:text-gold">{contact.mobile}</a>
      </li>
      <li class="border-b border-hairline py-5">
        <p class="kicker text-gold mb-2">Coverage</p>
        <span class="text-lg">{contact.area}</span>
      </li>
    </ul>

    <div class="mt-10 border border-signal/40 bg-signal/5 p-6">
      <p class="kicker text-gold mb-3">Residents</p>
      <p class="text-sm leading-relaxed">{text.residentsNote}</p>
      <a href={contact.booking} class="mt-4 inline-block text-sm text-gold hover:underline">
        Book a survey →
      </a>
    </div>
  </div>

  <EnquiryForm contactEmail={contact.email} {services} sentMessage={text.sentMessage} result={form} />
</section>
