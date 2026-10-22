<script>
  import { pageText } from '$lib/content/pageText.js';
  import PageHero from '$lib/components/page/PageHero.svelte';
  import EnquiryForm from '$lib/components/contact/EnquiryForm.svelte';

  let { data, form } = $props();
  const { contact, services, text: savedText } = $derived(data.site);
  const text = $derived(pageText(savedText, 'contact'));
</script>

<svelte:head>
  <title>{text.seoTitle}</title>
  <meta name="description" content={text.seoDescription} />
</svelte:head>

<PageHero kicker={text.kicker} heading={text.heading} intro={text.intro} />

<section class="mx-auto max-w-7xl px-6 py-16 md:py-24 grid gap-16 lg:grid-cols-[1fr_1.4fr]">
  <div>
    <ul class="border-t border-ink/15 font-label text-sm">
      <li class="border-b border-ink/15 py-5">
        <p class="kicker text-muted-light mb-2">Email</p>
        <a href="mailto:{contact.email}" class="text-lg hover:text-signal">{contact.email}</a>
      </li>
      <li class="border-b border-ink/15 py-5">
        <p class="kicker text-muted-light mb-2">Phone</p>
        <a href="tel:{contact.phone.replaceAll(' ', '')}" class="text-lg hover:text-signal">{contact.phone}</a>
      </li>
      <li class="border-b border-ink/15 py-5">
        <p class="kicker text-muted-light mb-2">Office</p>
        <a href="tel:{contact.mobile.replaceAll(' ', '')}" class="text-lg hover:text-signal">{contact.mobile}</a>
      </li>
      <li class="border-b border-ink/15 py-5">
        <p class="kicker text-muted-light mb-2">Coverage</p>
        <span class="text-lg">{contact.area}</span>
      </li>
    </ul>

    <div class="mt-10 border border-signal/40 bg-signal/5 p-6">
      <p class="kicker text-gold mb-3">Residents</p>
      <p class="text-sm leading-relaxed">{text.residentsNote}</p>
      <a href={contact.booking} class="mt-4 inline-block font-label text-sm text-signal hover:underline">
        Book a survey →
      </a>
    </div>
  </div>

  <EnquiryForm contactEmail={contact.email} {services} sentMessage={text.sentMessage} result={form} />
</section>
