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
import { buildWall } from './build/wall.js';
import { buildArchitrave } from './build/architrave.js';
import { buildFireStopping, buildPacking } from './build/surroundGap.js';
import { buildFixings } from './build/fixings.js';
import { buildSeals } from './build/seals.js';

export function buildDoorset() {
  const leaves = [buildLeaf(), buildBoardLeaf()];
  const furniture = [buildCloser(), ...buildLever(), buildViewer(), buildChain(), buildLetterplate(), buildKnocker()];
  const surround = [buildWall(), ...buildArchitrave(), buildPacking(), buildFireStopping(), buildFixings(), ...buildSeals()];
  return [...surround, buildFrame(), ...leaves, ...buildHinges(), ...furniture];
}
