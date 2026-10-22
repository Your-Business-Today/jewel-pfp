<script>
  import DocumentBlocks from '$lib/components/documents/DocumentBlocks.svelte';
  import { privacyNotice } from '$lib/privacy/notice.js';

  let { data } = $props();
  const { company, contact } = $derived(data.site);
  const { title, subtitle, issue, updated, sections } = $derived(data.terms);
</script>

<svelte:head>
  <title>Consumer Terms & Conditions | Jewel Passive Fire Protection</title>
  <meta name="description" content="Consumer terms and conditions for the £99 + VAT Apartment Door Survey and works from Jewel Passive Fire Protection, with the cancellation form." />
</svelte:head>

<section class="bg-ink text-paper grid-bg border-b border-hairline">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-24">
    <p class="kicker text-gold mb-6">{subtitle}</p>
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">{title}</h1>
    <p class="mt-6 text-body max-w-xl leading-relaxed">
      {company.name}. Issue {issue}. Last updated: {updated}.
    </p>
  </div>
</section>

<section class="mx-auto max-w-3xl px-6 py-16 md:py-24 space-y-12">
  {#each sections as section}
    <div>
      <h2 class="text-2xl font-extrabold tracking-tight">{section.heading}</h2>
      <div class="mt-4">
        <DocumentBlocks blocks={section.blocks} />
      </div>
    </div>
  {/each}
  <div>
    <h2 class="text-2xl font-extrabold tracking-tight">Contact us</h2>
    <div class="mt-4 space-y-1 text-sm leading-relaxed text-body">
      <p>{company.name}, {company.address}</p>
      <p><a href="mailto:{contact.email}" class="text-gold hover:underline">{contact.email}</a> · {contact.phone}</p>
      <p>Registered in England · Company No. {company.companyNumber} · VAT No. {company.vatNumber}</p>
      <p><a href={privacyNotice.path} class="text-gold hover:underline">Privacy notice</a></p>
    </div>
  </div>
  <a href="/book" class="inline-block text-sm text-gold hover:underline">← Back to booking</a>
</section>
