export const survey = {
  price: '£99 + VAT',
  priceWithVat: '£118.80',
  deductionWindowDays: 90,
  paymentLink: 'https://buy.stripe.com/cN22a02UQdJ29UIdQQ',
  termsPath: '/book/terms'
};

export const highlights = [
  '£99 deducted if you proceed',
  'Bespoke written quotation',
  'Photographic evidence',
  'Digital reporting'
];

export const steps = [
  {
    title: 'Choose a service & pay £99 + VAT',
    body: 'One simple £99 + VAT booking. You tell us which service when you upload your documents.'
  },
  {
    title: 'Replacing the door? Opt in to a measure up & invasive check',
    body: 'Choose this if you are certain you want to replace the doorset, or a fire door survey report strongly recommends it.'
  },
  { title: 'Upload your documents', body: 'We email you a secure link. No login needed.' },
  { title: 'We inspect the door', body: 'In-person site survey, photographic evidence.' },
  { title: 'Written quotation', body: 'Clear scope, price, timescale. £99 deducted.' }
];

export const surveyServices = [
  {
    title: 'Validation survey',
    body: 'We check your door against the defects listed in the fire door report you already have, and confirm which are accurate, which are already fixed and which still need attention.'
  },
  {
    title: 'Standard non-invasive inspection',
    body: 'An independent end-to-end inspection of the doorset, to catch defects an earlier report missed or that have developed since.'
  },
  {
    title: 'Measure up & invasive check',
    body: 'For a replacement quote. We open up the existing installation and reinstate removed components to a temporary standard. Making good and decoration are excluded if the door is not replaced.'
  }
];

export const bookingIncludes = [
  'Deducted in full from your works invoice if you proceed within 90 days of the survey.',
  'In-person inspection of your flat entrance door',
  'Photographic evidence',
  'Written quotation for any works identified',
  'VAT invoice via Xero'
];

export const bookingNotes = [
  'Stripe handles the payment page — we never see or store your card details.',
  'You’ll enter your name, email, billing address and the property address.',
  'You tell us which service you want when you upload your documents.'
];

export const afterPayment = [
  { title: 'Pay £118.80 (£99 + 20% VAT) on Stripe' },
  { title: 'Receive your VAT invoice by email shortly after, issued by Xero' },
  { title: 'Upload your documents via the secure link in your receipt email' },
  { title: 'We get in touch to confirm a survey date within 2 working days' }
];
