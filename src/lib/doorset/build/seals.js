// @ts-nocheck — three.js ships no types for this project's checker
import { block } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, frame, gaps, heights, leaf } from '../measures.js';
import { sealChoices } from '../seals.js';

const halfOpening = leaf.width / 2 + gaps.edge;
const revealLength = heights.headSoffit - heights.leafBottom;
const strip = { width: 0.004, proud: 0.001, depth: 0.01 };
const fin = { width: gaps.edge, proud: gaps.edge, depth: 0.002 };
const smokeSeal = { width: 0.003, depth: 0.012 };

/** @param {import('../parts.js').DoorPart} part @param {{ width: number, proud: number, depth: number }} shape @param {number} z @param {number} colour */
function addAroundReveal(part, shape, z, colour) {
  const intoOpening = shape.width / 2 - shape.proud;
  for (const side of [-1, 1]) {
    part.add(block(shape.width, revealLength, shape.depth, colour), side * (halfOpening + intoOpening), heights.leafBottom + revealLength / 2, z);
  }
  part.add(block(2 * halfOpening, shape.width, shape.depth, colour), 0, heights.headSoffit + intoOpening, z);
}

/** @param {typeof sealChoices[number]} choice */
function buildSealSet(choice) {
  const part = createPart('seals', [0, 0, 0], [0, 0]);
  part.sealConfigurations = [choice.configuration];
  part.isBuried = true;
  choice.stripOffsets.forEach((offset) => addAroundReveal(part, strip, depths.leafCentre + offset, palette.gold));
  if (choice.hasSmokeFin) addAroundReveal(part, fin, depths.leafCentre, palette.muted);
  return part;
}

function buildRebateSmokeSeal() {
  const part = createPart('smokeSeal', [0, 0, 0], [0, 0]);
  part.isBuried = true;
  const sealZ = depths.stopFront - smokeSeal.depth / 2;
  const besideStop = halfOpening - frame.stopWidth - smokeSeal.width / 2;
  for (const side of [-1, 1]) {
    part.add(block(smokeSeal.width, revealLength, smokeSeal.depth, palette.muted), side * besideStop, heights.leafBottom + revealLength / 2, sealZ);
  }
  const headY = heights.headSoffit - frame.stopWidth - smokeSeal.width / 2;
  part.add(block(2 * besideStop, smokeSeal.width, smokeSeal.depth, palette.muted), 0, headY, sealZ);
  return part;
}

export function buildSeals() {
  return [...sealChoices.map(buildSealSet), buildRebateSmokeSeal()];
}
