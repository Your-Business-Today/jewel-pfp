import { buildFrame } from './build/frame.js';
import { buildLeaf } from './build/leaf.js';
import { buildHinges } from './build/hinges.js';
import { buildCloser } from './build/closer.js';
import { buildLever } from './build/lever.js';
import { buildViewer } from './build/viewer.js';
import { buildChain } from './build/chain.js';

export function buildDoorset() {
  return [buildFrame(), buildLeaf(), buildHinges(), buildCloser(), buildLever(), buildViewer(), buildChain()];
}
