import { ensureSucceeded, requestHeaders, tableAddress } from './connection.js';

const jsonHeaders = { 'Content-Type': 'application/json' };

/** @param {string} id */
function byId(id) {
  return `id=eq.${encodeURIComponent(id)}`;
}

/**
 * @param {string} table
 * @param {Record<string, unknown> | Record<string, unknown>[]} rows
 * @param {string} preference
 */
async function postRows(table, rows, preference) {
  const response = await fetch(tableAddress(table), {
    method: 'POST',
    headers: requestHeaders({ ...jsonHeaders, Prefer: preference }),
    body: JSON.stringify(rows)
  });
  return ensureSucceeded(response, `insert ${table}`);
}

/**
 * @param {string} table
 * @param {Record<string, unknown> | Record<string, unknown>[]} rows
 */
export async function insertRows(table, rows) {
  await postRows(table, rows, 'return=minimal');
}

/**
 * @param {string} table
 * @param {Record<string, unknown>} row
 */
export async function insertRowReturningIt(table, row) {
  const response = await postRows(table, row, 'return=representation');
  const [inserted] = await response.json();
  return inserted;
}

/**
 * @param {string} table
 * @param {string} id
 * @param {Record<string, unknown>} changes
 */
export async function updateRow(table, id, changes) {
  const response = await fetch(tableAddress(`${table}?${byId(id)}`), {
    method: 'PATCH',
    headers: requestHeaders(jsonHeaders),
    body: JSON.stringify(changes)
  });
  await ensureSucceeded(response, `update ${table}`);
}

/**
 * @param {string} table
 * @param {Record<string, unknown>} row
 * @param {string} uniqueColumn
 */
export async function upsertRow(table, row, uniqueColumn) {
  const response = await fetch(tableAddress(`${table}?on_conflict=${uniqueColumn}`), {
    method: 'POST',
    headers: requestHeaders({ ...jsonHeaders, Prefer: 'resolution=merge-duplicates,return=minimal' }),
    body: JSON.stringify(row)
  });
  await ensureSucceeded(response, `upsert ${table}`);
}

/**
 * @param {string} table
 * @param {string} filter
 */
export async function deleteRowsWhere(table, filter) {
  if (!filter) throw new Error(`Refusing to delete every row of ${table}`);
  const response = await fetch(tableAddress(`${table}?${filter}`), { method: 'DELETE', headers: requestHeaders() });
  await ensureSucceeded(response, `delete ${table}`);
}

/**
 * @param {string} table
 * @param {string} id
 */
export function deleteRow(table, id) {
  return deleteRowsWhere(table, byId(id));
}
