import { line, paragraph, searchFields } from './fields.js';

/** @type {import('./fields.js').ContentPage} */
export const servicesPage = {
  key: 'services',
  label: 'Services page',
  path: '/services',
  blurb: 'The heading above the services and the closing call to action. The services themselves are edited under Services.',
  fields: [
    ...searchFields(
      'Services | Jewel Passive Fire Protection',
      'Fire door surveying, remediation, installation, apartment door programmes, firestopping and consultancy — third-party accredited, across Epsom, London and the South East.'
    ),
    line('kicker', 'Small heading', 'Services'),
    line('heading', 'Headline', 'Everything between a fire and the rest of the building.'),
    paragraph(
      'intro',
      'Text',
      'Six services covering the full passive fire protection cycle — from the first survey to the evidence pack. Delivered by our own accredited teams, never subcontracted into the unknown.'
    ),
    line('ctaHeading', 'Closing call to action: heading', 'Not sure where to start?'),
    paragraph('ctaIntro', 'Closing call to action: text', "Most projects start with a survey. Tell us about the building and we'll scope it with you.")
  ]
};
