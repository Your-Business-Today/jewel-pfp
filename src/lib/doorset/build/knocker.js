// @ts-nocheck — three.js ships no types for this project's checker
import { block, cylinder, metal } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths } from '../measures.js';
import { doorTypes } from '../doorTypes.js';

const knockerHeight = 1.32;
const plate = { width: 0.05, height: 0.16, depth: 0.01 };
const barLength = 0.14;

export function buildKnocker() {
  const part = createPart('knocker', [0, 0.1, -0.45], [0.3, 0.45], [doorTypes.board]);
  const plateZ = depths.leafBack - plate.depth / 2;
  part.add(block(plate.width, plate.height, plate.depth, palette.steel, metal), 0, knockerHeight, plateZ);
  const bar = cylinder(0.009, barLength, palette.steel, metal);
  bar.rotation.z = Math.PI / 2;
  part.add(bar, 0, knockerHeight - plate.height / 2 + 0.02, plateZ - 0.02);
  return part;
}
