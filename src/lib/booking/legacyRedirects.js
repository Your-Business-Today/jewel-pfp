import { site } from '$lib/services.js';

export const legacyBookingHost = 'book.jewelpfp.co.uk';

/** @type {Record<string, string>} */
const legacyPaths = {
  '/thank-you.html': '/book/thank-you',
  '/thank-you': '/book/thank-you',
  '/validation-survey-terms.html': '/book/terms',
  '/validation-survey-terms': '/book/terms'
};

const bookingPath = '/book';

/** @param {URL} legacyUrl */
export function bookingAddressFor(legacyUrl) {
  const path = legacyPaths[legacyUrl.pathname] ?? bookingPath;
  return `${site.url}${path}${legacyUrl.search}`;
}
