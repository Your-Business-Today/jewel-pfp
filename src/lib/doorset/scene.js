// @ts-nocheck — three.js ships no types for this project's checker
import * as THREE from 'three';
import { palette } from './palette.js';
import { buildDoorset } from './assembly.js';
import { explodeParts, highlightParts, showDoorType } from './parts.js';
import { doorTypes } from './doorTypes.js';
import { depths } from './measures.js';
import { addLighting, disposeOf } from './stage.js';
import { buildGapMarkers, gapLabelsOnScreen } from './build/gapMarkers.js';
import { createOrbit } from './orbit.js';
import { createPicker } from './picker.js';

const explodeEase = 0.1;
const insideTurn = -0.5;
const outsideTurn = Math.PI + 0.5;

/** @param {HTMLCanvasElement} canvas @param {{ onLabels?: (labels: { key: string, label: string, x: number, y: number }[]) => void }} listeners */
export function createDoorsetScene(canvas, listeners = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(palette.ink, 1);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 40);
  addLighting(scene);
  const parts = buildDoorset();
  showDoorType(parts, doorTypes.flush);
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
    listeners.onLabels(gapLabelsOnScreen(camera, canvas.clientWidth, canvas.clientHeight));
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
    const part = parts.find((candidate) => candidate.key === key && candidate.group.visible);
    if (!part) return orbit.overview();
    const bounds = new THREE.Box3().setFromObject(part.group);
    orbit.focusOn(bounds);
    turnToFaceOf(bounds);
  }

  /** @param {THREE.Box3} bounds */
  function turnToFaceOf(bounds) {
    const centre = bounds.getCenter(new THREE.Vector3());
    if (centre.z < depths.leafBack) orbit.lookFrom({ turn: outsideTurn });
    if (centre.z > depths.leafFront) orbit.lookFrom({ turn: insideTurn });
  }

  resize();
  render();
  return {
    choose,
    resize,
    partAt: picker.partAt,
    drag: orbit.drag,
    setDoorType: (/** @type {number} */ doorType) => showDoorType(parts, doorType),
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
