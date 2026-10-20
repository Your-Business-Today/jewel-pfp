// @ts-nocheck — three.js ships no types for this project's checker
import { block } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, leaf } from '../measures.js';
import { doorTypes } from '../doorTypes.js';
import { aperture } from './glazedLeaf.js';

const glassThickness = 0.012;
const tapeThickness = 0.003;
const beadWidth = 0.018;
const beadDepth = (leaf.thickness - glassThickness) / 2;
const apertureMiddle = aperture.bottom + aperture.height / 2;
const glazed = [doorTypes.glazed];

/** @param {import('../parts.js').DoorPart} part @param {{ width: number, height: number, bar: number, depth: number, z: number, colour: number }} outline */
function addRectangle(part, outline) {
  const sideX = outline.width / 2 - outline.bar / 2;
  const railY = outline.height / 2 - outline.bar / 2;
  for (const side of [-1, 1]) {
    part.add(block(outline.bar, outline.height, outline.depth, outline.colour), side * sideX, apertureMiddle, outline.z);
    part.add(block(outline.width - 2 * outline.bar, outline.bar, outline.depth, outline.colour), 0, apertureMiddle + side * railY, outline.z);
  }
}

function buildGlass() {
  const part = createPart('glass', [0, 0, 0.6], [0.45, 0.6], glazed);
  const paneWidth = aperture.width - 2 * tapeThickness;
  const paneHeight = aperture.height - 2 * tapeThickness;
  part.add(block(paneWidth, paneHeight, glassThickness, palette.glass, { opacity: 0.4, roughness: 0.1 }), 0, apertureMiddle, depths.leafCentre);
  return part;
}

function buildTape() {
  const part = createPart('glazingTape', [0, 0, 0.45], [0.45, 0.6], glazed);
  addRectangle(part, { width: aperture.width, height: aperture.height, bar: tapeThickness, depth: glassThickness, z: depths.leafCentre, colour: palette.gold });
  return part;
}

/** @param {number} outward */
function buildBeads(outward) {
  const part = createPart('beads', [0, 0, outward * 0.3], [0.3, 0.45], glazed);
  const beadZ = depths.leafCentre + outward * (glassThickness / 2 + beadDepth / 2);
  addRectangle(part, { width: aperture.width, height: aperture.height, bar: beadWidth, depth: beadDepth, z: beadZ, colour: palette.frame });
  return part;
}

export function buildGlazing() {
  return [buildBeads(1), buildBeads(-1), buildTape(), buildGlass()];
}
