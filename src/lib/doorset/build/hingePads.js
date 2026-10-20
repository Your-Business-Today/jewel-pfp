// @ts-nocheck — three.js ships no types for this project's checker
import { block } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, edges } from '../measures.js';
import { everyDoorType } from '../doorTypes.js';
import { hingeCentres, hingeHeight, leafPlateWidth } from './hinges.js';
import { leafMotion } from './leaf.js';

const pad = { thickness: 0.002, margin: 0.006 };

/** @param {number} doorType */
function buildPadsFor(doorType) {
  const part = createPart('hingePads', leafMotion.explode, leafMotion.range, [doorType]);
  part.isBuried = true;
  const padX = edges.hinge + pad.thickness / 2;
  const padZ = depths.leafFront - leafPlateWidth / 2;
  for (const centre of hingeCentres[doorType]) {
    part.add(block(pad.thickness, hingeHeight + pad.margin, leafPlateWidth + pad.margin, palette.gold), padX, centre, padZ);
  }
  return part;
}

export function buildHingePads() {
  return everyDoorType.map(buildPadsFor);
}
