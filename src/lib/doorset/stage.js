// @ts-nocheck — three.js ships no types for this project's checker
import * as THREE from 'three';
import { palette } from './palette.js';

/** @param {THREE.Scene} scene */
export function addLighting(scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 1.2);
  key.position.set(2.5, 3.5, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(palette.gold, 0.35);
  rim.position.set(-3.5, 1, -2.5);
  scene.add(rim);
  const outsideFill = new THREE.DirectionalLight(0xffffff, 0.7);
  outsideFill.position.set(-2, 2.5, -4);
  scene.add(outsideFill);
  const grid = new THREE.GridHelper(8, 32, palette.ink3, palette.ink2);
  scene.add(grid);
}

/** @param {THREE.Object3D} object */
export function disposeOf(object) {
  object.geometry?.dispose();
  const materials = [object.material ?? []].flat();
  materials.forEach((material) => material.dispose());
}
