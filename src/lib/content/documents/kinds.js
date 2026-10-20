import { textLimits } from '../limits.js';
import { blocksFromText, textFromBlocks } from './blockText.js';

export const documentKinds = {
  line: 'line',
  paragraph: 'paragraph',
  lines: 'lines',
  paragraphs: 'paragraphs',
  blocks: 'blocks'
};

const blankLines = /\n\s*\n/;
const lineBreaks = /\s*\n\s*/g;

/** @param {string} text */
function linesFrom(text) {
  return text.split('\n').map((line) => line.trim()).filter(Boolean);
}

/** @param {string} text */
function paragraphsFrom(text) {
  return text.split(blankLines).map((paragraph) => paragraph.replace(lineBreaks, ' ').trim()).filter(Boolean);
}

/** @param {string} separator */
function joinedWith(separator) {
  return (/** @type {string[] | undefined} */ value) => (value ?? []).join(separator);
}

const asItIs = (/** @type {string | undefined} */ value) => value ?? '';

const kindRules = {
  line: { limit: textLimits.line, rows: 1, hint: '', fromText: asItIs, toText: asItIs },
  paragraph: { limit: textLimits.paragraph, rows: 4, hint: '', fromText: asItIs, toText: asItIs },
  lines: { limit: textLimits.message, rows: 6, hint: 'One per line.', fromText: linesFrom, toText: joinedWith('\n') },
  paragraphs: {
    limit: textLimits.message,
    rows: 8,
    hint: 'Leave a blank line between paragraphs.',
    fromText: paragraphsFrom,
    toText: joinedWith('\n\n')
  },
  blocks: {
    limit: textLimits.section,
    rows: 14,
    hint: 'Leave a blank line between paragraphs. Start a list point with "- " and a point inside it with "  - ". Wrap a bold opening in **two stars**. Write a table row as | cell | cell |, headings first.',
    fromText: blocksFromText,
    toText: textFromBlocks
  }
};

/** @param {string} kind */
export function kindRule(kind) {
  return kindRules[/** @type {keyof typeof kindRules} */ (kind)] ?? kindRules.line;
}

/**
 * @param {string} kind
 * @param {string} text
 */
export function valueFromText(kind, text) {
  return kindRule(kind).fromText(text);
}

/**
 * @param {string} kind
 * @param {any} value
 */
export function textFromValue(kind, value) {
  return kindRule(kind).toText(value);
}
