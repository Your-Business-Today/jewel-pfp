// @ts-nocheck — three.js ships no types for this project's checker
import { block, cylinder, metal } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, edges, gaps } from '../measures.js';
import { doorTypes, everyDoorType } from '../doorTypes.js';

export const handleHeight = 1.05;
const plate = { width: 0.04, height: 0.2, depth: 0.008 };
const leverLength = 0.13;
const backsetFromEdge = 0.06;
const plateX = edges.lock - backsetFromEdge;
const faces = [
  { surface: depths.leafFront, outward: 1 },
  { surface: depths.leafBack, outward: -1 }
];

/** @param {ReturnType<typeof createPart>} part @param {{ surface: number, outward: number }} face */
function addHandle(part, face) {
  part.add(block(plate.width, plate.height, plate.depth, palette.steel, metal), plateX, handleHeight, face.surface + (face.outward * plate.depth) / 2);
  const leverMesh = block(leverLength, 0.018, 0.018, palette.steel, metal);
  part.add(leverMesh, plateX - leverLength / 2, handleHeight + 0.04, face.surface + face.outward * 0.05);
  const rose = cylinder(0.01, 0.045, palette.steel, metal);
  rose.rotation.x = Math.PI / 2;
  part.add(rose, plateX, handleHeight + 0.04, face.surface + face.outward * 0.025);
}

/** @param {ReturnType<typeof createPart>} part */
function addCylinder(part) {
  const lockCylinder = cylinder(0.009, 0.064, palette.gold, metal);
  lockCylinder.rotation.x = Math.PI / 2;
  part.add(lockCylinder, plateX, handleHeight - 0.05, depths.leafCentre);
}

/** @param {number} doorType */
function buildLeverFor(doorType) {
  const part = createPart('lever', [0.35, 0, 0.35], [0.3, 0.45], [doorType]);
  faces.forEach((face) => addHandle(part, face));
  if (doorType === doorTypes.board) addCylinder(part);
  const latchX = edges.lock + gaps.edge / 2;
  part.add(block(gaps.edge, 0.16, 0.024, palette.steel, metal), latchX, handleHeight, depths.leafCentre);
  return part;
}

export function buildLever() {
  return everyDoorType.map(buildLeverFor);
}
