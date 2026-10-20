import { listLimits } from '$lib/content/limits.js';
import { kindRule, valueFromText } from '$lib/content/documents/kinds.js';
import { formText, textProblem } from './formText.js';

/**
 * @param {FormData} form
 * @param {string} name
 * @param {{ label: string, kind: string, isRequired?: boolean }} part
 */
function readPart(form, name, part) {
  const text = formText(form, name);
  const rule = { label: part.label, limit: kindRule(part.kind).limit, isRequired: part.isRequired ?? true };
  return { value: valueFromText(part.kind, text), text, problem: textProblem(text, rule) };
}

/**
 * @param {FormData} form
 * @param {import('$lib/content/documents/parts.js').DocumentList} documentList
 * @param {number} position
 */
function readRow(form, documentList, position) {
  const label = (/** @type {string} */ columnLabel) => `${documentList.label}, entry ${position + 1}: ${columnLabel}`;
  const cells = documentList.columns.map((column) => ({
    key: column.key,
    ...readPart(form, `${documentList.key}.${position}.${column.key}`, { ...column, label: label(column.label) })
  }));
  const isBlank = cells.every((cell) => !cell.text);
  const row = Object.fromEntries(cells.map((cell) => [cell.key, cell.value]));
  return { row, isBlank, problem: cells.map((cell) => cell.problem).find(Boolean) ?? '' };
}

/**
 * @param {FormData} form
 * @param {import('$lib/content/documents/parts.js').DocumentList} documentList
 */
function readList(form, documentList) {
  const count = Number(formText(form, `${documentList.key}.count`));
  const isCountValid = Number.isInteger(count) && count >= 0 && count <= listLimits.rows;
  if (!isCountValid) return { rows: [], problem: `${documentList.label} can hold up to ${listLimits.rows} entries.` };
  const filled = Array.from({ length: count }, (_, position) => readRow(form, documentList, position)).filter((read) => !read.isBlank);
  return { rows: filled.map((read) => read.row), problem: filled.map((read) => read.problem).find(Boolean) ?? '' };
}

/**
 * @param {FormData} form
 * @param {import('$lib/content/documents/parts.js').SiteDocument} siteDocument
 */
export function documentFromForm(form, siteDocument) {
  const fields = siteDocument.fields.map((field) => ({ key: field.key, ...readPart(form, field.key, field) }));
  const lists = siteDocument.lists.map((documentList) => ({ key: documentList.key, ...readList(form, documentList) }));
  const values = {
    ...Object.fromEntries(fields.map((field) => [field.key, field.value])),
    ...Object.fromEntries(lists.map((read) => [read.key, read.rows]))
  };
  const problems = [...fields, ...lists].map((part) => part.problem);
  return { values, problem: problems.find(Boolean) ?? '' };
}
