import { termsDocument, termsFrom } from '$lib/content/documents/terms.js';
import { loadDocumentValues } from '$lib/server/content/documentStore.js';

export async function load() {
  return { terms: termsFrom(await loadDocumentValues(termsDocument)) };
}
