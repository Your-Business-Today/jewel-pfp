// @ts-nocheck — three.js ships no types for this project's checker
import { block } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, edges, frame, gaps, heights, leaf } from '../measures.js';

const openingWidth = leaf.width + 2 * gaps.edge;
const stopRebateCentre = (depths.stopFront - frame.depth / 2) / 2;

export function buildFrame() {
  const part = createPart('frame', [0, 0, 0], [0, 0]);
  const jambHeight = heights.frameTop;
  const headWidth = openingWidth + 2 * frame.faceWidth;
  part.add(block(frame.faceWidth, jambHeight, frame.depth, palette.frame), edges.hingeJamb, jambHeight / 2, 0);
  part.add(block(frame.faceWidth, jambHeight, frame.depth, palette.frame), edges.lockJamb, jambHeight / 2, 0);
  part.add(block(headWidth, frame.headHeight, frame.depth, palette.frame), 0, heights.frameTop - frame.headHeight / 2, 0);
  addStops(part);
  return part;
}

/** @param {import('../parts.js').DoorPart} part */
function addStops(part) {
  const stopLength = heights.headSoffit;
  const stopHeightCentre = stopLength / 2;
  const sideOffset = openingWidth / 2 - frame.stopWidth / 2;
  part.add(block(frame.stopWidth, stopLength, frame.stopDepth, palette.frame), -sideOffset, stopHeightCentre, stopRebateCentre);
  part.add(block(frame.stopWidth, stopLength, frame.stopDepth, palette.frame), sideOffset, stopHeightCentre, stopRebateCentre);
  const headStopY = heights.headSoffit - frame.stopWidth / 2;
  part.add(block(openingWidth, frame.stopWidth, frame.stopDepth, palette.frame), 0, headStopY, stopRebateCentre);
}
