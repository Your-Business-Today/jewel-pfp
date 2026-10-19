import { numbered } from './lists.js';
import { homeCaptions, homeSteps } from './pages/homeDefaults.js';

/** @param {Record<string, string>} text */
export function captionsFrom(text) {
  const lastPosition = homeCaptions.length - 1;
  const captions = homeCaptions.map((_, position) => ({
    label: text[`caption${position + 1}Label`],
    title: text[`caption${position + 1}Title`],
    body: text[`caption${position + 1}Body`],
    hasCallToAction: position === lastPosition
  }));
  return [null, ...captions];
}

/** @param {Record<string, string>} text */
export function stepsFrom(text) {
  return homeSteps.map((_, position) => ({
    n: numbered(position),
    title: text[`step${position + 1}Title`],
    body: text[`step${position + 1}Body`]
  }));
}
