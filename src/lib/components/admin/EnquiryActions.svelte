<script>
  import { enhance } from '$app/forms';
  import { enquiryStatus } from '$lib/enquiries/enquiryFields.js';

  let { id, status, name } = $props();
  const isUnread = $derived(status === enquiryStatus.unread);
  const isArchived = $derived(status === enquiryStatus.archived);
  const buttonClass = 'font-label text-[11px] uppercase tracking-widest2 border border-ink/20 px-2.5 py-1.5 hover:border-signal hover:text-signal';

  /** @type {import('@sveltejs/kit').SubmitFunction} */
  function confirmRemoval({ cancel }) {
    const isConfirmed = confirm(`Delete the enquiry from ${name}? This cannot be undone.`);
    if (!isConfirmed) cancel();
  }
</script>

<div class="mt-4 flex flex-wrap gap-2">
  {#if !isArchived}
    <form method="POST" action={isUnread ? '?/markRead' : '?/markUnread'} use:enhance>
      <input type="hidden" name="id" value={id} />
      <button class={buttonClass}>{isUnread ? 'Mark as read' : 'Mark as unread'}</button>
    </form>
  {/if}
  <form method="POST" action={isArchived ? '?/restore' : '?/archive'} use:enhance>
    <input type="hidden" name="id" value={id} />
    <button class={buttonClass}>{isArchived ? 'Back to inbox' : 'Archive'}</button>
  </form>
  {#if isArchived}
    <form method="POST" action="?/remove" use:enhance={confirmRemoval}>
      <input type="hidden" name="id" value={id} />
      <button class={buttonClass}>Delete</button>
    </form>
  {/if}
</div>
