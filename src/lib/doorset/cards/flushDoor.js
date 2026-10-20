import { markers } from '../markers.js';
import { doorTypes } from '../doorTypes.js';

export const flushDoorCards = [
  {
    key: 'leaf',
    doorTypes: [doorTypes.flush],
    title: 'Leaf',
    marker: markers.seen,
    does: 'The door itself. Oak-effect veneered flush leaf, as door type 1.',
    lookFor: ['Leaf sits evenly in the frame', 'Gaps around it even and within the range shown', 'No holes or alterations that are not part of the door set'],
    toConfirm: ['Leaf construction, from the door set’s certification']
  },
  {
    key: 'hinges',
    doorTypes: [doorTypes.flush],
    title: 'Hinges',
    marker: markers.seen,
    does: 'Three hinges carry the leaf on the hinge side.',
    lookFor: ['All three hinges present', 'Every screw fitted and tight', 'No wear, drop or movement in the leaf'],
    toConfirm: ['Hinge type, from the door set’s certification']
  },
  {
    key: 'chain',
    doorTypes: [doorTypes.flush],
    title: 'Door chain',
    marker: markers.seen,
    does: 'A chain between the frame and the leaf, on the lock side.',
    lookFor: ['Chain and its fixings secure'],
    toConfirm: ['Whether a chain is within the door set’s certification']
  }
];
