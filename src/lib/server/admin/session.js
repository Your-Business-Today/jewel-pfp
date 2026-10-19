import { dev } from '$app/environment';
import { sessionSecret } from './credentials.js';
import { isSameInConstantTime, sign } from './signature.js';

export const sessionCookie = 'jpfp_admin';

const sessionHours = 8;
const secondsPerHour = 3600;
const millisecondsPerSecond = 1000;
const sessionSeconds = sessionHours * secondsPerHour;
const expiryDigits = /^\d+$/;

export async function createSessionToken() {
  const expiresAt = String(Date.now() + sessionSeconds * millisecondsPerSecond);
  return `${expiresAt}.${await sign(expiresAt, sessionSecret())}`;
}

/** @param {string | undefined} token */
export async function isSessionValid(token) {
  const secret = sessionSecret();
  if (!token || !secret) return false;
  const [expiresAt, signature] = token.split('.');
  if (!expiresAt || !signature) return false;
  const hasExpired = !expiryDigits.test(expiresAt) || Number(expiresAt) < Date.now();
  if (hasExpired) return false;
  return isSameInConstantTime(await sign(expiresAt, secret), signature);
}

/**
 * @param {import('@sveltejs/kit').Cookies} cookies
 * @param {string} token
 */
export function startSession(cookies, token) {
  cookies.set(sessionCookie, token, { path: '/', httpOnly: true, sameSite: 'lax', secure: !dev, maxAge: sessionSeconds });
}

/** @param {import('@sveltejs/kit').Cookies} cookies */
export function endSession(cookies) {
  cookies.delete(sessionCookie, { path: '/' });
}
