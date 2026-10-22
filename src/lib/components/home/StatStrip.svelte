<script>
  /** @type {{ serviceCount: number }} */
  let { serviceCount } = $props();
</script>

<div class="bg-ink text-paper border-t border-white/10">
  <div
    class="mx-auto max-w-7xl px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 font-label text-[11px] uppercase tracking-widest2 text-muted-dark"
  >
    <span><span class="text-gold">4×</span> third-party accreditations</span>
    <span><span class="text-gold">{serviceCount}</span> core services</span>
    <span>Residential &amp; commercial</span>
    <span>Epsom / London / South East</span>
  </div>
</div>
