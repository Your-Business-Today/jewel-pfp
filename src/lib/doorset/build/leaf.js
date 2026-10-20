// @ts-nocheck — three.js ships no types for this project's checker
import { block } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, heights, leaf } from '../measures.js';
import { doorTypes } from '../doorTypes.js';

export const leafMotion = { explode: [0.25, 0, 0.75], range: [0.72, 0.85] };

export function buildLeaf() {
  const part = createPart('leaf', leafMotion.explode, leafMotion.range, [doorTypes.flush]);
  part.add(block(leaf.width, leaf.height, leaf.thickness, palette.oak, { edge: palette.gold }), 0, heights.leafMiddle, depths.leafCentre);
  return part;
}
