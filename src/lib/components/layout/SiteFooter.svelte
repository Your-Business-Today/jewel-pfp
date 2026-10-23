<script>
  import { privacyNotice } from '$lib/privacy/notice.js';
  import { brandLogo } from '$lib/brand.js';

  /** @type {{ contact: Record<string, any> }} */
  let { contact } = $props();
</script>

<footer class="bg-ink text-paper">
  <div class="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-3">
    <div>
      <img src={brandLogo.src} alt={brandLogo.alt} width={brandLogo.width} height={brandLogo.height} class="h-14 w-auto" />
      <p class="mt-3 text-sm text-footer max-w-xs leading-relaxed">{contact.footerBlurb}</p>
      <p class="mt-4 text-[11px] uppercase tracking-widest2 text-footer">{contact.area}</p>
    </div>

    <div class="text-sm">
      <p class="kicker text-gold mb-4">Contact</p>
      <ul class="space-y-2">
        <li><a href="mailto:{contact.email}" class="hover:text-gold">{contact.email}</a></li>
        <li><a href="tel:{contact.phone.replaceAll(' ', '')}" class="hover:text-gold">{contact.phone}</a></li>
        <li><a href="tel:{contact.mobile.replaceAll(' ', '')}" class="hover:text-gold">{contact.mobile}</a></li>
        <li class="pt-2">
          <a href={contact.booking} class="text-gold hover:underline">Book a £99 fire door survey</a>
        </li>
      </ul>
    </div>

    <div class="text-sm">
      <p class="kicker text-gold mb-4">Elsewhere</p>
      <ul class="space-y-2">
        {#each contact.socials as s}
          <li><a href={s.href} target="_blank" rel="noopener" class="hover:text-gold">{s.name} ↗</a></li>
        {/each}
      </ul>
    </div>
  </div>

  <div class="border-t border-hairline">
    <div
      class="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row gap-2 justify-between text-[11px] uppercase tracking-widest2 text-footer"
    >
      <span>
        © {new Date().getFullYear()} Jewel Passive Fire Protection Ltd ·
        <a href={privacyNotice.path} class="hover:text-gold">Privacy notice</a>
      </span>
      <span>Third-party accredited · Surveying / Remediation / Installation / Firestopping</span>
    </div>
  </div>
</footer>
