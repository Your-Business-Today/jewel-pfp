<script>
  import { privacyNotice } from '$lib/privacy/notice.js';

  /** @type {{ contact: Record<string, any> }} */
  let { contact } = $props();
</script>

<footer class="bg-ink text-paper">
  <div class="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-3">
    <div>
      <p class="flex items-baseline gap-2">
        <span class="font-extrabold tracking-tight text-lg text-gold">JEWEL</span>
        <span class="font-label text-signal text-sm">/PFP</span>
      </p>
      <p class="mt-3 text-sm text-muted-dark max-w-xs leading-relaxed">{contact.footerBlurb}</p>
      <p class="mt-4 font-label text-[11px] uppercase tracking-widest2 text-muted-dark">{contact.area}</p>
    </div>

    <div class="font-label text-sm">
      <p class="kicker text-muted-dark mb-4">Contact</p>
      <ul class="space-y-2">
        <li><a href="mailto:{contact.email}" class="hover:text-signal">{contact.email}</a></li>
        <li><a href="tel:{contact.phone.replaceAll(' ', '')}" class="hover:text-signal">{contact.phone}</a></li>
        <li><a href="tel:{contact.mobile.replaceAll(' ', '')}" class="hover:text-signal">{contact.mobile}</a></li>
        <li class="pt-2">
          <a href={contact.booking} class="text-signal hover:underline">Book a £99 fire door survey</a>
        </li>
      </ul>
    </div>

    <div class="font-label text-sm">
      <p class="kicker text-muted-dark mb-4">Elsewhere</p>
      <ul class="space-y-2">
        {#each contact.socials as s}
          <li><a href={s.href} target="_blank" rel="noopener" class="hover:text-signal">{s.name} ↗</a></li>
        {/each}
      </ul>
    </div>
  </div>

  <div class="border-t border-white/10">
    <div
      class="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row gap-2 justify-between font-label text-[11px] uppercase tracking-widest2 text-muted-dark"
    >
      <span>
        © {new Date().getFullYear()} Jewel Passive Fire Protection Ltd ·
        <a href={privacyNotice.path} class="hover:text-signal">Privacy notice</a>
      </span>
      <span>Third-party accredited · Surveying / Remediation / Installation / Firestopping</span>
    </div>
  </div>
</footer>
