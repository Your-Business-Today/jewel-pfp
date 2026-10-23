<script>
  import { enquiryStatus } from '$lib/enquiries/enquiryFields.js';
  import EnquiryActions from './EnquiryActions.svelte';

  let { enquiry, isCompact = false } = $props();
  const isUnread = $derived(enquiry.status === enquiryStatus.unread);
  const receivedAt = $derived(new Date(enquiry.created_at).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }));
  const subject = $derived(encodeURIComponent('Re: your enquiry to Jewel Passive Fire Protection'));
</script>

<article class="border border-hairline p-5 {isUnread ? 'bg-signal/5 border-signal/40' : 'bg-ink'}">
  <header class="flex flex-wrap items-baseline justify-between gap-3">
    <p class="font-bold tracking-tight">
      {enquiry.name}
      {#if isUnread}<span class="ml-2 bg-signal text-paper px-2 py-0.5 text-[11px]">New</span>{/if}
    </p>
    <p class="text-[11px] text-body">{receivedAt}</p>
  </header>
  <p class="mt-2 text-xs text-body">
    <a href="mailto:{enquiry.email}?subject={subject}" class="text-gold hover:underline">{enquiry.email}</a>
    {#if enquiry.phone} · <a href="tel:{enquiry.phone}" class="hover:text-gold">{enquiry.phone}</a>{/if}
    {#if enquiry.building} · {enquiry.building}{/if}
    {#if enquiry.service} · {enquiry.service}{/if}
  </p>
  <p class="mt-3 text-sm leading-relaxed whitespace-pre-line {isCompact ? 'line-clamp-3' : ''}">{enquiry.message}</p>
  {#if !isCompact}
    <EnquiryActions id={enquiry.id} status={enquiry.status} name={enquiry.name} />
  {/if}
</article>
