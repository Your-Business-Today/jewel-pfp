<script>
  /** @type {{ serviceCount: number }} */
  let { serviceCount } = $props();
</script>

<div class="bg-ink text-paper border-t border-hairline">
  <div
    class="mx-auto max-w-7xl px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-[11px] uppercase tracking-widest2 text-note"
  >
    <span><span class="text-gold">4×</span> third-party accreditations</span>
    <span><span class="text-gold">{serviceCount}</span> core services</span>
    <span>Residential &amp; commercial</span>
    <span>Epsom / London / South East</span>
  </div>
</div>
