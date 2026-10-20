// @ts-nocheck — three.js ships no types for this project's checker
import * as THREE from 'three';
import { alignRod } from './meshes.js';
import { depths, edges, gaps } from './measures.js';

const leafBorneKeys = new Set(['leaf', 'glass', 'glazingTape', 'beads', 'lever', 'viewer', 'viewerWrap', 'letterplate', 'knocker', 'hingePads', 'certificationLabel', 'certificationPlug', 'lock', 'lockIntumescent']);
const pivot = new THREE.Vector3(edges.hinge - gaps.edge / 2, 0, depths.leafFront);
const upright = new THREE.Vector3(0, 1, 0);

/** @param {THREE.Vector3} point @param {number} angle */
function aroundHinge(point, angle) {
  return point.clone().sub(pivot).applyAxisAngle(upright, angle).add(pivot);
}

/** @param {THREE.Vector3} from @param {THREE.Vector3} to */
const flatDistance = (from, to) => Math.hypot(to.x - from.x, to.z - from.z);

function elbowBetween(spindle, motion) {
  const mainArmReach = flatDistance(motion.spindle, motion.elbow);
  const forearmReach = flatDistance(motion.elbow, motion.shoe);
  const toShoe = new THREE.Vector2(motion.shoe.x - spindle.x, motion.shoe.z - spindle.z);
  const reach = toShoe.length();
  const along = (mainArmReach ** 2 - forearmReach ** 2 + reach ** 2) / (2 * reach);
  const across = Math.sqrt(Math.max(0, mainArmReach ** 2 - along ** 2));
  const direction = toShoe.divideScalar(reach);
  const candidates = [1, -1].map((side) => new THREE.Vector3(spindle.x + direction.x * along - side * direction.y * across, spindle.y, spindle.z + direction.y * along + side * direction.x * across));
  const lastElbow = motion.lastElbow ?? motion.elbow;
  const [nearest] = candidates.sort((first, second) => first.distanceTo(lastElbow) - second.distanceTo(lastElbow));
  motion.lastElbow = nearest;
  return nearest;
}

function moveCloser(motion, angle) {
  const spindle = aroundHinge(motion.spindle, angle);
  motion.body.position.copy(aroundHinge(motion.bodyAt, angle));
  motion.body.rotation.y = angle;
  motion.cap.position.copy(aroundHinge(motion.capAt, angle));
  const elbow = elbowBetween(spindle, motion);
  alignRod(motion.mainArm, spindle, elbow);
  alignRod(motion.forearm, elbow, motion.shoe);
}

/** @param {import('./parts.js').DoorPart[]} parts @param {number} angle */
export function swingParts(parts, angle) {
  const offset = pivot.clone().sub(pivot.clone().applyAxisAngle(upright, angle));
  for (const part of parts) {
    if (part.motion) moveCloser(part.motion, angle);
    if (!leafBorneKeys.has(part.key)) continue;
    part.group.rotation.y = angle;
    part.group.position.add(offset);
  }
}
