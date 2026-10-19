import { enquiryStatus } from '$lib/enquiries/enquiryFields.js';
import { isDatabaseConfigured } from '$lib/server/database/connection.js';
import { countRows } from '$lib/server/database/rows.js';
import { enquiriesTable } from '$lib/server/enquiries/submitEnquiry.js';

async function unreadEnquiries() {
  try {
    return await countRows(enquiriesTable, `status=eq.${enquiryStatus.unread}`);
  } catch {
    return 0;
  }
}

export async function load() {
  const isConfigured = isDatabaseConfigured();
  return { isDatabaseConfigured: isConfigured, unreadEnquiries: isConfigured ? await unreadEnquiries() : 0 };
}
