import { doorTypes } from '../doorTypes.js';

export const flushDoorCards = [
  {
    key: 'leaf',
    doorTypes: [doorTypes.flush],
    title: 'Leaf',
    does: 'The part that opens and closes, and the main barrier against fire and smoke. An oak-effect veneered flush leaf with a solid, dense core and timber lippings on its edges.',
    lookFor: ['Leaf sits evenly in the frame', 'Gaps around it even and within the range shown', 'No holes or alterations that are not part of the door set']
  },
  {
    key: 'hinges',
    doorTypes: [doorTypes.flush],
    title: 'Hinges',
    does: 'Three matching steel hinges, fire rated and CE or UKCA marked, carry the whole weight of the leaf.',
    lookFor: ['All three hinges present', 'Every screw fitted and tight', 'No wear, drop or movement in the leaf']
  },
  {
    key: 'chain',
    doorTypes: [doorTypes.flush],
    title: 'Door chain',
    does: 'A chain between the frame and the leaf, on the lock side.',
    lookFor: ['Chain and its fixings secure']
  }
];
