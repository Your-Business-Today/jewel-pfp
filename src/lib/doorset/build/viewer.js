// @ts-nocheck — three.js ships no types for this project's checker
import { cylinder, metal } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, leaf } from '../measures.js';
import { doorTypes } from '../doorTypes.js';
import { leafMotion } from './leaf.js';

const viewerHeight = 1.5;
const viewerRadius = 0.008;
const wrapRadius = 0.011;
const doorsWithViewers = [doorTypes.flush, doorTypes.board];

/** @param {number} radius @param {number} length @param {number} colour @param {object} [finish] */
function throughTheLeaf(radius, length, colour, finish) {
  const mesh = cylinder(radius, length, colour, finish);
  mesh.rotation.x = Math.PI / 2;
  return mesh;
}

function buildViewerWrap() {
  const part = createPart('viewerWrap', leafMotion.explode, leafMotion.range, doorsWithViewers);
  part.isBuried = true;
  part.add(throughTheLeaf(wrapRadius, leaf.thickness - 0.002, palette.gold), 0, viewerHeight, depths.leafCentre);
  return part;
}

export function buildViewer() {
  const part = createPart('viewer', [0, 0.1, 0.4], [0.35, 0.5], doorsWithViewers);
  part.add(throughTheLeaf(viewerRadius, leaf.thickness + 0.006, palette.steel, metal), 0, viewerHeight, depths.leafCentre);
  return [part, buildViewerWrap()];
}
