import { bookingDocument } from './booking.js';
import { privacyDocument } from './privacy.js';
import { termsDocument } from './terms.js';

export const siteDocuments = [bookingDocument, termsDocument, privacyDocument];

/** @param {string} key */
export function findSiteDocument(key) {
  return siteDocuments.find((siteDocument) => siteDocument.key === key);
}
