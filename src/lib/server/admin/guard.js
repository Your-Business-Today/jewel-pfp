import { building } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import { isSessionValid, sessionCookie } from './session.js';

const adminPrefix = '/admin';
const loginPath = '/admin/login';
const seeOther = 303;

const adminHeaders = {
  'Cache-Control': 'no-store',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'same-origin',
  'X-Robots-Tag': 'noindex, nofollow'
};

/** @param {Response} response */
function withAdminHeaders(response) {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(adminHeaders)) headers.set(name, value);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

/** @type {import('@sveltejs/kit').Handle} */
export async function guardAdmin({ event, resolve }) {
  const { pathname } = event.url;
  const isAdminPath = pathname.startsWith(adminPrefix);
  if (building || !isAdminPath) return resolve(event);
  const isSignedIn = await isSessionValid(event.cookies.get(sessionCookie));
  const isLoginPage = pathname === loginPath;
  if (isLoginPage && isSignedIn && event.request.method === 'GET') redirect(seeOther, adminPrefix);
  if (!isLoginPage && !isSignedIn) redirect(seeOther, loginPath);
  return withAdminHeaders(await resolve(event));
}
