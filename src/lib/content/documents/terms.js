import { consumerTerms } from '$lib/booking/terms/index.js';
import { survey } from '$lib/booking/survey.js';
import { documentKinds } from './kinds.js';
import { column, list } from './parts.js';

const sectionColumns = [column('heading', 'Heading', documentKinds.line), column('blocks', 'Text', documentKinds.blocks)];

/** @type {import('./parts.js').SiteDocument} */
export const termsDocument = {
  key: 'terms',
  label: 'Booking terms',
  path: survey.termsPath,
  blurb: 'The consumer terms, Issue 1.0, as Live on the portal\'s controlled documents register, with the key facts and the cancellation form. Saving sets the "last updated" date to today. The contact details at the end follow the company details.',
  isDated: true,
  fields: [],
  lists: [list('sections', 'Sections', sectionColumns, consumerTerms.sections)]
};

/** @param {Record<string, any>} values */
export function termsFrom(values) {
  return {
    title: consumerTerms.title,
    subtitle: consumerTerms.subtitle,
    issue: consumerTerms.issue,
    updated: values.updatedOn || consumerTerms.issuedOn,
    sections: values.sections
  };
}
