import { signOffs, replacementFactors } from '$lib/booking/approvals.js';
import { faqGroups } from '$lib/booking/faq.js';
import { assurances, processSteps } from '$lib/booking/process.js';
import { heroIntro, highlights, survey } from '$lib/booking/survey.js';
import { documentKinds } from './kinds.js';
import { column, field, list } from './parts.js';

const [bookingQuestions, processQuestions] = faqGroups;
const stepColumns = [column('title', 'Heading', documentKinds.line), column('body', 'Text', documentKinds.paragraph)];
const questionColumns = [column('question', 'Question', documentKinds.line), column('answer', 'Answer', documentKinds.paragraph)];

/** @type {import('./parts.js').SiteDocument} */
export const bookingDocument = {
  key: 'booking',
  label: 'Booking page',
  path: '/book',
  blurb: 'The price wording, the opening text, the highlights, how it works, the sign-offs, what affects a replacement quote and the questions. The Stripe payment link stays as it is.',
  isDated: false,
  fields: [
    field('price', 'Price', documentKinds.line, survey.price),
    field('priceWithVat', 'Price including VAT', documentKinds.line, survey.priceWithVat),
    field('heroIntro', 'Opening text', documentKinds.paragraph, heroIntro),
    field('highlights', 'Highlights under the opening text', documentKinds.lines, highlights),
    field('signOffs', 'Approvals: who signs off', documentKinds.lines, signOffs),
    field('replacementFactors', 'What can affect a replacement quote', documentKinds.lines, replacementFactors)
  ],
  lists: [
    list('processSteps', 'How it works: steps', stepColumns, processSteps),
    list('assurances', 'How it works: assurances', stepColumns, assurances),
    list('bookingQuestions', `Questions: ${bookingQuestions.title}`, questionColumns, bookingQuestions.questions),
    list('processQuestions', `Questions: ${processQuestions.title}`, questionColumns, processQuestions.questions)
  ]
};

/** @param {Record<string, any>} values */
export function bookingFrom(values) {
  return {
    price: values.price,
    priceWithVat: values.priceWithVat,
    heroIntro: values.heroIntro,
    highlights: values.highlights,
    signOffs: values.signOffs,
    replacementFactors: values.replacementFactors,
    processSteps: values.processSteps,
    assurances: values.assurances,
    faqGroups: [
      { title: bookingQuestions.title, questions: values.bookingQuestions },
      { title: processQuestions.title, questions: values.processQuestions }
    ]
  };
}
