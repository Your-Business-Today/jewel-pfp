<script>
  /** @type {{ audiences: { title: string, body: string }[] }} */
  let { audiences } = $props();
</script>

<ul class="grid gap-px bg-hairline border border-hairline md:grid-cols-3">
  {#each audiences as audience}
    <li class="bg-ink p-6">
      <p class="text-lg font-semibold">{audience.title}</p>
      <p class="mt-2 text-sm leading-relaxed text-body">{audience.body}</p>
    </li>
  {/each}
</ul>
