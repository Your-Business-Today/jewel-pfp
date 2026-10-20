// @ts-nocheck — three.js ships no types for this project's checker
import * as THREE from 'three';
import { markerColours, palette } from './palette.js';
import { everyDoorType } from './doorTypes.js';
import { everySealConfiguration } from './seals.js';

const easing = (/** @type {number} */ t) => t * t * (3 - 2 * t);
const clampToUnit = (/** @type {number} */ t) => Math.min(1, Math.max(0, t));
const glowWhenChosen = 0.35;
const fadedOpacity = 0.15;
const easeRate = 0.15;

/**
 * @typedef {{ key: string, doorTypes: number[], sealConfigurations: string[], isBuried: boolean, group: THREE.Group, explode: THREE.Vector3, range: [number, number], meshes: THREE.Mesh[], add: (mesh: THREE.Mesh, x?: number, y?: number, z?: number) => THREE.Mesh }} DoorPart
 */

/**
 * @param {string} key
 * @param {[number, number, number]} explode
 * @param {[number, number]} range
 * @param {number[]} [doorTypes]
 * @returns {DoorPart}
 */
export function createPart(key, explode, range, doorTypes = everyDoorType) {
  const group = new THREE.Group();
  group.userData.partKey = key;
  /** @type {THREE.Mesh[]} */
  const meshes = [];
  const add = (/** @type {THREE.Mesh} */ mesh, x = 0, y = 0, z = 0) => {
    if (x || y || z) mesh.position.set(x, y, z);
    mesh.userData.partKey = key;
    group.add(mesh);
    meshes.push(mesh);
    return mesh;
  };
  return { key, doorTypes, sealConfigurations: everySealConfiguration, isBuried: false, group, explode: new THREE.Vector3(...explode), range, meshes, add };
}

/**
 * @param {DoorPart[]} parts
 * @param {number} progress
 */
export function explodeParts(parts, progress) {
  for (const part of parts) {
    const [start, end] = part.range;
    const isAnchor = end <= start;
    const share = isAnchor ? 0 : easing(clampToUnit((progress - start) / (end - start)));
    part.group.position.copy(part.explode).multiplyScalar(share);
  }
}

/**
 * @param {DoorPart[]} parts
 * @param {{ doorType: number, sealConfiguration: string }} choices
 */
export function showChoices(parts, choices) {
  for (const part of parts) {
    part.group.visible = part.doorTypes.includes(choices.doorType) && part.sealConfigurations.includes(choices.sealConfiguration);
  }
}

/**
 * @param {DoorPart[]} parts
 * @param {string} chosenKey
 */
export function highlightParts(parts, chosenKey) {
  const isLookingInside = parts.some((part) => part.key === chosenKey && part.isBuried);
  for (const part of parts) {
    const isChosen = part.key === chosenKey;
    const isFaded = isLookingInside && !isChosen;
    for (const mesh of part.meshes) paintMesh(mesh, isChosen, isFaded);
  }
}

/**
 * @param {THREE.Mesh} mesh
 * @param {boolean} isChosen
 * @param {boolean} isFaded
 */
function paintMesh(mesh, isChosen, isFaded) {
  const material = /** @type {THREE.MeshStandardMaterial} */ (mesh.material);
  const glow = isChosen ? glowWhenChosen : 0;
  material.emissive.setHex(isChosen ? palette.signal : palette.ink);
  material.emissiveIntensity += (glow - material.emissiveIntensity) * easeRate;
  const opacity = isFaded ? fadedOpacity : mesh.userData.opacity;
  material.opacity += (opacity - material.opacity) * easeRate;
  material.depthWrite = !isFaded;
  const outline = mesh.userData.outline;
  if (outline) outline.material.color.setHex(isChosen ? markerColours.yellow : outline.userData.colour);
}
