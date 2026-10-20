// @ts-nocheck — three.js ships no types for this project's checker
import { cylinder, metal } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, leaf } from '../measures.js';

const viewerHeight = 1.5;
const viewerRadius = 0.008;

export function buildViewer() {
  const part = createPart('viewer', [0, 0.1, 0.4], [0.35, 0.5]);
  const lens = cylinder(viewerRadius, leaf.thickness + 0.006, palette.steel, metal);
  lens.rotation.x = Math.PI / 2;
  part.add(lens, 0, viewerHeight, depths.leafCentre);
  return part;
}
