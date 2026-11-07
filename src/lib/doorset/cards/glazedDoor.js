import { doorTypes } from '../doorTypes.js';

const glazed = [doorTypes.glazed];

export const glazedDoorCards = [
  {
    key: 'leaf',
    doorTypes: glazed,
    title: 'Leaf',
    does: 'A painted leaf with a vision panel. Glass cannot be added to an existing fire door afterwards: a door that needs a vision panel is made that way in the factory.',
    lookFor: ['Leaf sits evenly in the frame', 'Gaps around it even and within the range shown']
  },
  {
    key: 'hinges',
    doorTypes: glazed,
    title: 'Hinges',
    does: 'Three hinges carry the leaf on the hinge side.',
    lookFor: ['All hinges present', 'Every screw fitted and tight']
  },
  {
    key: 'glass',
    doorTypes: glazed,
    title: 'Glass',
    does: 'Fire-resisting glass, rated to match the door. Ordinary glass shatters quickly in a fire. It comes out once the beads are off.',
    lookFor: ['Glass not cracked or replaced with something else', 'Glass held firmly, with no rattle']
  },
  {
    key: 'glazingTape',
    doorTypes: glazed,
    title: 'Intumescent glazing tape',
    does: 'Intumescent tape runs round the edge of the glass, between the glass and the leaf.',
    lookFor: ['Tape continuous round the whole edge of the glass']
  },
  {
    key: 'beads',
    doorTypes: glazed,
    title: 'Glazing beads',
    does: 'Beads on each face hold the glass in the leaf. They are the first part of the glazing to come off.',
    lookFor: ['Beads on both faces, fixed firmly and not split']
  }
];
