// @ts-nocheck — three.js ships no types for this project's checker
import { block } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, heights, leaf } from '../measures.js';

export function buildLeaf() {
  const part = createPart('leaf', [0.25, 0, 0.75], [0.72, 0.85]);
  part.add(block(leaf.width, leaf.height, leaf.thickness, palette.oak, { edge: palette.gold }), 0, heights.leafMiddle, depths.leafCentre);
  return part;
}
