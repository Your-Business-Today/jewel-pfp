import { redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { legacyBookingHost, bookingAddressFor } from '$lib/booking/legacyRedirects.js';
import { guardAdmin } from '$lib/server/admin/guard.js';

const movedPermanently = 301;

/** @type {import('@sveltejs/kit').Handle} */
async function redirectLegacyBookingSite({ event, resolve }) {
  const isLegacyBookingSite = event.url.hostname === legacyBookingHost;
  if (isLegacyBookingSite) redirect(movedPermanently, bookingAddressFor(event.url));
  return resolve(event);
}

export const handle = sequence(redirectLegacyBookingSite, guardAdmin);
