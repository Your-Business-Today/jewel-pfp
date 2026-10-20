// @ts-nocheck — three.js ships no types for this project's checker
import * as THREE from 'three';
import { palette } from './palette.js';

const edgeOpacity = 0.55;
const upright = new THREE.Vector3(0, 1, 0);

/**
 * @param {THREE.BufferGeometry} geometry
 * @param {number} colour
 * @param {{ metalness?: number, roughness?: number, opacity?: number, edge?: number }} finish
 */
export function solid(geometry, colour, finish = {}) {
  const material = new THREE.MeshStandardMaterial({
    color: colour,
    roughness: finish.roughness ?? 0.8,
    metalness: finish.metalness ?? 0.05,
    transparent: true,
    opacity: finish.opacity ?? 1,
    emissive: palette.ink
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData.opacity = material.opacity;
  const edgeColour = finish.edge ?? palette.muted;
  const edgeMaterial = new THREE.LineBasicMaterial({ color: edgeColour, transparent: true, opacity: edgeOpacity });
  const outline = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgeMaterial);
  outline.userData.colour = edgeColour;
  mesh.add(outline);
  mesh.userData.outline = outline;
  return mesh;
}

/**
 * @param {number} width
 * @param {number} height
 * @param {number} depth
 * @param {number} colour
 * @param {object} [finish]
 */
export function block(width, height, depth, colour, finish) {
  return solid(new THREE.BoxGeometry(width, height, depth), colour, finish);
}

/**
 * @param {number} radius
 * @param {number} length
 * @param {number} colour
 * @param {object} [finish]
 */
export function cylinder(radius, length, colour, finish) {
  return solid(new THREE.CylinderGeometry(radius, radius, length, 24), colour, finish);
}

/**
 * @param {THREE.Vector3} from
 * @param {THREE.Vector3} to
 * @param {number} radius
 * @param {number} colour
 * @param {object} [finish]
 */
export function rodBetween(from, to, radius, colour, finish) {
  const direction = new THREE.Vector3().subVectors(to, from);
  const rod = cylinder(radius, direction.length(), colour, finish);
  rod.quaternion.setFromUnitVectors(upright, direction.clone().normalize());
  rod.position.copy(from).addScaledVector(direction, 0.5);
  return rod;
}

export const metal = { metalness: 0.7, roughness: 0.35 };
