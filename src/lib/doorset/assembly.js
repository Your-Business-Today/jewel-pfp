import { buildFrame } from './build/frame.js';
import { buildLeaf } from './build/leaf.js';
import { buildBoardLeaf } from './build/boardLeaf.js';
import { buildHinges } from './build/hinges.js';
import { buildCloser } from './build/closer.js';
import { buildLever } from './build/lever.js';
import { buildViewer } from './build/viewer.js';
import { buildChain } from './build/chain.js';
import { buildLetterplate } from './build/letterplate.js';
import { buildKnocker } from './build/knocker.js';

export function buildDoorset() {
  const leaves = [buildLeaf(), buildBoardLeaf()];
  const furniture = [buildCloser(), ...buildLever(), buildViewer(), buildChain(), buildLetterplate(), buildKnocker()];
  return [buildFrame(), ...leaves, ...buildHinges(), ...furniture];
}
