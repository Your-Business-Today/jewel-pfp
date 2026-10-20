<script>
  import { privacyNotice } from '$lib/privacy/notice.js';

  let { data } = $props();
  const { company, contact } = $derived(data.site);
  const { updated, sections } = $derived(data.terms);
</script>

<svelte:head>
  <title>Survey Terms | Jewel Passive Fire Protection</title>
  <meta name="description" content="Terms and conditions for the £99 + VAT fire door survey from Jewel Passive Fire Protection." />
</svelte:head>

<section class="bg-ink text-paper grid-bg border-b border-white/10">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-24">
    <p class="kicker text-gold mb-6">Fire door survey</p>
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">Terms and conditions.</h1>
    <p class="mt-6 text-muted-dark max-w-xl leading-relaxed">
      These terms apply to the £99 + VAT fire door survey booked via jewelpfp.co.uk/book, provided by
      {company.name}. Last updated: {updated}.
    </p>
  </div>
</section>

<section class="mx-auto max-w-3xl px-6 py-16 md:py-24">
  <ol class="space-y-12">
    {#each sections as section, i}
      <li>
        <h2 class="text-2xl font-extrabold tracking-tight">
          <span class="font-label text-signal text-base mr-3">{i + 1}.</span>{section.title}
        </h2>
        <div class="mt-4 space-y-3 text-sm leading-relaxed text-muted-light">
          {#each section.paragraphs as paragraph}
            <p>{paragraph}</p>
          {/each}
          {#if section.items?.length}
            <ul class="list-disc pl-5 space-y-1">
              {#each section.items as item}
                <li>{item}</li>
              {/each}
            </ul>
          {/if}
        </div>
      </li>
    {/each}
    <li>
      <h2 class="text-2xl font-extrabold tracking-tight">
        <span class="font-label text-signal text-base mr-3">{sections.length + 1}.</span>Contact us
      </h2>
      <div class="mt-4 space-y-1 text-sm leading-relaxed text-muted-light">
        <p>{company.name}, {company.address}</p>
        <p><a href="mailto:{contact.email}" class="text-signal hover:underline">{contact.email}</a> · {contact.phone}</p>
        <p>Registered in England · Company No. {company.companyNumber} · VAT No. {company.vatNumber}</p>
        <p><a href={privacyNotice.path} class="text-signal hover:underline">Privacy notice</a></p>
      </div>
    </li>
  </ol>
  <a href="/book" class="mt-16 inline-block font-label text-sm text-signal hover:underline">← Back to booking</a>
</section>
