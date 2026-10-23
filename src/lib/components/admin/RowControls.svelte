<script>
  import { enhance } from '$app/forms';

  let { id, isVisible, isFirst, isLast, name } = $props();
  const buttonClass = 'text-[11px] uppercase tracking-widest2 border border-hairline px-2.5 py-1.5 hover:border-gold hover:text-gold disabled:opacity-30';

  /** @type {import('@sveltejs/kit').SubmitFunction} */
  function confirmRemoval({ cancel }) {
    const isConfirmed = confirm(`Delete ${name}? This cannot be undone.`);
    if (!isConfirmed) cancel();
  }
</script>

<div class="flex flex-wrap gap-2">
  <form method="POST" action="?/moveUp" use:enhance>
    <input type="hidden" name="id" value={id} />
    <button class={buttonClass} disabled={isFirst} aria-label="Move up">▲</button>
  </form>
  <form method="POST" action="?/moveDown" use:enhance>
    <input type="hidden" name="id" value={id} />
    <button class={buttonClass} disabled={isLast} aria-label="Move down">▼</button>
  </form>
  <form method="POST" action={isVisible ? '?/hide' : '?/show'} use:enhance>
    <input type="hidden" name="id" value={id} />
    <button class={buttonClass}>{isVisible ? 'Hide' : 'Show'}</button>
  </form>
  <form method="POST" action="?/remove" use:enhance={confirmRemoval}>
    <input type="hidden" name="id" value={id} />
    <button class={buttonClass}>Delete</button>
  </form>
</div>
