import { selectRows } from '$lib/server/database/rows.js';
import { deleteRowsWhere, upsertRow } from '$lib/server/database/rowWrites.js';
import { pageContentTable } from './textOverrides.js';

/** @param {string} pageKey */
function forPage(pageKey) {
  return `page=eq.${encodeURIComponent(pageKey)}`;
}

/** @param {string} pageKey */
export async function readSavedText(pageKey) {
  /** @type {{ content: Record<string, string> }[]} */
  const rows = await selectRows(pageContentTable, `select=content&${forPage(pageKey)}`);
  const [savedRow] = rows;
  return savedRow?.content ?? {};
}

/**
 * @param {string} pageKey
 * @param {Record<string, string>} changedText
 */
export function saveText(pageKey, changedText) {
  const hasChanges = Object.keys(changedText).length > 0;
  if (!hasChanges) return deleteRowsWhere(pageContentTable, forPage(pageKey));
  return upsertRow(pageContentTable, { page: pageKey, content: changedText, updated_at: new Date().toISOString() }, 'page');
}
