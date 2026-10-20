// @ts-nocheck — three.js ships no types for this project's checker
import { cylinder, metal } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, fixingHeights, frame, surround } from '../measures.js';

const screw = { length: 0.12, radius: 0.003, headRadius: 0.0065, headDepth: 0.003 };
const jambInnerFace = surround.frameOuterSide - frame.faceWidth;

export function buildFixings() {
  const part = createPart('fixings', [0, 0, 0], [0, 0]);
  part.isBuried = true;
  for (const side of [-1, 1]) {
    for (const height of fixingHeights) {
      const shank = cylinder(screw.radius, screw.length, palette.steel, metal);
      shank.rotation.z = Math.PI / 2;
      part.add(shank, side * (jambInnerFace + screw.length / 2), height, depths.leafCentre);
      const head = cylinder(screw.headRadius, screw.headDepth, palette.steel, metal);
      head.rotation.z = Math.PI / 2;
      part.add(head, side * (jambInnerFace + screw.headDepth / 2), height, depths.leafCentre);
    }
  }
  return part;
}
