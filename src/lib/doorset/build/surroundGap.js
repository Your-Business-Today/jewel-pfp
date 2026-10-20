// @ts-nocheck — three.js ships no types for this project's checker
import { block } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { fixingHeights, frame, heights, surround } from '../measures.js';

const gapCentreX = surround.frameOuterSide + surround.fireStoppingGap / 2;
const halfPacker = surround.packerHeight / 2;

/** @returns {[number, number][]} */
function runsBetweenPackers() {
  const edges = [0, ...fixingHeights.flatMap((height) => [height - halfPacker, height + halfPacker]), heights.frameTop];
  return Array.from({ length: edges.length / 2 }, (_, run) => [edges[run * 2], edges[run * 2 + 1]]);
}

export function buildFireStopping() {
  const part = createPart('fireStopping', [0, 0, 0], [0, 0]);
  for (const side of [-1, 1]) {
    for (const [bottom, top] of runsBetweenPackers()) {
      part.add(block(surround.fireStoppingGap, top - bottom, frame.depth, palette.fireStopping), side * gapCentreX, (bottom + top) / 2, 0);
    }
  }
  const headWidth = 2 * (surround.frameOuterSide + surround.fireStoppingGap);
  part.add(block(headWidth, surround.fireStoppingGap, frame.depth, palette.fireStopping), 0, heights.frameTop + surround.fireStoppingGap / 2, 0);
  return part;
}

export function buildPacking() {
  const part = createPart('packing', [0, 0, 0], [0, 0]);
  part.isBuried = true;
  for (const side of [-1, 1]) {
    for (const height of fixingHeights) {
      part.add(block(surround.fireStoppingGap, surround.packerHeight, frame.depth, palette.packing), side * gapCentreX, height, 0);
    }
  }
  return part;
}
