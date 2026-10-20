// @ts-nocheck — three.js ships no types for this project's checker
import { block } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { frame, heights, surround } from '../measures.js';

const openingSide = surround.frameOuterSide + surround.fireStoppingGap;
const openingTop = heights.frameTop + surround.fireStoppingGap;

export function buildWall() {
  const part = createPart('wall', [0, 0, 0], [0, 0]);
  const sideX = openingSide + surround.wallReach / 2;
  for (const side of [-1, 1]) {
    part.add(block(surround.wallReach, surround.wallHeight, frame.depth, palette.plaster), side * sideX, surround.wallHeight / 2, 0);
  }
  const headHeight = surround.wallHeight - openingTop;
  part.add(block(openingSide * 2, headHeight, frame.depth, palette.plaster), 0, openingTop + headHeight / 2, 0);
  return part;
}
