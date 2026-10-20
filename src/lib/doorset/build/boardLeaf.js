// @ts-nocheck — three.js ships no types for this project's checker
import { block } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, heights, leaf } from '../measures.js';
import { doorTypes } from '../doorTypes.js';
import { leafMotion } from './leaf.js';

const skinThickness = 0.004;
const grooveCount = 4;
const groove = { width: 0.006, depth: 0.002, margin: 0.12 };

/** @param {ReturnType<typeof createPart>} part @param {number} faceZ @param {number} colour */
function addGrooves(part, faceZ, colour) {
  const spacing = leaf.width / (grooveCount + 1);
  for (let groovePosition = 1; groovePosition <= grooveCount; groovePosition++) {
    const grooveX = -leaf.width / 2 + groovePosition * spacing;
    part.add(block(groove.width, leaf.height - groove.margin, groove.depth, colour), grooveX, heights.leafMiddle, faceZ);
  }
}

export function buildBoardLeaf() {
  const part = createPart('leaf', leafMotion.explode, leafMotion.range, [doorTypes.board]);
  const coreThickness = leaf.thickness - skinThickness;
  part.add(block(leaf.width, leaf.height, coreThickness, palette.paint), 0, heights.leafMiddle, depths.leafFront - coreThickness / 2);
  part.add(block(leaf.width, leaf.height, skinThickness, palette.outsidePaint), 0, heights.leafMiddle, depths.leafBack + skinThickness / 2);
  addGrooves(part, depths.leafFront, palette.groove);
  addGrooves(part, depths.leafBack, palette.ink3);
  return part;
}
