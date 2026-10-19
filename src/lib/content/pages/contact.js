import { line, paragraph, searchFields } from './fields.js';

/** @type {import('./fields.js').ContentPage} */
export const contactPage = {
  key: 'contact',
  label: 'Contact page',
  path: '/contact',
  blurb: 'The heading, the note for residents and the message shown once an enquiry is sent.',
  fields: [
    ...searchFields(
      'Contact | Jewel Passive Fire Protection',
      'Contact Jewel Passive Fire Protection — fire door surveying, remediation, installation and firestopping across Epsom, London and the South East.'
    ),
    line('kicker', 'Small heading', 'Contact'),
    line('heading', 'Headline', 'Tell us about the building.'),
    paragraph('intro', 'Text', 'A short conversation is usually enough to scope the right starting point — most often a survey.'),
    paragraph(
      'residentsNote',
      'Residents note',
      "Have a fire door report on your flat entrance door? Book a £99 + VAT survey and we'll validate it and quote the works:"
    ),
    paragraph('sentMessage', 'Shown once an enquiry is sent', "Thank you — your enquiry has reached the team and we'll be in touch shortly.")
  ]
};
