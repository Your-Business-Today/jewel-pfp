import { error, fail } from '@sveltejs/kit';
import { findSiteDocument } from '$lib/content/documents/index.js';
import { isDatabaseConfigured } from '$lib/server/database/connection.js';
import { forgetSavedDocument, readSavedDocument, saveDocument } from '$lib/server/content/documentStore.js';
import { documentFromForm } from '$lib/server/validation/documentForm.js';

const notFound = 404;
const badRequest = 400;
const serverError = 500;
const saveFailed = 'The wording could not be saved. Check Supabase is connected and the migrations have been run.';
const ukDate = { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/London' };

/** @param {string} key */
function siteDocumentOrNotFound(key) {
  const siteDocument = findSiteDocument(key);
  if (!siteDocument) error(notFound, 'There is no document by that name.');
  return siteDocument;
}

function todayInWords() {
  return new Date().toLocaleDateString('en-GB', /** @type {Intl.DateTimeFormatOptions} */ (ukDate));
}

export async function load({ params }) {
  const siteDocument = siteDocumentOrNotFound(params.document);
  if (!isDatabaseConfigured()) return { siteDocument, saved: {}, problem: '' };
  try {
    return { siteDocument, saved: await readSavedDocument(siteDocument.key), problem: '' };
  } catch (readError) {
    console.error('Admin: could not read a document', readError);
    return { siteDocument, saved: {}, problem: saveFailed };
  }
}

/** @param {() => Promise<void>} change */
async function savedOrFailed(change) {
  if (!isDatabaseConfigured()) return fail(badRequest, { problem: saveFailed });
  try {
    await change();
  } catch (saveError) {
    console.error('Admin: could not save a document', saveError);
    return fail(serverError, { problem: saveFailed });
  }
  return { isSaved: true };
}

export const actions = {
  save: async ({ params, request }) => {
    const siteDocument = siteDocumentOrNotFound(params.document);
    const { values, problem } = documentFromForm(await request.formData(), siteDocument);
    if (problem) return fail(badRequest, { problem });
    const updatedOn = siteDocument.isDated ? todayInWords() : '';
    return savedOrFailed(() => saveDocument(siteDocument.key, { ...values, updatedOn }));
  },
  restore: async ({ params }) => {
    const siteDocument = siteDocumentOrNotFound(params.document);
    return savedOrFailed(() => forgetSavedDocument(siteDocument.key));
  }
};
