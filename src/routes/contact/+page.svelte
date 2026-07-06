<script>
  import { contact, services } from '$lib/services.js';

  let name = $state('');
  let email = $state('');
  let building = $state('');
  let service = $state('');
  let message = $state('');

  /** @param {SubmitEvent} e */
  function submit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Enquiry${service ? ` — ${service}` : ''}${building ? ` — ${building}` : ''}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nBuilding / site: ${building}\nService: ${service || 'Not sure yet'}\n\n${message}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }

  const inputClass =
    'w-full bg-transparent border border-ink/25 px-4 py-3 text-sm placeholder:text-muted-light/60 focus:outline-none focus:border-signal transition-colors';
</script>

<svelte:head>
  <title>Contact | Jewel Passive Fire Protection</title>
  <meta
    name="description"
    content="Contact Jewel Passive Fire Protection — fire door surveying, remediation, installation and firestopping across Epsom, London and the South East."
  />
</svelte:head>

<!-- HEADER -->
<section class="bg-ink text-paper grid-bg border-b border-white/10">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
    <p class="kicker text-signal mb-6">Contact</p>
    <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.05]">
      Tell us about the building.
    </h1>
    <p class="mt-6 text-lg text-muted-dark max-w-xl leading-relaxed">
      A short conversation is usually enough to scope the right starting point — most often a survey.
    </p>
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 py-16 md:py-24 grid gap-16 lg:grid-cols-[1fr_1.4fr]">
  <!-- DETAILS -->
  <div>
    <ul class="border-t border-ink/15 font-mono text-sm">
      <li class="border-b border-ink/15 py-5">
        <p class="kicker text-muted-light mb-2">Email</p>
        <a href="mailto:{contact.email}" class="text-lg hover:text-signal">{contact.email}</a>
      </li>
      <li class="border-b border-ink/15 py-5">
        <p class="kicker text-muted-light mb-2">Phone</p>
        <a href="tel:{contact.phone.replaceAll(' ', '')}" class="text-lg hover:text-signal">{contact.phone}</a>
      </li>
      <li class="border-b border-ink/15 py-5">
        <p class="kicker text-muted-light mb-2">Office</p>
        <a href="tel:{contact.mobile.replaceAll(' ', '')}" class="text-lg hover:text-signal">{contact.mobile}</a>
      </li>
      <li class="border-b border-ink/15 py-5">
        <p class="kicker text-muted-light mb-2">Coverage</p>
        <span class="text-lg">{contact.area}</span>
      </li>
    </ul>

    <div class="mt-10 border border-signal/40 bg-signal/5 p-6">
      <p class="kicker text-signal mb-3">Residents</p>
      <p class="text-sm leading-relaxed">
        If we're working on your building and you need to arrange access for your apartment door,
        book directly:
      </p>
      <a
        href={contact.booking}
        target="_blank"
        rel="noopener"
        class="mt-4 inline-block font-mono text-sm text-signal hover:underline"
      >
        book.jewelpfp.co.uk ↗
      </a>
    </div>
  </div>

  <!-- FORM -->
  <form onsubmit={submit} class="border border-ink/15 p-8 md:p-10 bg-paper-2">
    <p class="kicker text-signal mb-8">Enquiry form</p>
    <div class="grid gap-6 sm:grid-cols-2">
      <label class="block">
        <span class="font-mono text-[11px] uppercase tracking-widest2 text-muted-light block mb-2">Name</span>
        <input class={inputClass} bind:value={name} required placeholder="Your name" />
      </label>
      <label class="block">
        <span class="font-mono text-[11px] uppercase tracking-widest2 text-muted-light block mb-2">Email</span>
        <input class={inputClass} type="email" bind:value={email} required placeholder="you@company.co.uk" />
      </label>
      <label class="block">
        <span class="font-mono text-[11px] uppercase tracking-widest2 text-muted-light block mb-2">Building / site</span>
        <input class={inputClass} bind:value={building} placeholder="e.g. Residential block, Epsom" />
      </label>
      <label class="block">
        <span class="font-mono text-[11px] uppercase tracking-widest2 text-muted-light block mb-2">Service</span>
        <select class={inputClass} bind:value={service}>
          <option value="">Not sure yet</option>
          {#each services as s}
            <option value={s.title}>{s.title}</option>
          {/each}
        </select>
      </label>
    </div>
    <label class="block mt-6">
      <span class="font-mono text-[11px] uppercase tracking-widest2 text-muted-light block mb-2">Message</span>
      <textarea class={inputClass} rows="5" bind:value={message} placeholder="What do you need looked at?"></textarea>
    </label>
    <button
      type="submit"
      class="mt-8 bg-ink text-paper px-8 py-3.5 text-sm font-semibold hover:bg-signal transition-colors"
    >
      Send enquiry
    </button>
    <p class="mt-4 font-mono text-[11px] text-muted-light">Opens in your email client, addressed to {contact.email}.</p>
  </form>
</section>
