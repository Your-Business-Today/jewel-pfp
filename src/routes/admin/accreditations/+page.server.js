import { fail } from '@sveltejs/kit';
import { accreditations } from '$lib/services.js';
import { accreditationFields, accreditationsTable } from '$lib/content/listFields.js';
import { orderedListActions } from '$lib/server/admin/listActions.js';
import { appendRow, readOrderedList } from '$lib/server/admin/orderedList.js';
import { updateRow } from '$lib/server/database/rowWrites.js';
import { formText } from '$lib/server/validation/formText.js';
import { rowFromForm } from '$lib/server/validation/listRows.js';

const badRequest = 400;
const serverError = 500;

export function load() {
  return readOrderedList(accreditationsTable);
}

function builtInAccreditationRows() {
  return accreditations.map((accreditation) => ({ ...accreditation }));
}

/**
 * @param {(row: Record<string, string>, form: FormData) => Promise<unknown>} write
 * @returns {import('@sveltejs/kit').Action}
 */
function writeAccreditation(write) {
  return async ({ request }) => {
    const form = await request.formData();
    const { row, problem } = rowFromForm(form, accreditationFields);
    if (problem) return fail(badRequest, { problem });
    try {
      await write(row, form);
    } catch (writeError) {
      console.error('Admin: could not save an accreditation', writeError);
      return fail(serverError, { problem: 'The accreditation could not be saved. Please try again.' });
    }
    return { isSaved: true };
  };
}

export const actions = {
  ...orderedListActions(accreditationsTable, builtInAccreditationRows),
  save: writeAccreditation((row, form) => updateRow(accreditationsTable, formText(form, 'id'), row)),
  add: writeAccreditation((row) => appendRow(accreditationsTable, row))
};
