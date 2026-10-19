import { findContentPage } from './pages/index.js';

/** @typedef {Record<string, Record<string, string>>} TextOverrides */

/**
 * @param {TextOverrides} overrides
 * @param {string} pageKey
 * @returns {Record<string, string>}
 */
export function pageText(overrides, pageKey) {
  const page = findContentPage(pageKey);
  const saved = overrides[pageKey] ?? {};
  const fields = page?.fields ?? [];
  return Object.fromEntries(fields.map((field) => [field.key, saved[field.key] || field.default]));
}
