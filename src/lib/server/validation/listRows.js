import { contentProblem } from './contentRules.js';
import { formText } from './formText.js';

/**
 * @param {FormData} form
 * @param {Record<string, { label: string, kind: string, isRequired: boolean }>} fields
 */
export function rowFromForm(form, fields) {
  const row = Object.fromEntries(Object.keys(fields).map((column) => [column, formText(form, column)]));
  const problems = Object.entries(fields).map(([column, field]) => contentProblem(row[column], field));
  return { row, problem: problems.find(Boolean) ?? '' };
}
