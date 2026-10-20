import { termsSections, termsUpdated } from '$lib/booking/terms.js';
import { documentKinds } from './kinds.js';
import { column, list } from './parts.js';

const sectionColumns = [
  column('title', 'Heading', documentKinds.line),
  column('paragraphs', 'Paragraphs', documentKinds.paragraphs),
  column('items', 'Points after the paragraphs (optional)', documentKinds.lines, false)
];

/** @type {import('./parts.js').SiteDocument} */
export const termsDocument = {
  key: 'terms',
  label: 'Booking terms',
  path: '/book/terms',
  blurb: 'The sections of the survey terms. Saving sets the "last updated" date to today. The contact details at the end follow the company details.',
  isDated: true,
  fields: [],
  lists: [list('sections', 'Sections', sectionColumns, termsSections)]
};

/** @param {Record<string, any>} values */
export function termsFrom(values) {
  return { updated: values.updatedOn || termsUpdated, sections: values.sections };
}
