// @ts-nocheck — three.js ships no types for this project's checker
import * as THREE from 'three';
import { markerColours } from '../palette.js';
import { depths, edges, fixingHeights, gaps, heights, leaf, surround } from '../measures.js';

const drawnWidth = 0.012;
const markerDepth = 0.004;

/**
 * @param {number} width
 * @param {number} height
 * @param {number} x
 * @param {number} y
 */
function bar(width, height, x, y) {
  const material = new THREE.MeshBasicMaterial({ color: markerColours.red });
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, markerDepth), material);
  mesh.position.set(x, y, depths.leafFront + markerDepth);
  return mesh;
}

export const gapAnchors = [
  { key: 'head', label: `Head gap: ${gaps.edgeRange}`, at: new THREE.Vector3(0, heights.headSoffit + 0.02, depths.leafFront) },
  { key: 'hinge', label: `Hinge side: ${gaps.edgeRange}`, at: new THREE.Vector3(edges.hinge - 0.02, 1.6, depths.leafFront) },
  { key: 'lock', label: `Lock side: ${gaps.edgeRange}`, at: new THREE.Vector3(edges.lock + 0.02, 1.6, depths.leafFront) },
  { key: 'threshold', label: `Threshold: ${gaps.thresholdFigure}`, at: new THREE.Vector3(0, 0, depths.leafFront) },
  { key: 'wall', label: `Frame to wall: ${surround.fireStoppingFigure}`, at: new THREE.Vector3(surround.frameOuterSide + surround.fireStoppingGap, 1.2, depths.frameFront) },
  { key: 'fixings', label: `Fixings: ${surround.fixingCentresFigure}`, at: new THREE.Vector3(-surround.frameOuterSide, fixingHeights[1], depths.frameFront) }
];

/** @param {THREE.Camera} camera @param {number} width @param {number} height */
export function gapLabelsOnScreen(camera, width, height) {
  return gapAnchors.map((anchor) => {
    const point = anchor.at.clone().project(camera);
    return { key: anchor.key, label: anchor.label, x: ((point.x + 1) / 2) * width, y: ((1 - point.y) / 2) * height };
  });
}

export function buildGapMarkers() {
  const group = new THREE.Group();
  group.add(bar(leaf.width, drawnWidth, 0, heights.leafTop + drawnWidth / 2));
  group.add(bar(drawnWidth, leaf.height, edges.hinge - drawnWidth / 2, heights.leafMiddle));
  group.add(bar(drawnWidth, leaf.height, edges.lock + drawnWidth / 2, heights.leafMiddle));
  group.add(bar(leaf.width, drawnWidth * 1.6, 0, heights.leafBottom - drawnWidth * 0.8));
  group.visible = false;
  return group;
}
