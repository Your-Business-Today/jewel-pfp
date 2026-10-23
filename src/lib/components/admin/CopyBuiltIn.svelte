<script>
  import { enhance } from '$app/forms';

  let { listName } = $props();
</script>

<div class="mt-8 border border-hairline bg-ink-2 p-6 max-w-3xl">
  <p class="text-sm leading-relaxed">
    The website is showing its built-in {listName}. Copy them in to start editing; until then nothing here changes the site.
  </p>
  <form method="POST" action="?/copyBuiltIn" use:enhance class="mt-4">
    <button class="bg-ink text-paper px-6 py-3 text-sm font-semibold hover:bg-signal transition-colors">
      Copy the website's {listName} in
    </button>
  </form>
</div>
