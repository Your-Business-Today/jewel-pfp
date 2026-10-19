import { fieldKinds, limitFor } from '$lib/content/limits.js';
import { textProblem } from './formText.js';

const linkShape = /^(https?:\/\/\S+|\/\S*)$/;

/**
 * @param {string} value
 * @param {{ label: string, kind: string, isRequired?: boolean }} field
 */
export function contentProblem(value, field) {
  const rule = { label: field.label, limit: limitFor(field.kind), isRequired: field.isRequired ?? false };
  const lengthProblem = textProblem(value, rule);
  if (lengthProblem) return lengthProblem;
  const isLink = field.kind === fieldKinds.link;
  const isBadLink = isLink && value && !linkShape.test(value);
  return isBadLink ? `${field.label} must start with https:// or /.` : '';
}
