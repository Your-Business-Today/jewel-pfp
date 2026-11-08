import { numbered } from './lists.js';
import { homeSteps } from './pages/homeDefaults.js';

/** @param {Record<string, string>} text */
export function stepsFrom(text) {
  return homeSteps.map((_, position) => ({
    n: numbered(position),
    title: text[`step${position + 1}Title`],
    body: text[`step${position + 1}Body`]
  }));
}
