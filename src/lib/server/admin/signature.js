const encoder = new TextEncoder();

/** @param {ArrayBuffer} bytes */
function base64Url(bytes) {
  const characters = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(characters).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * @param {string} payload
 * @param {string} secret
 */
export async function sign(payload, secret) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign'
  ]);
  return base64Url(await crypto.subtle.sign('HMAC', key, encoder.encode(payload)));
}

/**
 * @param {string} first
 * @param {string} second
 */
export function isSameInConstantTime(first, second) {
  const firstBytes = encoder.encode(first);
  const secondBytes = encoder.encode(second);
  const length = Math.max(firstBytes.length, secondBytes.length);
  let difference = firstBytes.length ^ secondBytes.length;
  for (let i = 0; i < length; i++) difference |= (firstBytes[i] ?? 0) ^ (secondBytes[i] ?? 0);
  return difference === 0;
}
