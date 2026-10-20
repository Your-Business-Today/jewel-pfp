/**
 * @typedef {{ key: string, label: string, kind: string, isRequired: boolean }} DocumentColumn
 * @typedef {{ key: string, label: string, kind: string, default: any }} DocumentField
 * @typedef {{ key: string, label: string, columns: DocumentColumn[], default: Record<string, any>[] }} DocumentList
 * @typedef {{ key: string, label: string, path: string, blurb: string, isDated: boolean, fields: DocumentField[], lists: DocumentList[] }} SiteDocument
 */

/**
 * @param {string} key
 * @param {string} label
 * @param {string} kind
 * @param {any} defaultValue
 * @returns {DocumentField}
 */
export function field(key, label, kind, defaultValue) {
  return { key, label, kind, default: defaultValue };
}

/**
 * @param {string} key
 * @param {string} label
 * @param {string} kind
 * @param {boolean} isRequired
 * @returns {DocumentColumn}
 */
export function column(key, label, kind, isRequired = true) {
  return { key, label, kind, isRequired };
}

/**
 * @param {string} key
 * @param {string} label
 * @param {DocumentColumn[]} columns
 * @param {Record<string, any>[]} defaultRows
 * @returns {DocumentList}
 */
export function list(key, label, columns, defaultRows) {
  return { key, label, columns, default: defaultRows };
}

/**
 * @param {SiteDocument} siteDocument
 * @param {Record<string, any>} saved
 * @returns {Record<string, any>}
 */
export function documentValues(siteDocument, saved) {
  const parts = [...siteDocument.fields, ...siteDocument.lists];
  const values = Object.fromEntries(parts.map((part) => [part.key, saved[part.key] ?? part.default]));
  return { ...values, updatedOn: saved.updatedOn ?? '' };
}
