import { error, fail } from '@sveltejs/kit';
import { findContentPage } from '$lib/content/pages/index.js';
import { isDatabaseConfigured } from '$lib/server/database/connection.js';
import { readSavedText, saveText } from '$lib/server/content/pageTextStore.js';
import { contentProblem } from '$lib/server/validation/contentRules.js';
import { formText } from '$lib/server/validation/formText.js';

const notFound = 404;
const badRequest = 400;
const serverError = 500;
const saveFailed = 'The text could not be saved. Check Supabase is connected and the migration has been run.';

/** @param {string} key */
function contentPageOrNotFound(key) {
  const contentPage = findContentPage(key);
  if (!contentPage) error(notFound, 'There is no page of text by that name.');
  return contentPage;
}

export async function load({ params }) {
  const contentPage = contentPageOrNotFound(params.page);
  if (!isDatabaseConfigured()) return { contentPage, saved: {}, problem: '' };
  try {
    return { contentPage, saved: await readSavedText(contentPage.key), problem: '' };
  } catch (readError) {
    console.error('Admin: could not read page text', readError);
    return { contentPage, saved: {}, problem: saveFailed };
  }
}

/**
 * @param {FormData} form
 * @param {import('$lib/content/pages/fields.js').ContentField[]} fields
 */
function changedText(form, fields) {
  const entries = fields.map((field) => [field.key, formText(form, field.key)]);
  const changed = entries.filter(([, value], position) => value !== fields[position].default.trim());
  const problems = fields.map((field) => contentProblem(formText(form, field.key), field));
  return { text: Object.fromEntries(changed), problem: problems.find(Boolean) ?? '' };
}

export const actions = {
  save: async ({ params, request }) => {
    const contentPage = contentPageOrNotFound(params.page);
    if (!isDatabaseConfigured()) return fail(badRequest, { problem: saveFailed });
    const { text, problem } = changedText(await request.formData(), contentPage.fields);
    if (problem) return fail(badRequest, { problem });
    try {
      await saveText(contentPage.key, text);
    } catch (saveError) {
      console.error('Admin: could not save page text', saveError);
      return fail(serverError, { problem: saveFailed });
    }
    return { isSaved: true };
  }
};
