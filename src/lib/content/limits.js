export const textLimits = {
  line: 200,
  paragraph: 2000,
  link: 500,
  message: 5000,
  section: 10000
};

export const listLimits = {
  rows: 50
};

export const fieldKinds = {
  line: 'line',
  paragraph: 'paragraph',
  link: 'link'
};

/** @param {string} kind */
export function limitFor(kind) {
  return textLimits[/** @type {keyof typeof textLimits} */ (kind)] ?? textLimits.line;
}
