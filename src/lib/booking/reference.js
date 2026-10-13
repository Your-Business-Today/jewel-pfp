import { survey } from './survey.js';

const checkoutSessionPrefix = /^cs_(test_|live_)?/;
const referenceLength = 10;

/** @param {string | null} sessionId */
export function bookingReference(sessionId) {
  if (!sessionId) return null;
  const sessionCode = sessionId.replace(checkoutSessionPrefix, '').slice(0, referenceLength);
  return `JPFP-${sessionCode.toUpperCase()}`;
}

/** @param {string | null} sessionId */
export function bookingPageLink(sessionId) {
  if (!sessionId) return null;
  return `${survey.bookingPage}?session_id=${encodeURIComponent(sessionId)}`;
}
