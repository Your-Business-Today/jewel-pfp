// @ts-nocheck — three.js ships no types for this project's checker
import * as THREE from 'three';

/**
 * @param {HTMLCanvasElement} canvas
 * @param {THREE.Camera} camera
 * @param {THREE.Object3D} root
 */
export function createPicker(canvas, camera, root) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  /** @param {number} clientX @param {number} clientY @returns {string} */
  function partAt(clientX, clientY) {
    const bounds = canvas.getBoundingClientRect();
    pointer.set(((clientX - bounds.left) / bounds.width) * 2 - 1, -((clientY - bounds.top) / bounds.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObject(root, true).filter((hit) => hit.object.visible && hit.object.userData.partKey);
    const [nearest] = hits;
    return nearest?.object.userData.partKey ?? '';
  }

  return { partAt };
}
