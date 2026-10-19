import { ensureSucceeded, requestHeaders, tableAddress } from './connection.js';

/**
 * @param {string} table
 * @param {string} query
 */
export async function selectRows(table, query = '') {
  const response = await fetch(tableAddress(`${table}?${query}`), { headers: requestHeaders() });
  await ensureSucceeded(response, `select ${table}`);
  return response.json();
}

/**
 * @param {string} table
 * @param {string} query
 */
export async function countRows(table, query = '') {
  const filter = query ? `${query}&` : '';
  const response = await fetch(tableAddress(`${table}?${filter}select=id&limit=1`), {
    method: 'HEAD',
    headers: requestHeaders({ Prefer: 'count=exact' })
  });
  await ensureSucceeded(response, `count ${table}`);
  const contentRange = response.headers.get('content-range') ?? '';
  const total = Number(contentRange.split('/')[1]);
  return Number.isFinite(total) ? total : 0;
}
