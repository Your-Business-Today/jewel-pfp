// @ts-nocheck — three.js ships no types for this project's checker
import { block, cylinder, metal } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, edges, heights, leaf } from '../measures.js';
import { leafMotion } from './leaf.js';
import { handleHeight } from './lever.js';

const label = { width: 0.06, depth: 0.025, thickness: 0.001, fromHingeEdge: 0.15 };
const plug = { radius: 0.005, length: 0.012, height: 1.3 };
const lockCase = { width: 0.09, height: 0.18, depth: 0.016 };
const intumescentThickness = 0.002;
const lockCaseX = edges.lock - lockCase.width / 2;

/** @param {string} key */
function partOnTheLeaf(key) {
  const part = createPart(key, leafMotion.explode, leafMotion.range);
  part.isBuried = true;
  return part;
}

function buildCertificationLabel() {
  const part = partOnTheLeaf('certificationLabel');
  part.view = { tilt: 0.9 };
  part.add(block(label.width, label.thickness, label.depth, palette.paint), edges.hinge + label.fromHingeEdge, heights.leafTop + label.thickness / 2, depths.leafCentre);
  return part;
}

function buildCertificationPlug() {
  const part = partOnTheLeaf('certificationPlug');
  part.view = { turn: -Math.PI / 2, tilt: 0.1 };
  const plugMesh = cylinder(plug.radius, plug.length, palette.paint);
  plugMesh.rotation.z = Math.PI / 2;
  part.add(plugMesh, edges.hinge + plug.length / 2 - 0.001, plug.height, depths.leafCentre);
  return part;
}

function buildLockIntumescent() {
  const part = partOnTheLeaf('lockIntumescent');
  const sleeveDepth = lockCase.depth + 2 * intumescentThickness;
  for (const face of [-1, 1]) {
    part.add(block(lockCase.width, lockCase.height, intumescentThickness, palette.gold), lockCaseX, handleHeight, depths.leafCentre + (face * (sleeveDepth - intumescentThickness)) / 2);
  }
  return part;
}

function buildLockCase() {
  const part = createPart('lock', [0.2, 0, 0.55], [0.45, 0.6]);
  part.isBuried = true;
  part.add(block(lockCase.width, lockCase.height, lockCase.depth, palette.steel, metal), lockCaseX, handleHeight, depths.leafCentre);
  part.add(block(0.004, lockCase.height + 0.05, 0.022, palette.steel, metal), edges.lock - 0.002, handleHeight, depths.leafCentre);
  return part;
}

export function buildHiddenDetail() {
  return [buildCertificationLabel(), buildCertificationPlug(), buildLockIntumescent(), buildLockCase()];
}
