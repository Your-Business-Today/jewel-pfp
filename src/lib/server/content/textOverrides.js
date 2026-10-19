import { isDatabaseConfigured } from '$lib/server/database/connection.js';
import { selectRows } from '$lib/server/database/rows.js';

export const pageContentTable = 'page_content';

/** @returns {Promise<import('$lib/content/pageText.js').TextOverrides>} */
export async function readTextOverrides() {
  if (!isDatabaseConfigured()) return {};
  try {
    /** @type {{ page: string, content: Record<string, string> }[]} */
    const rows = await selectRows(pageContentTable, 'select=page,content');
    return Object.fromEntries(rows.map((row) => [row.page, row.content ?? {}]));
  } catch (error) {
    console.error('Website content: could not read page text', error);
    return {};
  }
}
