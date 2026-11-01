import { gaps, surround } from './measures.js';

export const sideDrawing = {
  width: 250,
  height: 180,
  labelX: 124,
  description: 'Side view: a section through the middle of the door set, from the wall above the frame to the floor',
  caption: 'Side view through the middle of the door set. The leaf is shortened and the gaps are drawn larger than life so they can be seen.'
};

export const sideShapes = [
  { key: 'wallAbove', tone: 'wall', x: 10, y: 0, width: 100, height: 28 },
  { key: 'fireStopping', tone: 'fireStopping', x: 18, y: 28, width: 84, height: 8 },
  { key: 'architraveInside', tone: 'smoke', x: 4, y: 20, width: 6, height: 32 },
  { key: 'architraveOutside', tone: 'smoke', x: 110, y: 20, width: 6, height: 32 },
  { key: 'frameHead', tone: 'frame', x: 18, y: 36, width: 84, height: 12 },
  { key: 'stop', tone: 'frame', x: 18, y: 48, width: 19, height: 8 },
  { key: 'leafTop', tone: 'leaf', x: 37, y: 54, width: 41, height: 34 },
  { key: 'leafBottom', tone: 'leaf', x: 37, y: 94, width: 41, height: 56 },
  { key: 'floor', tone: 'wall', x: 0, y: 162, width: 120, height: 14 }
];

export const sideCallouts = [
  { key: 'wallAbove', label: 'Wall above the frame', labelY: 8, pointX: 70, pointY: 12 },
  { key: 'fireStopping', label: `Fire stopping, frame to wall: ${surround.fireStoppingFigure}`, labelY: 20, pointX: 70, pointY: 32 },
  { key: 'architrave', label: 'Architrave, removed to show the fire stopping', labelY: 32, pointX: 113, pointY: 44 },
  { key: 'frameHead', label: 'Frame head', labelY: 44, pointX: 90, pointY: 42 },
  { key: 'stop', label: 'Stop on the frame', labelY: 56, pointX: 28, pointY: 52 },
  { key: 'headGap', label: `Gap at the head: ${gaps.edgeRange}`, labelY: 68, pointX: 57, pointY: 51 },
  { key: 'leaf', label: 'Leaf (shortened)', labelY: 120, pointX: 57, pointY: 125 },
  { key: 'thresholdGap', label: `Threshold gap: ${gaps.thresholdFigure}`, labelY: 150, pointX: 57, pointY: 156 },
  { key: 'floor', label: 'Floor', labelY: 168, pointX: 90, pointY: 169 }
];
