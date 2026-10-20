import { accreditationsTable, servicesTable } from '$lib/content/listFields.js';
import { enquiryStatus } from '$lib/enquiries/enquiryFields.js';
import { isDatabaseConfigured } from '$lib/server/database/connection.js';
import { countRows } from '$lib/server/database/rows.js';
import { recentEnquiries } from '$lib/server/enquiries/enquiryInbox.js';
import { enquiriesTable } from '$lib/server/enquiries/submitEnquiry.js';
import { siteDocumentsTable } from '$lib/server/content/documentStore.js';

const recentCount = 4;

/**
 * @param {string} table
 * @param {string} filter
 */
function countOrNothing(table, filter = '') {
  return countRows(table, filter).catch(() => null);
}

export async function load() {
  if (!isDatabaseConfigured()) return { counts: null, recent: [] };
  const [enquiries, services, accreditations, pagesEdited, documentsEdited, recent] = await Promise.all([
    countOrNothing(enquiriesTable, `status=neq.${enquiryStatus.archived}`),
    countOrNothing(servicesTable),
    countOrNothing(accreditationsTable),
    countOrNothing('page_content'),
    countOrNothing(siteDocumentsTable),
    recentEnquiries(recentCount)
  ]);
  return { counts: { enquiries, services, accreditations, pagesEdited, documentsEdited }, recent };
}
