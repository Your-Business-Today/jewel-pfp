import { isDatabaseConfigured } from '$lib/server/database/connection.js';
import { selectRows } from '$lib/server/database/rows.js';
import { deleteRowsWhere, upsertRow } from '$lib/server/database/rowWrites.js';
import { documentValues } from '$lib/content/documents/parts.js';

export const siteDocumentsTable = 'site_documents';

/** @param {string} documentKey */
function forDocument(documentKey) {
  return `document=eq.${encodeURIComponent(documentKey)}`;
}

/** @param {string} documentKey @returns {Promise<Record<string, any>>} */
export async function readSavedDocument(documentKey) {
  /** @type {{ content: Record<string, any> }[]} */
  const rows = await selectRows(siteDocumentsTable, `select=content&${forDocument(documentKey)}`);
  const [savedRow] = rows;
  return savedRow?.content ?? {};
}

/**
 * @param {string} documentKey
 * @param {Record<string, any>} values
 */
export function saveDocument(documentKey, values) {
  const row = { document: documentKey, content: values, updated_at: new Date().toISOString() };
  return upsertRow(siteDocumentsTable, row, 'document');
}

/** @param {string} documentKey */
export function forgetSavedDocument(documentKey) {
  return deleteRowsWhere(siteDocumentsTable, forDocument(documentKey));
}

/** @param {import('$lib/content/documents/parts.js').SiteDocument} siteDocument */
export async function loadDocumentValues(siteDocument) {
  if (!isDatabaseConfigured()) return documentValues(siteDocument, {});
  try {
    return documentValues(siteDocument, await readSavedDocument(siteDocument.key));
  } catch (error) {
    console.error(`Website content: could not read the ${siteDocument.key} document`, error);
    return documentValues(siteDocument, {});
  }
}
