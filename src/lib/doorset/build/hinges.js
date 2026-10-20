// @ts-nocheck — three.js ships no types for this project's checker
import { block, cylinder, metal } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, edges, gaps, heights } from '../measures.js';
import { doorTypes, everyDoorType } from '../doorTypes.js';

const knuckleRadius = 0.0065;
export const leafPlateWidth = 0.03;
const topHinge = heights.leafTop - 0.2;
const bottomHinge = heights.leafBottom + 0.25;
const thirdOfTheRun = (topHinge - bottomHinge) / 3;
export const hingeHeight = 0.1;
export const hingeCentres = {
  [doorTypes.flush]: [topHinge, heights.leafMiddle + 0.1, bottomHinge],
  [doorTypes.board]: [topHinge, topHinge - thirdOfTheRun, bottomHinge + thirdOfTheRun, bottomHinge]
};

/** @param {number[]} centres @param {number[]} shownOn */
function buildHingeSet(centres, shownOn) {
  const part = createPart('hinges', [-0.35, 0, 0.3], [0.45, 0.6], shownOn);
  const knuckleX = edges.hinge - gaps.edge / 2;
  for (const centre of centres) {
    part.add(cylinder(knuckleRadius, hingeHeight, palette.steel, metal), knuckleX, centre, depths.leafFront);
    part.add(block(gaps.edge, hingeHeight, leafPlateWidth, palette.steel, metal), knuckleX, centre, depths.leafFront - leafPlateWidth / 2);
  }
  return part;
}

export function buildHinges() {
  return everyDoorType.map((doorType) => buildHingeSet(hingeCentres[doorType], [doorType]));
}
