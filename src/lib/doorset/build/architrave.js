// @ts-nocheck — three.js ships no types for this project's checker
import { block } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { frame, heights, surround } from '../measures.js';

const innerEdge = surround.frameOuterSide - frame.faceWidth / 2;
const legX = innerEdge + surround.architraveWidth / 2;
const legHeight = heights.frameTop - frame.faceWidth / 2 + surround.architraveWidth;
const faces = [
  { outward: 1, explode: [0, 0, 0.35] },
  { outward: -1, explode: [0, 0, -0.35] }
];

/** @param {{ outward: number, explode: [number, number, number] }} face */
function buildArchitraveSet(face) {
  const part = createPart('architrave', face.explode, [0, 0.1]);
  const faceZ = face.outward * (frame.depth / 2 + surround.architraveThickness / 2);
  for (const side of [-1, 1]) {
    part.add(block(surround.architraveWidth, legHeight, surround.architraveThickness, palette.frame), side * legX, legHeight / 2, faceZ);
  }
  const headY = legHeight - surround.architraveWidth / 2;
  part.add(block(2 * innerEdge, surround.architraveWidth, surround.architraveThickness, palette.frame), 0, headY, faceZ);
  return part;
}

export function buildArchitrave() {
  return faces.map(buildArchitraveSet);
}
