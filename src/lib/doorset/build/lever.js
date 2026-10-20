// @ts-nocheck — three.js ships no types for this project's checker
import { block, cylinder, metal } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, edges, gaps } from '../measures.js';

const handleHeight = 1.05;
const plate = { width: 0.04, height: 0.2, depth: 0.008 };
const leverLength = 0.13;
const backsetFromEdge = 0.06;

export function buildLever() {
  const part = createPart('lever', [0.35, 0, 0.35], [0.3, 0.45]);
  const plateX = edges.lock - backsetFromEdge;
  const plateZ = depths.leafFront + plate.depth / 2;
  part.add(block(plate.width, plate.height, plate.depth, palette.steel, metal), plateX, handleHeight, plateZ);
  const leverZ = depths.leafFront + 0.05;
  const leverMesh = block(leverLength, 0.018, 0.018, palette.steel, metal);
  part.add(leverMesh, plateX - leverLength / 2, handleHeight + 0.04, leverZ);
  const rose = cylinder(0.01, 0.045, palette.steel, metal);
  rose.rotation.x = Math.PI / 2;
  part.add(rose, plateX, handleHeight + 0.04, depths.leafFront + 0.025);
  const latchX = edges.lock + gaps.edge / 2;
  part.add(block(gaps.edge, 0.16, 0.024, palette.steel, metal), latchX, handleHeight, depths.leafCentre);
  return part;
}

