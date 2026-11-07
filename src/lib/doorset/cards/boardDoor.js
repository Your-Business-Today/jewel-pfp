import { doorTypes } from '../doorTypes.js';

export const boardDoorCards = [
  {
    key: 'leaf',
    doorTypes: [doorTypes.board],
    title: 'Leaf',
    does: 'The part that opens and closes, and the main barrier against fire and smoke. A vertically grooved board-style leaf, painted white on the closer side and red on the other.',
    lookFor: ['Leaf sits evenly in the frame', 'Gaps around it even and within the range shown', 'No holes or alterations that are not part of the door set']
  },
  {
    key: 'hinges',
    doorTypes: [doorTypes.board],
    title: 'Hinges',
    does: 'Four matching steel hinges, fire rated and CE or UKCA marked, carry the whole weight of the leaf.',
    lookFor: ['Every hinge present', 'Every screw fitted and tight', 'No wear, drop or movement in the leaf']
  },
  {
    key: 'letterplate',
    doorTypes: [doorTypes.board],
    title: 'Letterplate',
    does: 'A letter slot through the leaf, with a flap on the outer face and a cover on the closer side. A letterplate must be a fire-rated product with fire seals built in, made by the manufacturer, never cut on site.',
    lookFor: ['Flap and inside cover both fitted and closing', 'Letterplate firmly fixed', 'No gap around the slot']
  },
  {
    key: 'knocker',
    doorTypes: [doorTypes.board],
    title: 'Door knocker',
    does: 'A knocker on the outer face.',
    lookFor: ['Knocker firmly fixed', 'Fixings do not pass through the leaf beyond what the door set allows']
  }
];
