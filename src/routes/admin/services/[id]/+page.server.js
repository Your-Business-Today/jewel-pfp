import { error, fail } from '@sveltejs/kit';
import { servicesTable } from '$lib/content/listFields.js';
import { selectRows } from '$lib/server/database/rows.js';
import { updateRow } from '$lib/server/database/rowWrites.js';
import { serviceFromForm } from '$lib/server/content/serviceRows.js';

const notFound = 404;
const badRequest = 400;
const serverError = 500;

export async function load({ params }) {
  const rows = await selectRows(servicesTable, `select=*&id=eq.${encodeURIComponent(params.id)}`).catch(() => []);
  const [service] = rows;
  if (!service) error(notFound, 'That service could not be found.');
  return { service };
}

export const actions = {
  save: async ({ params, request }) => {
    const { row, problem } = serviceFromForm(await request.formData());
    if (problem) return fail(badRequest, { problem });
    try {
      await updateRow(servicesTable, params.id, row);
    } catch (saveError) {
      console.error('Admin: could not save a service', saveError);
      return fail(serverError, { problem: 'The service could not be saved. Please try again.' });
    }
    return { isSaved: true };
  }
};
