// @ts-nocheck — three.js ships no types for this project's checker
import { block, cylinder, metal } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, edges, gaps, heights } from '../measures.js';

const hingeHeight = 0.1;
const knuckleRadius = 0.0065;
const leafPlateWidth = 0.03;
const hingeCentres = [heights.leafTop - 0.2, heights.leafMiddle + 0.1, heights.leafBottom + 0.25];

export function buildHinges() {
  const part = createPart('hinges', [-0.35, 0, 0.3], [0.45, 0.6]);
  const knuckleX = edges.hinge - gaps.edge / 2;
  for (const centre of hingeCentres) {
    part.add(cylinder(knuckleRadius, hingeHeight, palette.steel, metal), knuckleX, centre, depths.leafFront);
    part.add(block(gaps.edge, hingeHeight, leafPlateWidth, palette.steel, metal), knuckleX, centre, depths.leafFront - leafPlateWidth / 2);
  }
  return part;
}
