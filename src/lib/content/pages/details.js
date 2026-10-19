import { company, contact } from '$lib/services.js';
import { line, link, paragraph } from './fields.js';

const socialLink = Object.fromEntries(contact.socials.map((social) => [social.name, social.href]));

/** @type {import('./fields.js').ContentPage} */
export const detailsPage = {
  key: 'details',
  label: 'Contact and company details',
  path: null,
  blurb: 'Email, phone numbers, area, social links and company details, used in the header, footer and every page that shows them.',
  fields: [
    line('email', 'Email', contact.email),
    line('phone', 'Phone', contact.phone),
    line('mobile', 'Office / mobile', contact.mobile),
    line('area', 'Area covered', contact.area),
    link('instagram', 'Instagram link', socialLink.Instagram),
    link('linkedin', 'LinkedIn link', socialLink.LinkedIn),
    link('facebook', 'Facebook link', socialLink.Facebook),
    line('companyName', 'Registered company name', company.name),
    line('companyAddress', 'Registered address', company.address),
    line('companyNumber', 'Company number', company.companyNumber),
    line('vatNumber', 'VAT number', company.vatNumber),
    paragraph(
      'footerBlurb',
      'Footer text',
      'Jewel Passive Fire Protection Ltd. Fire door surveying, remediation, installation and firestopping across London and the South East.'
    )
  ]
};
