import { enquiryStatus } from '$lib/enquiries/enquiryFields.js';
import { isDatabaseConfigured } from '$lib/server/database/connection.js';
import { countRows, selectRows } from '$lib/server/database/rows.js';
import { enquiriesTable } from './submitEnquiry.js';

export const pageSize = 20;
export const archivedView = 'archived';

const filters = {
  inbox: `status=neq.${enquiryStatus.archived}`,
  archived: `status=eq.${enquiryStatus.archived}`
};

/** @param {string | null} requested */
export function viewFrom(requested) {
  return requested === archivedView ? archivedView : 'inbox';
}

/** @param {string | null} requested */
export function pageNumberFrom(requested) {
  const pageNumber = Number(requested);
  return Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
}

/**
 * @param {string} view
 * @param {number} pageNumber
 */
export async function readInbox(view, pageNumber) {
  const empty = { enquiries: [], total: 0, pageCount: 1, pageNumber: 1, problem: '' };
  if (!isDatabaseConfigured()) return empty;
  const filter = view === archivedView ? filters.archived : filters.inbox;
  try {
    const total = await countRows(enquiriesTable, filter);
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const shownPage = Math.min(pageNumber, pageCount);
    const offset = (shownPage - 1) * pageSize;
    const enquiries = await selectRows(enquiriesTable, `select=*&${filter}&order=created_at.desc&limit=${pageSize}&offset=${offset}`);
    return { enquiries, total, pageCount, pageNumber: shownPage, problem: '' };
  } catch (error) {
    console.error('Admin: could not read enquiries', error);
    return { ...empty, problem: 'Enquiries could not be read. Check the migration has been run in Supabase.' };
  }
}

/** @param {number} count */
export function recentEnquiries(count) {
  return selectRows(enquiriesTable, `select=*&${filters.inbox}&order=created_at.desc&limit=${count}`).catch(() => []);
}
