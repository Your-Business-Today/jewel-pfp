export const leaf = { width: 0.926, height: 2.04, thickness: 0.054 };

export const gaps = { edge: 0.003, threshold: 0.008, edgeRange: '2 to 4 mm', thresholdFigure: 'nominally 8 mm' };

export const frame = { faceWidth: 0.035, depth: 0.11, headHeight: 0.035, stopWidth: 0.012, stopDepth: 0.025 };

const halfDepth = frame.depth / 2;

export const depths = {
  frameFront: halfDepth,
  stopFront: -halfDepth + frame.stopDepth,
  leafBack: -halfDepth + frame.stopDepth,
  leafFront: -halfDepth + frame.stopDepth + leaf.thickness,
  leafCentre: -halfDepth + frame.stopDepth + leaf.thickness / 2
};

export const heights = {
  leafBottom: gaps.threshold,
  leafTop: gaps.threshold + leaf.height,
  leafMiddle: gaps.threshold + leaf.height / 2,
  headSoffit: gaps.threshold + leaf.height + gaps.edge,
  frameTop: gaps.threshold + leaf.height + gaps.edge + frame.headHeight
};

export const edges = {
  hinge: -leaf.width / 2,
  lock: leaf.width / 2,
  hingeJamb: -leaf.width / 2 - gaps.edge - frame.faceWidth / 2,
  lockJamb: leaf.width / 2 + gaps.edge + frame.faceWidth / 2
};
