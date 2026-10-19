import { contact } from '$lib/services.js';

/** @param {Record<string, string>} details */
export function contactFrom(details) {
  return {
    email: details.email,
    phone: details.phone,
    mobile: details.mobile,
    booking: contact.booking,
    area: details.area,
    footerBlurb: details.footerBlurb,
    socials: [
      { name: 'Instagram', href: details.instagram },
      { name: 'LinkedIn', href: details.linkedin },
      { name: 'Facebook', href: details.facebook }
    ]
  };
}

/** @param {Record<string, string>} details */
export function companyFrom(details) {
  return {
    name: details.companyName,
    address: details.companyAddress,
    companyNumber: details.companyNumber,
    vatNumber: details.vatNumber
  };
}
