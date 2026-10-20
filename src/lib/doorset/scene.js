// @ts-nocheck — three.js ships no types for this project's checker
import * as THREE from 'three';
import { palette } from './palette.js';
import { buildDoorset } from './assembly.js';
import { explodeParts, highlightParts } from './parts.js';
import { buildGapMarkers, gapAnchors } from './build/gapMarkers.js';
import { createOrbit } from './orbit.js';
import { createPicker } from './picker.js';

const explodeEase = 0.1;

/** @param {HTMLCanvasElement} canvas @param {{ onLabels?: (labels: { key: string, label: string, x: number, y: number }[]) => void }} listeners */
export function createDoorsetScene(canvas, listeners = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(palette.ink, 1);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 40);
  addLighting(scene);
  const parts = buildDoorset();
  const doorset = new THREE.Group();
  parts.forEach((part) => doorset.add(part.group));
  const gapMarkers = buildGapMarkers();
  doorset.add(gapMarkers);
  scene.add(doorset);
  const orbit = createOrbit(camera);
  const picker = createPicker(canvas, camera, doorset);
  const state = { explode: 0, shownExplode: 0, chosen: '', frame: 0, isStopped: false };

  function labelsOnScreen() {
    if (!gapMarkers.visible || !listeners.onLabels) return;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    listeners.onLabels(gapAnchors.map((anchor) => {
      const point = anchor.at.clone().project(camera);
      return { key: anchor.key, label: anchor.label, x: ((point.x + 1) / 2) * width, y: ((1 - point.y) / 2) * height };
    }));
  }

  function render() {
    if (state.isStopped) return;
    state.frame = requestAnimationFrame(render);
    state.shownExplode += (state.explode - state.shownExplode) * explodeEase;
    explodeParts(parts, state.shownExplode);
    orbit.widen(state.shownExplode);
    highlightParts(parts, state.chosen);
    orbit.step();
    renderer.render(scene, camera);
    labelsOnScreen();
  }

  function resize() {
    const width = canvas.clientWidth || 1;
    const height = canvas.clientHeight || 1;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  /** @param {string} key */
  function choose(key) {
    state.chosen = key;
    const part = parts.find((candidate) => candidate.key === key);
    if (!part) return orbit.overview();
    orbit.focusOn(new THREE.Box3().setFromObject(part.group));
  }

  resize();
  render();
  return {
    choose,
    resize,
    partAt: picker.partAt,
    drag: orbit.drag,
    setExplode: (/** @type {number} */ amount) => (state.explode = amount),
    setGapsShown: (/** @type {boolean} */ isShown) => {
      gapMarkers.visible = isShown;
      if (isShown) orbit.lookFrom({ turn: 0, tilt: 0.05 });
    },
    destroy: () => {
      state.isStopped = true;
      cancelAnimationFrame(state.frame);
      scene.traverse((object) => disposeOf(object));
      renderer.dispose();
    }
  };
}

/** @param {THREE.Scene} scene */
function addLighting(scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 1.2);
  key.position.set(2.5, 3.5, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(palette.gold, 0.35);
  rim.position.set(-3.5, 1, -2.5);
  scene.add(rim);
  const grid = new THREE.GridHelper(8, 32, palette.ink3, palette.ink2);
  scene.add(grid);
}

/** @param {THREE.Object3D} object */
function disposeOf(object) {
  object.geometry?.dispose();
  const materials = [object.material ?? []].flat();
  materials.forEach((material) => material.dispose());
}
