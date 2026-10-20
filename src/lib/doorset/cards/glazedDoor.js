import { markers } from '../markers.js';
import { doorTypes } from '../doorTypes.js';

const glazed = [doorTypes.glazed];

export const glazedDoorCards = [
  {
    key: 'leaf',
    doorTypes: glazed,
    title: 'Leaf',
    marker: markers.confirm,
    does: 'A painted leaf with a vision panel, drawn to show how glazing is built. It is not taken from a photo.',
    lookFor: ['Leaf sits evenly in the frame', 'Gaps around it even and within the range shown'],
    toConfirm: ['Whether the door sets surveyed have glazing, and its size and position']
  },
  {
    key: 'hinges',
    doorTypes: glazed,
    title: 'Hinges',
    marker: markers.confirm,
    does: 'Three hinges carry the leaf on the hinge side.',
    lookFor: ['All hinges present', 'Every screw fitted and tight'],
    toConfirm: ['Hinge type and number, from the door set’s certification']
  },
  {
    key: 'glass',
    doorTypes: glazed,
    title: 'Glass',
    marker: markers.confirm,
    does: 'The glass in the vision panel. It comes out once the beads are off.',
    lookFor: ['Glass not cracked or replaced with something else', 'Glass held firmly, with no rattle'],
    toConfirm: ['Glass type, from the door set’s certification']
  },
  {
    key: 'glazingTape',
    doorTypes: glazed,
    title: 'Intumescent glazing tape',
    marker: markers.confirm,
    does: 'Intumescent tape runs round the edge of the glass, between the glass and the leaf.',
    lookFor: ['Tape continuous round the whole edge of the glass'],
    toConfirm: ['Glazing system, from the door set’s certification']
  },
  {
    key: 'beads',
    doorTypes: glazed,
    title: 'Glazing beads',
    marker: markers.confirm,
    does: 'Beads on each face hold the glass in the leaf. They are the first part of the glazing to come off.',
    lookFor: ['Beads on both faces, fixed firmly and not split'],
    toConfirm: ['Bead size and fixing, from the door set’s certification']
  }
];
