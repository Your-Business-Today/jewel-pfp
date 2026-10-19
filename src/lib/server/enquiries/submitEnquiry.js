import { enquiryStatus } from '$lib/enquiries/enquiryFields.js';
import { isDatabaseConfigured } from '$lib/server/database/connection.js';
import { insertRows } from '$lib/server/database/rowWrites.js';
import { isEmailConfigured, sendEnquiryEmail } from './enquiryEmail.js';

export const enquiriesTable = 'enquiries';

/** @param {Record<string, string>} enquiry */
async function saveEnquiry(enquiry) {
  if (!isDatabaseConfigured()) return false;
  try {
    await insertRows(enquiriesTable, { ...enquiry, status: enquiryStatus.unread });
    return true;
  } catch (error) {
    console.error('Enquiry could not be saved', error);
    return false;
  }
}

/** @param {Record<string, string>} enquiry */
async function emailEnquiry(enquiry) {
  if (!isEmailConfigured()) return false;
  try {
    await sendEnquiryEmail(enquiry);
    return true;
  } catch (error) {
    console.error('Enquiry email could not be sent', error);
    return false;
  }
}

/** @param {Record<string, string>} enquiry */
export async function submitEnquiry(enquiry) {
  const isReceivable = isDatabaseConfigured() || isEmailConfigured();
  const [wasSaved, wasEmailed] = await Promise.all([saveEnquiry(enquiry), emailEnquiry(enquiry)]);
  return { isReceivable, wasReceived: wasSaved || wasEmailed };
}
