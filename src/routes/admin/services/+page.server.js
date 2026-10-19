import { fail, redirect } from '@sveltejs/kit';
import { serviceFields, servicesTable } from '$lib/content/listFields.js';
import { textLimits } from '$lib/content/limits.js';
import { orderedListActions } from '$lib/server/admin/listActions.js';
import { appendRow, readOrderedList } from '$lib/server/admin/orderedList.js';
import { builtInServiceRows, uniqueSlugFor } from '$lib/server/content/serviceRows.js';
import { formText, textProblem } from '$lib/server/validation/formText.js';

const badRequest = 400;
const seeOther = 303;
const titleRule = { label: serviceFields.title.label, limit: textLimits.line, isRequired: true };

export function load() {
  return readOrderedList(servicesTable);
}

export const actions = {
  ...orderedListActions(servicesTable, builtInServiceRows),
  add: async ({ request }) => {
    const title = formText(await request.formData(), 'title');
    const problem = textProblem(title, titleRule);
    if (problem) return fail(badRequest, { problem });
    const { rows } = await readOrderedList(servicesTable);
    const takenSlugs = rows.map((row) => row.slug);
    const slug = uniqueSlugFor(title, takenSlugs);
    const added = await appendRow(servicesTable, { slug, title, summary: title, detail: title, points: [], cta_label: '', cta_href: '' });
    redirect(seeOther, `/admin/services/${added.id}`);
  }
};
