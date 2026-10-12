/**
 * Core service data shared by the homepage and services page.
 * Order matters — it drives the 01–06 numbering.
 */
export const services = [
  {
    slug: 'fire-door-surveying',
    index: '01',
    title: 'Fire Door Surveying',
    summary:
      'Third-party accredited inspection of every fire door asset in the building — leaf, frame, seals, ironmongery, glazing and gaps — logged digitally with photographic evidence.',
    detail:
      'A fire door only performs if every component does. Our surveyors inspect each doorset against the applicable standards and the manufacturer’s certification, record the condition of every element, and grade the remedial work required. Findings are delivered as a clear, prioritised report — not a spreadsheet you have to decode.',
    points: [
      'Full doorset inspection: leaf, frame, seals, hinges, closers, glazing, signage',
      'Leaf-to-frame gap tolerances measured and recorded',
      'Digital asset register with photographic evidence via Onetrace',
      'Prioritised remedial schedule with clear costings on request'
    ]
  },
  {
    slug: 'fire-door-remediation',
    index: '02',
    title: 'Fire Door Remediation',
    summary:
      'Certificated repair of non-compliant fire doors — bringing existing doorsets back to performance without unnecessary replacement.',
    detail:
      'Most failed fire doors don’t need replacing; they need the right repair, done to the certificated method. We remediate seals, gaps, ironmongery, glazing and leaf damage using approved components and techniques, so the doorset’s certification remains defensible.',
    points: [
      'Repairs carried out under third-party accreditation',
      'Approved components matched to the doorset’s certification',
      'Replacement recommended only where repair cannot restore performance',
      'Every intervention photographed and logged'
    ]
  },
  {
    slug: 'fire-door-installation',
    index: '03',
    title: 'Fire Door Installation',
    summary:
      'New fire doorsets installed by accredited installers, with the workmanship evidence to prove it.',
    detail:
      'Installation is where most fire doors fail before they’ve ever seen a fire. Our installers fit new doorsets to the manufacturer’s instructions and the relevant standards, with tolerances checked and recorded at handover.',
    points: [
      'Third-party accredited installation teams',
      'Doorsets fitted to manufacturer’s certificated method',
      'Gap tolerances, fixings and seals verified at completion',
      'Handover pack with full photographic record'
    ]
  },
  {
    slug: 'apartment-door-remediation',
    index: '04',
    title: 'Apartment Door Remediation',
    summary:
      'Flat entrance door programmes for residential blocks — planned around residents, with online booking for access appointments.',
    detail:
      'Flat entrance doors are the hardest part of any residential fire door programme: hundreds of individual appointments, each needing a resident at home. We run the whole programme — communication, booking, remediation and evidence — so building managers aren’t chasing access door by door.',
    points: [
      'Resident communication and appointment scheduling handled for you',
      'Online booking portal for access appointments',
      'Consistent certificated remediation across the block',
      'Per-door evidence for the building safety case'
    ],
    cta: { label: 'Book a £99 survey', href: '/book' }
  },
  {
    slug: 'firestopping',
    index: '05',
    title: 'Firestopping',
    summary:
      'Third-party accredited firestopping of service penetrations, linear gaps and compartment breaches — sealed with tested systems and recorded asset by asset.',
    detail:
      'Compartmentation only works if every penetration through it is sealed with a system tested for that exact application. We survey and install firestopping using manufacturer-tested details, and record each seal as an individual asset with location, product and photographic evidence.',
    points: [
      'Service penetrations, linear joints and imperfections of fit',
      'Tested systems selected for the specific substrate and service',
      'Each seal individually tagged, photographed and logged',
      'Survey-only or survey-and-install packages'
    ]
  },
  {
    slug: 'consultancy',
    index: '06',
    title: 'Consultancy',
    summary:
      'Pragmatic passive fire protection advice for building owners, managers and contractors — from a company that also does the work.',
    detail:
      'We advise on compliance strategy, scope remedial programmes, and act as a second pair of eyes on specifications and completed work. Because we survey and install ourselves, the advice is grounded in what actually happens on site — not just what the guidance says.',
    points: [
      'Compliance strategy and remedial programme scoping',
      'Specification and tender review',
      'Independent review of completed passive fire works',
      'Plain-English reporting for duty holders and residents'
    ]
  }
];

export const accreditations = [
  { name: 'BM TRADA', role: 'Third-party certification — fire', href: 'https://www.bmtrada.com/certification-services/third-party-certification-fire' },
  { name: 'Bluesky Certification', role: 'Fire door maintenance & inspection certification', href: 'https://www.blueskycert.com/' },
  { name: 'BSI', role: 'Member', href: 'https://www.bsigroup.com/en-GB/products-and-services/standards-services/bsi-membership/' },
  { name: 'Fire Protection Association', role: 'Member', href: 'https://www.thefpa.co.uk/' },
  { name: 'Fire Industry Association', role: 'Member', href: 'https://www.fia.uk.com/' },
  { name: 'SafeContractor', role: 'Approved — health & safety', href: 'https://www.safecontractor.com/' },
  { name: 'Onetrace', role: 'Digital compliance & traceability', href: 'https://onetrace.cloud/' },
  { name: 'FireAware', role: 'Certified', href: 'https://fireaware.org/' }
];

export const site = {
  url: 'https://www.jewelpfp.co.uk',
  name: 'Jewel Passive Fire Protection'
};

export const contact = {
  email: 'info@jewelpfp.co.uk',
  phone: '0208 109 1013',
  mobile: '07354 744517',
  booking: '/book',
  area: 'Epsom · London · South East',
  socials: [
    { name: 'Instagram', href: 'https://www.instagram.com/jewelpfpltd' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/jewel-passive-fire-protection' },
    { name: 'Facebook', href: 'https://www.facebook.com/Jewelpassivefireprotection/' }
  ]
};

export const company = {
  name: 'Jewel Passive Fire Protection Ltd',
  address: 'Argent House, 175 Hook Rise South, Surbiton KT6 7LD',
  companyNumber: '12340720',
  vatNumber: '350 9263 03'
};
