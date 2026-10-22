<script>
  import DocumentBlocks from '$lib/components/documents/DocumentBlocks.svelte';

  let { data } = $props();
  const { company } = $derived(data.site);
  const { notice } = $derived(data);
</script>

<svelte:head>
  <title>Privacy Notice | Jewel Passive Fire Protection</title>
  <meta name="description" content="How Jewel Passive Fire Protection Ltd collects, uses, shares and keeps personal information." />
</svelte:head>

<section class="bg-ink text-paper grid-bg border-b border-white/10">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-24">
    <p class="kicker text-gold mb-6">{company.name}</p>
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">Privacy notice.</h1>
    <p class="mt-6 text-muted-dark max-w-xl leading-relaxed">
      Last updated: {notice.lastUpdated}. Version {notice.version}.
    </p>
  </div>
</section>

<section class="mx-auto max-w-3xl px-6 py-16 md:py-24 space-y-12">
  <DocumentBlocks blocks={notice.introduction} />
  {#each notice.sections as section}
    <div>
      <h2 class="text-2xl font-extrabold tracking-tight">{section.heading}</h2>
      <div class="mt-4">
        <DocumentBlocks blocks={section.blocks} />
      </div>
    </div>
  {/each}
</section>
