import { contactPage } from './contact.js';
import { detailsPage } from './details.js';
import { homePage } from './home.js';
import { servicesPage } from './services.js';

export const contentPages = [homePage, servicesPage, contactPage, detailsPage];

/** @param {string} key */
export function findContentPage(key) {
  return contentPages.find((page) => page.key === key);
}
