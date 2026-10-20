import { privacyDocument, privacyFrom } from '$lib/content/documents/privacy.js';
import { loadDocumentValues } from '$lib/server/content/documentStore.js';

export async function load() {
  return { notice: privacyFrom(await loadDocumentValues(privacyDocument)) };
}
