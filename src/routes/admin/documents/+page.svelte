<script>
  import { siteDocuments } from '$lib/content/documents/index.js';
</script>

<svelte:head>
  <title>Booking and privacy | Jewel PFP admin</title>
</svelte:head>

<h1 class="text-3xl font-extrabold tracking-tight">Booking and privacy</h1>
<p class="mt-3 max-w-2xl text-sm text-body">Choose the page whose wording you want to change.</p>
<ul class="mt-8 border-t border-hairline max-w-3xl">
  {#each siteDocuments as siteDocument (siteDocument.key)}
    <li class="border-b border-hairline py-5">
      <a href="/admin/documents/{siteDocument.key}" class="text-lg font-bold tracking-tight hover:text-gold">{siteDocument.label} →</a>
      <p class="mt-1 text-sm text-body">{siteDocument.blurb}</p>
    </li>
  {/each}
</ul>
