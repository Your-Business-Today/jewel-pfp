import { keyFacts } from './keyFacts.js';
import { aboutTheseTerms, ourServices, bookingAndFee } from './booking.js';
import { rightToCancel, quotes } from './cancelling.js';
import { priceAndPayment, accessAndYourHome } from './payment.js';
import { surveyLimits, worksAndSafety } from './surveyAndWorks.js';
import { guarantee, lossOrDamage, yourInformation } from './rights.js';
import { complaints, general, cancellationForm } from './general.js';

export const consumerTerms = {
  title: 'JewelPFP Consumer Terms & Conditions',
  subtitle: 'Apartment Door Survey and Works',
  issue: '1.0',
  issuedOn: '22 October 2026',
  sections: [
    keyFacts,
    aboutTheseTerms,
    ourServices,
    bookingAndFee,
    rightToCancel,
    quotes,
    priceAndPayment,
    accessAndYourHome,
    surveyLimits,
    worksAndSafety,
    guarantee,
    lossOrDamage,
    yourInformation,
    complaints,
    general,
    cancellationForm
  ]
};
