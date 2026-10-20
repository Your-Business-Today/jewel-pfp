// @ts-nocheck — three.js ships no types for this project's checker
import * as THREE from 'three';
import { block, metal, solid } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, edges, frame } from '../measures.js';

const keeperHeight = 1.45;
const linkCount = 7;
const linkStep = 0.026;

export function buildChain() {
  const part = createPart('chain', [0.4, 0.05, 0.3], [0.35, 0.5]);
  const keeperX = edges.lockJamb;
  const keeperZ = depths.frameFront + 0.006;
  part.add(block(0.02, 0.07, 0.012, palette.steel, metal), keeperX, keeperHeight, keeperZ);
  for (let link = 0; link < linkCount; link++) {
    const ring = solid(new THREE.TorusGeometry(0.008, 0.0022, 8, 16), palette.steel, metal);
    if (link % 2) ring.rotation.y = Math.PI / 2;
    part.add(ring, keeperX, keeperHeight - 0.04 - link * linkStep, keeperZ + 0.004);
  }
  part.add(block(0.018, 0.03, 0.01, palette.steel, metal), edges.lock - frame.faceWidth, keeperHeight + 0.01, depths.leafFront + 0.005);
  return part;
}
