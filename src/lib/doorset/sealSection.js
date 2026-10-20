import { sealChoiceFor } from './seals.js';

const stripCentre = 52;
const stripHeight = 10;
const parallelSpacing = 22;

const fittedShapes = [
  { key: 'frame', label: 'Frame', tone: 'frame', x: 0, y: 0, width: 35, height: 110, labelY: 100, pointX: 20, pointY: 98 },
  { key: 'stop', label: 'Stop on the frame', tone: 'frame', x: 35, y: 0, width: 12, height: 25, labelY: 6, pointX: 44, pointY: 6 },
  { key: 'smokeSeal', label: 'Surface-mounted smoke seal on the stop', tone: 'smoke', x: 47, y: 13, width: 3, height: 12, labelY: 20, pointX: 50, pointY: 19 },
  { key: 'leaf', label: 'Leaf', tone: 'leaf', x: 43, y: 25, width: 70, height: 54, labelY: 86, pointX: 100, pointY: 74 }
];

/** @param {number} offset @param {number} place */
function stripShape(offset, place) {
  const y = stripCentre + (Math.sign(offset) * parallelSpacing) / 2 - stripHeight / 2;
  return { key: `strip${place}`, label: 'Intumescent strip in the frame', tone: 'intumescent', x: 31, y, width: 5, height: stripHeight, labelY: 38 + place * 26, pointX: 36, pointY: y + stripHeight / 2 };
}

const smokeFin = { key: 'fin', label: 'Cold smoke seal touching the leaf', tone: 'smoke', x: 36, y: stripCentre - 1, width: 7, height: 2, labelY: 66, pointX: 40, pointY: stripCentre };

/** @param {string} configuration */
export function sectionShapes(configuration) {
  const choice = sealChoiceFor(configuration);
  const strips = choice.stripOffsets.map(stripShape);
  const fins = choice.hasSmokeFin ? [smokeFin] : [];
  return [...fittedShapes, ...strips, ...fins];
}
