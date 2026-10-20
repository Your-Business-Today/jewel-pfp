import { markers } from '../markers.js';
import { doorTypes } from '../doorTypes.js';

export const boardDoorCards = [
  {
    key: 'leaf',
    doorTypes: [doorTypes.board],
    title: 'Leaf',
    marker: markers.seen,
    does: 'The door itself. A vertically grooved board-style leaf, painted white on the closer side and red on the other, as door type 2.',
    lookFor: ['Leaf sits evenly in the frame', 'Gaps around it even and within the range shown', 'No holes or alterations that are not part of the door set'],
    toConfirm: ['Leaf construction, from the door set’s certification']
  },
  {
    key: 'hinges',
    doorTypes: [doorTypes.board],
    title: 'Hinges',
    marker: markers.confirm,
    does: 'Four hinges appear to carry the leaf on the hinge side.',
    lookFor: ['Every hinge present', 'Every screw fitted and tight', 'No wear, drop or movement in the leaf'],
    toConfirm: ['How many hinges door type 2 has: four appear in the photo', 'Hinge type, from the door set’s certification']
  },
  {
    key: 'letterplate',
    doorTypes: [doorTypes.board],
    title: 'Letterplate',
    marker: markers.seen,
    does: 'A letter slot through the leaf, with a flap on the outer face and a cover on the closer side.',
    lookFor: ['Flap and inside cover both fitted and closing', 'Letterplate firmly fixed', 'No gap around the slot'],
    toConfirm: ['Whether the letterplate is within the door set’s certification']
  },
  {
    key: 'knocker',
    doorTypes: [doorTypes.board],
    title: 'Door knocker',
    marker: markers.seen,
    does: 'A knocker on the outer face.',
    lookFor: ['Knocker firmly fixed', 'Fixings do not pass through the leaf beyond what the door set allows'],
    toConfirm: ['How the knocker is fixed, and whether it is within the door set’s certification']
  }
];
