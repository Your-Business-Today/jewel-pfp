import { bookingDocument, bookingFrom } from '$lib/content/documents/booking.js';
import { loadDocumentValues } from '$lib/server/content/documentStore.js';

export async function load() {
  return { booking: bookingFrom(await loadDocumentValues(bookingDocument)) };
}
