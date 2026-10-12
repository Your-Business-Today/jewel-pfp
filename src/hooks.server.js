import { redirect } from '@sveltejs/kit';
import { legacyBookingHost, bookingAddressFor } from '$lib/booking/legacyRedirects.js';

const movedPermanently = 301;

export async function handle({ event, resolve }) {
  const isLegacyBookingSite = event.url.hostname === legacyBookingHost;
  if (isLegacyBookingSite) redirect(movedPermanently, bookingAddressFor(event.url));
  return resolve(event);
}
