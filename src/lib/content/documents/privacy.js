import { privacyNotice } from '$lib/privacy/notice.js';
import { documentKinds } from './kinds.js';
import { column, field, list } from './parts.js';

const sectionColumns = [column('heading', 'Heading', documentKinds.line), column('blocks', 'Text', documentKinds.blocks)];

/** @type {import('./parts.js').SiteDocument} */
export const privacyDocument = {
  key: 'privacy',
  label: 'Privacy notice',
  path: privacyNotice.path,
  blurb: 'The opening of the privacy notice and each of its sections, with their lists and tables. Saving sets the "last updated" date to today.',
  isDated: true,
  fields: [field('introduction', 'Opening', documentKinds.blocks, privacyNotice.introduction)],
  lists: [list('sections', 'Sections', sectionColumns, privacyNotice.sections)]
};

/** @param {Record<string, any>} values */
export function privacyFrom(values) {
  return {
    path: privacyNotice.path,
    version: privacyNotice.version,
    lastUpdated: values.updatedOn || privacyNotice.lastUpdated,
    introduction: values.introduction,
    sections: values.sections
  };
}
