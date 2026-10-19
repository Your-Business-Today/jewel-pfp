import { fieldKinds } from '../limits.js';

/**
 * @typedef {{ key: string, label: string, kind: string, default: string }} ContentField
 * @typedef {{ key: string, label: string, path: string | null, blurb: string, fields: ContentField[] }} ContentPage
 */

/**
 * @param {string} key
 * @param {string} label
 * @param {string} defaultText
 * @returns {ContentField}
 */
export function line(key, label, defaultText) {
  return { key, label, kind: fieldKinds.line, default: defaultText };
}

/**
 * @param {string} key
 * @param {string} label
 * @param {string} defaultText
 * @returns {ContentField}
 */
export function paragraph(key, label, defaultText) {
  return { key, label, kind: fieldKinds.paragraph, default: defaultText };
}

/**
 * @param {string} key
 * @param {string} label
 * @param {string} defaultText
 * @returns {ContentField}
 */
export function link(key, label, defaultText) {
  return { key, label, kind: fieldKinds.link, default: defaultText };
}

/**
 * @param {string} title
 * @param {string} description
 */
export function searchFields(title, description) {
  return [line('seoTitle', 'Browser tab and Google title', title), paragraph('seoDescription', 'Google description', description)];
}
