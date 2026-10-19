import { fieldKinds } from './limits.js';

export const servicesTable = 'services';
export const accreditationsTable = 'accreditations';

export const serviceFields = {
  title: { label: 'Title', kind: fieldKinds.line, isRequired: true },
  summary: { label: 'Summary (home page and top of the section)', kind: fieldKinds.paragraph, isRequired: true },
  detail: { label: 'Detail', kind: fieldKinds.paragraph, isRequired: true },
  points: { label: 'Points, one per line', kind: fieldKinds.paragraph, isRequired: false },
  cta_label: { label: 'Button text (optional)', kind: fieldKinds.line, isRequired: false },
  cta_href: { label: 'Button link (optional)', kind: fieldKinds.link, isRequired: false }
};

export const accreditationFields = {
  name: { label: 'Name', kind: fieldKinds.line, isRequired: true },
  role: { label: 'What it certifies', kind: fieldKinds.line, isRequired: false },
  href: { label: 'Link', kind: fieldKinds.link, isRequired: true }
};
