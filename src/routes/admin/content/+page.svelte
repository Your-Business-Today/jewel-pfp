<script>
  import { contentPages } from '$lib/content/pages/index.js';
</script>

<svelte:head>
  <title>Page text | Jewel PFP admin</title>
</svelte:head>

<h1 class="text-3xl font-extrabold tracking-tight">Page text</h1>
<p class="mt-3 max-w-2xl text-sm text-muted-light">Choose the page whose wording you want to change.</p>
<ul class="mt-8 border-t border-ink/15 max-w-3xl">
  {#each contentPages as contentPage (contentPage.key)}
    <li class="border-b border-ink/15 py-5">
      <a href="/admin/content/{contentPage.key}" class="text-lg font-bold tracking-tight hover:text-signal">{contentPage.label} →</a>
      <p class="mt-1 text-sm text-muted-light">{contentPage.blurb}</p>
    </li>
  {/each}
</ul>
