import { line, paragraph, searchFields } from './fields.js';
import { homeCaptions, homeSteps } from './homeDefaults.js';

const captionFields = homeCaptions.flatMap((caption, i) => [
  line(`caption${i + 1}Label`, `Door caption ${i + 1}: label`, caption.label),
  line(`caption${i + 1}Title`, `Door caption ${i + 1}: heading`, caption.title),
  paragraph(`caption${i + 1}Body`, `Door caption ${i + 1}: text`, caption.body)
]);

const stepFields = homeSteps.flatMap((step, i) => [
  line(`step${i + 1}Title`, `How we work, step ${i + 1}: heading`, step.title),
  paragraph(`step${i + 1}Body`, `How we work, step ${i + 1}: text`, step.body)
]);

/** @type {import('./fields.js').ContentPage} */
export const homePage = {
  key: 'home',
  label: 'Home page',
  path: '/',
  blurb: 'The opening headline, the door captions, how we work, accreditation and the closing call to action.',
  fields: [
    ...searchFields(
      'Jewel Passive Fire Protection | Fire Doors & Firestopping, London & South East',
      'Third-party accredited fire door surveying, remediation, installation and firestopping across Epsom, London and the South East. Evidence for every asset.'
    ),
    line('heroKicker', 'Opening: small heading', 'Passive Fire Protection — London & South East'),
    line('heroHeading', 'Opening: headline', 'The fire protection you never see has to be right.'),
    paragraph(
      'heroIntro',
      'Opening: text',
      'Jewel surveys, remediates, installs and certifies fire doors and firestopping — third-party accredited at every stage, with digital evidence for every asset.'
    ),
    ...captionFields,
    line('servicesKicker', 'Services: small heading', '01 / What we do'),
    paragraph('servicesHeading', 'Services: heading', 'Six services.\nOne standard.'),
    line('processKicker', 'How we work: small heading', '02 / How we work'),
    line('processHeading', 'How we work: heading', 'Surveyed, fixed, and proven — asset by asset.'),
    ...stepFields,
    line('accreditationKicker', 'Accreditation: small heading', '03 / Accreditation'),
    line('accreditationHeading', 'Accreditation: heading', "Don't take our word for it. That's the point."),
    paragraph(
      'accreditationIntro',
      'Accreditation: text',
      'Passive fire protection lives or dies on verification. Our work is certificated by independent third parties — in fire door surveying, remediation, installation and firestopping.'
    ),
    line('ctaHeading', 'Closing call to action: heading', 'Start with a survey.'),
    paragraph('ctaIntro', 'Closing call to action: text', "Tell us about the building and we'll tell you exactly where it stands.")
  ]
};
