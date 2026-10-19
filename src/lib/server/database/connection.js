import { env } from '$env/dynamic/private';

const trailingSlashes = /\/+$/;

function databaseAddress() {
  return (env.SUPABASE_URL ?? '').trim().replace(trailingSlashes, '');
}

function serviceKey() {
  return (env.SUPABASE_SERVICE_ROLE_KEY ?? '').trim();
}

export function isDatabaseConfigured() {
  return Boolean(databaseAddress() && serviceKey());
}

/** @param {Record<string, string>} extraHeaders */
export function requestHeaders(extraHeaders = {}) {
  const key = serviceKey();
  return { apikey: key, Authorization: `Bearer ${key}`, ...extraHeaders };
}

/** @param {string} path */
export function tableAddress(path) {
  return `${databaseAddress()}/rest/v1/${path}`;
}

const errorExcerptLength = 300;

/**
 * @param {Response} response
 * @param {string} operation
 */
export async function ensureSucceeded(response, operation) {
  if (response.ok) return response;
  const body = await response.text().catch(() => '');
  throw new Error(`Supabase ${operation} failed (${response.status}): ${body.slice(0, errorExcerptLength)}`);
}
