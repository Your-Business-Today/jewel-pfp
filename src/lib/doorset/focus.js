// @ts-nocheck — three.js ships no types for this project's checker
import * as THREE from 'three';
import { depths } from './measures.js';

const insideTurn = -0.5;
const outsideTurn = Math.PI + 0.5;

/** @param {ReturnType<typeof import('./orbit.js').createOrbit>} orbit @param {import('./parts.js').DoorPart[]} parts */
export function createFocus(orbit, parts) {
  const bounds = new THREE.Box3();
  let chosenPart = null;

  function turnToFaceOfChosen() {
    const centre = bounds.getCenter(new THREE.Vector3());
    if (centre.z < depths.leafBack) orbit.lookFrom({ turn: outsideTurn });
    if (centre.z > depths.leafFront) orbit.lookFrom({ turn: insideTurn });
  }

  /** @param {string} key */
  function choose(key) {
    chosenPart = parts.find((candidate) => candidate.key === key && candidate.group.visible) ?? null;
    if (!chosenPart) return orbit.overview();
    orbit.focusOn(bounds.setFromObject(chosenPart.group));
    if (chosenPart.view) return orbit.lookFrom(chosenPart.view);
    turnToFaceOfChosen();
  }

  function follow() {
    if (!chosenPart) return;
    const { group } = chosenPart;
    if (group.visible) orbit.focusOn(bounds.setFromObject(group));
  }

  return { choose, follow };
}
