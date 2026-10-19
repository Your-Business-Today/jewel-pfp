/** @typedef {{ label: string, limit: number, isRequired: boolean }} TextRule */

const emailShape = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const windowsLineEnding = /\r\n/g;

/**
 * @param {FormData} form
 * @param {string} name
 */
export function formText(form, name) {
  const value = form.get(name);
  if (typeof value !== 'string') return '';
  return value.replace(windowsLineEnding, '\n').trim();
}

/**
 * @param {string} value
 * @param {TextRule} rule
 */
export function textProblem(value, rule) {
  if (rule.isRequired && !value) return `${rule.label} is required.`;
  if (value.length > rule.limit) return `${rule.label} must be ${rule.limit} characters or fewer.`;
  return '';
}

/** @param {string} value */
export function emailProblem(value) {
  return emailShape.test(value) ? '' : 'Email must be a valid email address.';
}

/**
 * @param {FormData} form
 * @param {Record<string, TextRule>} rules
 */
export function validateFormText(form, rules) {
  const values = Object.fromEntries(Object.keys(rules).map((name) => [name, formText(form, name)]));
  const problems = Object.entries(rules).map(([name, rule]) => textProblem(values[name], rule));
  return { values, problem: problems.find(Boolean) ?? '' };
}
