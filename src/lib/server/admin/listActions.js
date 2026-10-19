import { fail } from '@sveltejs/kit';
import { formText } from '$lib/server/validation/formText.js';
import { insertInOrder, moveRow, readOrderedList, removeRow, setRowVisible } from './orderedList.js';

const badRequest = 400;
const serverError = 500;
const up = -1;
const down = 1;

/**
 * @param {(form: FormData, id: string) => Promise<void>} change
 * @returns {import('@sveltejs/kit').Action}
 */
function forRow(change) {
  return async ({ request }) => {
    const form = await request.formData();
    const id = formText(form, 'id');
    if (!id) return fail(badRequest, { problem: 'Which row was meant is missing.' });
    try {
      await change(form, id);
    } catch (error) {
      console.error('Admin list change failed', error);
      return fail(serverError, { problem: 'The change could not be saved. Please try again.' });
    }
    return { isSaved: true };
  };
}

/**
 * @param {string} table
 * @param {() => Record<string, unknown>[]} builtInRows
 */
export function orderedListActions(table, builtInRows) {
  return {
    moveUp: forRow((_, id) => moveRow(table, id, up)),
    moveDown: forRow((_, id) => moveRow(table, id, down)),
    hide: forRow((_, id) => setRowVisible(table, id, false)),
    show: forRow((_, id) => setRowVisible(table, id, true)),
    remove: forRow((_, id) => removeRow(table, id)),
    copyBuiltIn: async () => {
      const { rows } = await readOrderedList(table);
      if (rows.length > 0) return fail(badRequest, { problem: 'The list already has entries.' });
      await insertInOrder(table, builtInRows());
      return { isSaved: true };
    }
  };
}
