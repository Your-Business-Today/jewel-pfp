<script>
  import { enhance } from '$app/forms';
  import { enquiryFields } from '$lib/enquiries/enquiryFields.js';
  import { mailtoEnquiry } from '$lib/enquiries/mailto.js';
  import EnquiryField from './EnquiryField.svelte';

  let { contactEmail, services, sentMessage, result } = $props();
  const { name, email, phone, building, service, message } = enquiryFields;
  const values = $derived(result?.values ?? {});
  const failed = 'failure';
  let isSending = $state(false);

  /** @type {import('@sveltejs/kit').SubmitFunction} */
  function send() {
    isSending = true;
    return async ({ result: outcome, update }) => {
      isSending = false;
      const answer = outcome.type === failed ? outcome.data : undefined;
      const isUnconfigured = Boolean(answer?.isUnconfigured);
      if (!isUnconfigured) return update();
      const emailInstead = mailtoEnquiry(contactEmail, answer?.values);
      window.location.assign(emailInstead);
      await update({ reset: false });
    };
  }

  const inputClass =
    'w-full bg-transparent border border-ink/25 px-4 py-3 text-sm placeholder:text-muted-light/60 focus:outline-none focus:border-signal transition-colors';
</script>

{#if result?.isSent}
  <div class="border border-ink/15 p-8 md:p-10 bg-paper-2">
    <p class="kicker text-gold mb-4">Enquiry sent</p>
    <p class="text-lg leading-relaxed">{sentMessage}</p>
  </div>
{:else}
  <form method="POST" use:enhance={send} class="border border-ink/15 p-8 md:p-10 bg-paper-2">
    <p class="kicker text-gold mb-8">Enquiry form</p>
    <div class="grid gap-6 sm:grid-cols-2">
      <EnquiryField label={name.label}>
        <input class={inputClass} name="name" value={values.name ?? ''} required maxlength={name.limit} placeholder="Your name" />
      </EnquiryField>
      <EnquiryField label={email.label}>
        <input class={inputClass} name="email" type="email" value={values.email ?? ''} required maxlength={email.limit} placeholder="you@company.co.uk" />
      </EnquiryField>
      <EnquiryField label={phone.label}>
        <input class={inputClass} name="phone" type="tel" value={values.phone ?? ''} maxlength={phone.limit} placeholder="Optional" />
      </EnquiryField>
      <EnquiryField label={building.label}>
        <input class={inputClass} name="building" value={values.building ?? ''} maxlength={building.limit} placeholder="e.g. Residential block, Epsom" />
      </EnquiryField>
      <EnquiryField label={service.label}>
        <select class={inputClass} name="service" value={values.service ?? ''}>
          <option value="">Not sure yet</option>
          {#each services as offered}
            <option value={offered.title}>{offered.title}</option>
          {/each}
        </select>
      </EnquiryField>
    </div>
    <div class="mt-6">
      <EnquiryField label={message.label}>
        <textarea class={inputClass} name="message" rows="5" required maxlength={message.limit} placeholder="What do you need looked at?">{values.message ?? ''}</textarea>
      </EnquiryField>
    </div>
    <input type="text" name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />
    {#if result?.problem}
      <p class="mt-6 text-sm text-signal">{result.problem}</p>
    {/if}
    <button
      type="submit"
      disabled={isSending}
      class="mt-8 bg-ink text-paper px-8 py-3.5 text-sm font-semibold hover:bg-signal transition-colors disabled:opacity-60"
    >
      {isSending ? 'Sending…' : 'Send enquiry'}
    </button>
  </form>
{/if}
