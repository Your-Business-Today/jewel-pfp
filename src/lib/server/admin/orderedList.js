import { isDatabaseConfigured } from '$lib/server/database/connection.js';
import { selectRows } from '$lib/server/database/rows.js';
import { deleteRow, insertRowReturningIt, insertRows, updateRow } from '$lib/server/database/rowWrites.js';

/** @typedef {{ id: string, visible: boolean, sort_order: number } & Record<string, any>} OrderedRow */

const sortGap = 10;
const missingTableHint = 'Run supabase/migrations/20261019120000_admin_section.sql in the Supabase SQL editor.';

/** @param {string} table */
export async function readOrderedList(table) {
  if (!isDatabaseConfigured()) return { rows: [], isConfigured: false, problem: '' };
  try {
    /** @type {OrderedRow[]} */
    const rows = await selectRows(table, 'select=*&order=sort_order.asc');
    return { rows, isConfigured: true, problem: '' };
  } catch (error) {
    console.error(`Admin: could not read ${table}`, error);
    return { rows: [], isConfigured: true, problem: `The ${table} table could not be read. ${missingTableHint}` };
  }
}

/**
 * @param {string} table
 * @param {OrderedRow[]} rows
 */
async function saveOrder(table, rows) {
  await Promise.all(rows.map((row, position) => updateRow(table, row.id, { sort_order: (position + 1) * sortGap })));
}

/**
 * @param {string} table
 * @param {string} id
 * @param {number} step
 */
export async function moveRow(table, id, step) {
  const { rows } = await readOrderedList(table);
  const from = rows.findIndex((row) => row.id === id);
  const to = from + step;
  const isOutOfRange = from < 0 || to < 0 || to >= rows.length;
  if (isOutOfRange) return;
  [rows[from], rows[to]] = [rows[to], rows[from]];
  await saveOrder(table, rows);
}

/**
 * @param {string} table
 * @param {string} id
 * @param {boolean} isVisible
 */
export function setRowVisible(table, id, isVisible) {
  return updateRow(table, id, { visible: isVisible });
}

/**
 * @param {string} table
 * @param {string} id
 */
export function removeRow(table, id) {
  return deleteRow(table, id);
}

/**
 * @param {string} table
 * @param {Record<string, unknown>[]} rows
 */
export function insertInOrder(table, rows) {
  const ordered = rows.map((row, position) => ({ ...row, visible: true, sort_order: (position + 1) * sortGap }));
  return insertRows(table, ordered);
}

/**
 * @param {string} table
 * @param {Record<string, unknown>} row
 */
export async function appendRow(table, row) {
  const { rows } = await readOrderedList(table);
  const lastOrder = rows.at(-1)?.sort_order ?? 0;
  return insertRowReturningIt(table, { ...row, visible: true, sort_order: lastOrder + sortGap });
}
