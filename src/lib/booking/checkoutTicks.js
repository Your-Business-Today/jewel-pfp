import { survey } from './survey.js';

/**
 * What the client ticks before the Pay button opens, sent to the Stripe Payment Link as its client_reference_id and read
 * back by the portal from the paid checkout (DoorSurveyCheckoutTicks in jewel-pfp-portal). Stripe takes only letters,
 * digits, dashes and underscores there, so each tick is a word and the words are joined by underscores.
 */
export const checkoutTicks = [
  {
    word: 'terms-read',
    label: 'I have read the terms and the cancellation form.'
  },
  {
    word: 'early-start',
    label:
      'I ask Jewel PFP to carry out my survey within the 14-day cancellation period. I understand I lose my right to cancel the survey once the visit has taken place.'
  }
];

const tickSeparator = '_';

/** @param {string[]} tickedWords */
export function paymentLinkFor(tickedWords) {
  const clientReference = tickedWords.join(tickSeparator);
  return `${survey.paymentLink}?client_reference_id=${encodeURIComponent(clientReference)}`;
}
