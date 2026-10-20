// @ts-nocheck — three.js ships no types for this project's checker
import * as THREE from 'three';

const ease = 0.08;
const dragSpeed = 0.006;
const tiltLimit = 1.2;
const minimumRadius = 0.6;
const focusDistance = 2.2;
const spreadDistance = 2.2;

/** @param {THREE.PerspectiveCamera} camera */
export function createOrbit(camera) {
  const target = new THREE.Vector3(0, 1.05, 0);
  const aim = { target: target.clone(), radius: 3.4, turn: -0.5, tilt: 0.12 };
  const now = { target: target.clone(), radius: aim.radius, turn: aim.turn, tilt: aim.tilt };
  let spread = 0;

  function step() {
    now.target.lerp(aim.target, ease);
    now.radius += (aim.radius + spread * spreadDistance - now.radius) * ease;
    now.turn += (aim.turn - now.turn) * ease;
    now.tilt += (aim.tilt - now.tilt) * ease;
    const flat = now.radius * Math.cos(now.tilt);
    camera.position.set(now.target.x + flat * Math.sin(now.turn), now.target.y + now.radius * Math.sin(now.tilt), now.target.z + flat * Math.cos(now.turn));
    camera.lookAt(now.target);
  }

  /** @param {THREE.Box3} bounds */
  function focusOn(bounds) {
    const size = bounds.getSize(new THREE.Vector3()).length();
    bounds.getCenter(aim.target);
    aim.radius = Math.max(minimumRadius, size * focusDistance);
  }

  function overview() {
    aim.target.copy(target);
    aim.radius = 3.4;
  }

  /** @param {number} across @param {number} down */
  function drag(across, down) {
    aim.turn -= across * dragSpeed;
    aim.tilt = Math.min(tiltLimit, Math.max(-tiltLimit, aim.tilt + down * dragSpeed));
  }

  /** @param {{ turn?: number, tilt?: number, radius?: number }} view */
  function lookFrom(view) {
    Object.assign(aim, view);
  }

  /** @param {number} amount */
  function widen(amount) {
    spread = amount;
  }

  return { step, focusOn, overview, drag, lookFrom, widen };
}
