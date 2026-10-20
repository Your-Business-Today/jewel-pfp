// @ts-nocheck — three.js ships no types for this project's checker
import * as THREE from 'three';
import { block, cylinder, metal, rodBetween } from '../meshes.js';
import { palette } from '../palette.js';
import { createPart } from '../parts.js';
import { depths, edges, frame, heights } from '../measures.js';

const body = { width: 0.27, height: 0.06, depth: 0.05, fromHingeEdge: 0.03 };
const mainArmLength = 0.2;
const armRadius = 0.007;
const armLift = 0.012;

export function buildCloser() {
  const part = createPart('closer', [0.15, 0.3, 0.6], [0.1, 0.25]);
  const bodyX = edges.hinge + body.fromHingeEdge + body.width / 2;
  const bodyY = heights.leafTop - body.height / 2 - 0.005;
  const bodyZ = depths.leafFront + body.depth / 2;
  const bodyMesh = part.add(block(body.width, body.height, body.depth, palette.steel, metal), bodyX, bodyY, bodyZ);
  const spindle = new THREE.Vector3(bodyX + body.width / 2 - 0.05, bodyY + body.height / 2 + armLift, bodyZ);
  const elbow = spindle.clone().add(new THREE.Vector3(0, 0, mainArmLength));
  const shoe = new THREE.Vector3(spindle.x + 0.14, heights.frameTop - frame.headHeight / 2, depths.frameFront + 0.012);
  const cap = part.add(cylinder(0.012, armLift * 2, palette.steel, metal), spindle.x, spindle.y - armLift, spindle.z);
  const mainArm = part.add(rodBetween(spindle, elbow, armRadius, palette.steel, metal));
  const forearm = part.add(rodBetween(elbow, shoe, armRadius * 0.8, palette.steel, metal));
  part.add(block(0.06, 0.02, 0.024, palette.steel, metal), shoe.x, shoe.y, shoe.z);
  part.motion = { body: bodyMesh, cap, mainArm, forearm, spindle, elbow, shoe, bodyAt: bodyMesh.position.clone(), capAt: cap.position.clone() };
  return part;
}
