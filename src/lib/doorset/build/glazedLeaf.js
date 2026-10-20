// @ts-nocheck — three.js ships no types for this project's checker
import { block } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, heights, leaf } from '../measures.js';
import { doorTypes } from '../doorTypes.js';
import { leafMotion } from './leaf.js';

export const aperture = { width: 0.25, height: 0.75, bottom: 1.0 };

const apertureTop = aperture.bottom + aperture.height;
const stileWidth = (leaf.width - aperture.width) / 2;

export function buildGlazedLeaf() {
  const part = createPart('leaf', leafMotion.explode, leafMotion.range, [doorTypes.glazed]);
  const add = (width, height, x, y) => part.add(block(width, height, leaf.thickness, palette.paint, { edge: palette.paint }), x, y, depths.leafCentre);
  const stileX = aperture.width / 2 + stileWidth / 2;
  add(stileWidth, leaf.height, -stileX, heights.leafMiddle);
  add(stileWidth, leaf.height, stileX, heights.leafMiddle);
  const bottomRail = aperture.bottom - heights.leafBottom;
  add(aperture.width, bottomRail, 0, heights.leafBottom + bottomRail / 2);
  const topRail = heights.leafTop - apertureTop;
  add(aperture.width, topRail, 0, apertureTop + topRail / 2);
  return part;
}
