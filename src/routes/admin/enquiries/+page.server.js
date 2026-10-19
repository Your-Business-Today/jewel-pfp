import { fail } from '@sveltejs/kit';
import { enquiryStatus } from '$lib/enquiries/enquiryFields.js';
import { deleteRow, updateRow } from '$lib/server/database/rowWrites.js';
import { pageNumberFrom, readInbox, viewFrom } from '$lib/server/enquiries/enquiryInbox.js';
import { enquiriesTable } from '$lib/server/enquiries/submitEnquiry.js';
import { formText } from '$lib/server/validation/formText.js';

const badRequest = 400;
const serverError = 500;

export async function load({ url }) {
  const { searchParams } = url;
  const view = viewFrom(searchParams.get('view'));
  return { view, ...(await readInbox(view, pageNumberFrom(searchParams.get('page')))) };
}

/**
 * @param {(id: string) => Promise<void>} change
 * @returns {import('@sveltejs/kit').Action}
 */
function forEnquiry(change) {
  return async ({ request }) => {
    const id = formText(await request.formData(), 'id');
    if (!id) return fail(badRequest, { problem: 'Which enquiry was meant is missing.' });
    try {
      await change(id);
    } catch (error) {
      console.error('Admin: could not change an enquiry', error);
      return fail(serverError, { problem: 'The enquiry could not be updated. Please try again.' });
    }
    return { isSaved: true };
  };
}

/** @param {string} status */
function setStatus(status) {
  return forEnquiry((id) => updateRow(enquiriesTable, id, { status }));
}

export const actions = {
  markRead: setStatus(enquiryStatus.read),
  markUnread: setStatus(enquiryStatus.unread),
  archive: setStatus(enquiryStatus.archived),
  restore: setStatus(enquiryStatus.read),
  remove: forEnquiry((id) => deleteRow(enquiriesTable, id))
};
