// @ts-nocheck — three.js ships no types for this project's checker
import { block, metal } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, leaf } from '../measures.js';
import { doorTypes } from '../doorTypes.js';

const slotHeight = 0.86;
const slot = { width: 0.25, height: 0.04 };
const plate = { width: 0.32, height: 0.09, depth: 0.008 };

export function buildLetterplate() {
  const part = createPart('letterplate', [0, -0.15, 0.45], [0.3, 0.45], [doorTypes.board]);
  part.add(block(slot.width, slot.height, leaf.thickness + 0.002, palette.ink), 0, slotHeight, depths.leafCentre);
  part.add(block(plate.width, plate.height, plate.depth, palette.steel, metal), 0, slotHeight, depths.leafFront + plate.depth / 2);
  part.add(block(plate.width, plate.height, plate.depth, palette.steel, metal), 0, slotHeight, depths.leafBack - plate.depth / 2);
  return part;
}
