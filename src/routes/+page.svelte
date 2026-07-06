<script>
  import { services, accreditations, contact } from '$lib/services.js';

  const steps = [
    {
      n: '01',
      title: 'Survey',
      body: 'Every fire door and penetration inspected, measured and logged as an individual asset — with photographs, not opinions.'
    },
    {
      n: '02',
      title: 'Report',
      body: 'A prioritised, plain-English remedial schedule. You see exactly what fails, why, and what it takes to fix.'
    },
    {
      n: '03',
      title: 'Remediate',
      body: 'Certificated repair or installation by our own accredited teams, using components approved for the doorset or system.'
    },
    {
      n: '04',
      title: 'Evidence',
      body: 'Digital, traceable records for every asset via Onetrace — ready for your building safety case and your residents.'
    }
  ];
</script>

<svelte:head>
  <title>Jewel Passive Fire Protection | Fire Doors & Firestopping, London & South East</title>
  <meta
    name="description"
    content="Third-party accredited fire door surveying, remediation, installation and firestopping across Epsom, London and the South East. Evidence for every asset."
  />
</svelte:head>

<!-- HERO -->
<section class="bg-ink text-paper grid-bg border-b border-white/10">
  <div class="mx-auto max-w-7xl px-6 pt-20 pb-16 md:pt-28 md:pb-24 grid gap-16 lg:grid-cols-[1.2fr_1fr] items-center">
    <div>
      <p class="kicker text-signal mb-6">Passive Fire Protection — London &amp; South East</p>
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] max-w-2xl">
        The fire protection you never see has to be right.
      </h1>
      <p class="mt-6 text-lg text-muted-dark max-w-xl leading-relaxed">
        Jewel surveys, remediates, installs and certifies fire doors and firestopping in residential
        and commercial buildings — third-party accredited at every stage, with digital evidence for
        every asset.
      </p>
      <div class="mt-10 flex flex-wrap gap-4">
        <a
          href="/contact"
          class="bg-signal text-paper px-7 py-3.5 text-sm font-semibold hover:bg-signal/90 transition-colors"
        >
          Book a survey
        </a>
        <a
          href="/services"
          class="border border-white/25 px-7 py-3.5 text-sm font-semibold hover:border-signal hover:text-signal transition-colors"
        >
          Our services
        </a>
      </div>
    </div>

    <!-- Fire door line diagram -->
    <div class="hidden lg:block" aria-hidden="true">
      <svg viewBox="0 0 420 480" class="w-full max-w-md ml-auto" fill="none">
        <!-- frame -->
        <rect x="90" y="30" width="200" height="420" stroke="#9BA0A8" stroke-width="1.5" />
        <!-- leaf -->
        <rect x="102" y="42" width="176" height="408" stroke="#F2F1EC" stroke-width="1.5" />
        <!-- intumescent strip -->
        <line x1="96" y1="36" x2="96" y2="450" stroke="#E8501E" stroke-width="2" />
        <!-- vision panel -->
        <rect x="160" y="90" width="60" height="130" stroke="#9BA0A8" stroke-width="1" />
        <!-- hinges -->
        <rect x="102" y="110" width="8" height="26" fill="#E8501E" />
        <rect x="102" y="230" width="8" height="26" fill="#E8501E" />
        <rect x="102" y="350" width="8" height="26" fill="#E8501E" />
        <!-- handle -->
        <circle cx="262" cy="256" r="5" stroke="#F2F1EC" stroke-width="1.5" />
        <!-- closer -->
        <rect x="150" y="52" width="80" height="14" stroke="#9BA0A8" stroke-width="1" />

        <!-- callouts -->
        <g font-family="IBM Plex Mono, monospace" font-size="10" fill="#9BA0A8">
          <line x1="290" y1="59" x2="330" y2="59" stroke="#9BA0A8" stroke-dasharray="3 3" />
          <text x="336" y="62">SELF-CLOSER</text>

          <line x1="96" y1="200" x2="40" y2="200" stroke="#E8501E" stroke-dasharray="3 3" />
          <text x="10" y="192" fill="#E8501E">INTUMESCENT</text>
          <text x="10" y="204" fill="#E8501E">+ SMOKE SEAL</text>

          <line x1="290" y1="155" x2="330" y2="155" stroke="#9BA0A8" stroke-dasharray="3 3" />
          <text x="336" y="150">FIRE-RATED</text>
          <text x="336" y="162">GLAZING</text>

          <line x1="110" y1="363" x2="60" y2="363" stroke="#9BA0A8" stroke-dasharray="3 3" />
          <text x="8" y="366">CE HINGES ×3</text>

          <line x1="290" y1="440" x2="330" y2="440" stroke="#9BA0A8" stroke-dasharray="3 3" />
          <text x="336" y="436">GAP 2–4 MM</text>
          <text x="336" y="448">MEASURED</text>
        </g>
      </svg>
    </div>
  </div>

  <!-- stat strip -->
  <div class="border-t border-white/10">
    <div
      class="mx-auto max-w-7xl px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[11px] uppercase tracking-widest2 text-muted-dark"
    >
      <span><span class="text-signal">4×</span> third-party accreditations</span>
      <span><span class="text-signal">6</span> core services</span>
      <span>Residential &amp; commercial</span>
      <span>Epsom / London / South East</span>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section class="mx-auto max-w-7xl px-6 py-20 md:py-28">
  <div class="flex items-end justify-between mb-12">
    <div>
      <p class="kicker text-signal mb-4">01 / What we do</p>
      <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight">Six services.<br />One standard.</h2>
    </div>
    <a
      href="/services"
      class="hidden md:inline font-mono text-xs uppercase tracking-widest2 border-b border-ink pb-1 hover:text-signal hover:border-signal transition-colors"
    >
      All services →
    </a>
  </div>

  <div class="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-ink/15">
    {#each services as s}
      <a
        href="/services#{s.slug}"
        class="group border-b border-r border-ink/15 p-8 hover:bg-ink hover:text-paper transition-colors"
      >
        <p class="font-mono text-xs text-signal mb-6">{s.index}</p>
        <h3 class="text-xl font-bold tracking-tight">{s.title}</h3>
        <p class="mt-3 text-sm leading-relaxed text-muted-light group-hover:text-muted-dark">
          {s.summary}
        </p>
        <p class="mt-6 font-mono text-[11px] uppercase tracking-widest2 text-signal opacity-0 group-hover:opacity-100 transition-opacity">
          Detail →
        </p>
      </a>
    {/each}
  </div>
</section>

<!-- PROCESS -->
<section class="bg-ink text-paper grid-bg">
  <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
    <p class="kicker text-signal mb-4">02 / How we work</p>
    <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight max-w-2xl">
      Surveyed, fixed, and proven — asset by asset.
    </h2>
    <div class="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-4 bg-white/10 border border-white/10">
      {#each steps as step}
        <div class="bg-ink p-8">
          <p class="font-mono text-xs text-signal">{step.n}</p>
          <h3 class="mt-6 text-lg font-bold">{step.title}</h3>
          <p class="mt-3 text-sm text-muted-dark leading-relaxed">{step.body}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ACCREDITATIONS -->
<section class="mx-auto max-w-7xl px-6 py-20 md:py-28">
  <p class="kicker text-signal mb-4">03 / Accreditation</p>
  <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight max-w-2xl">
    Don't take our word for it. That's the point.
  </h2>
  <p class="mt-6 text-muted-light max-w-xl leading-relaxed">
    Passive fire protection lives or dies on verification. Our work is certificated by independent
    third parties — in fire door surveying, remediation, installation and firestopping.
  </p>

  <ul class="mt-12 border-t border-ink/15">
    {#each accreditations as a, i}
      <li class="flex items-baseline gap-6 border-b border-ink/15 py-4">
        <span class="font-mono text-xs text-signal w-8 shrink-0">{String(i + 1).padStart(2, '0')}</span>
        <span class="font-bold tracking-tight text-lg w-64 shrink-0">{a.name}</span>
        <span class="font-mono text-xs uppercase tracking-widest2 text-muted-light hidden sm:inline">{a.role}</span>
      </li>
    {/each}
  </ul>
</section>

<!-- CTA -->
<section class="bg-signal text-paper">
  <div class="mx-auto max-w-7xl px-6 py-16 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
    <div>
      <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight">Start with a survey.</h2>
      <p class="mt-3 max-w-md leading-relaxed text-paper/90">
        Tell us about the building and we'll tell you exactly where it stands.
      </p>
    </div>
    <div class="flex flex-wrap gap-4">
      <a
        href="/contact"
        class="bg-ink text-paper px-7 py-3.5 text-sm font-semibold hover:bg-ink-2 transition-colors"
      >
        Contact the team
      </a>
      <a
        href="tel:{contact.phone.replaceAll(' ', '')}"
        class="border border-paper/40 px-7 py-3.5 text-sm font-mono hover:border-paper transition-colors"
      >
        {contact.phone}
      </a>
    </div>
  </div>
</section>
