import { markers } from '../markers.js';

export const sealCards = [
  {
    key: 'seals',
    title: 'Seals in the frame',
    marker: markers.confirm,
    does: 'Intumescent strips set into the frame around the leaf swell in a fire and close the gap. One arrangement also has a cold smoke seal that touches the leaf edge.',
    lookFor: ['Strips continuous along both sides and the head', 'No strips painted over, damaged or missing', 'Smoke seal, where fitted, touching the leaf all round'],
    toConfirm: ['Which seal arrangement each door set has', 'Seal product and size, from the door set’s certification']
  },
  {
    key: 'smokeSeal',
    title: 'Smoke seal on the stop',
    marker: markers.confirm,
    does: 'An independent surface-mounted smoke seal on the stop of the frame, touching the face of the leaf when the door is shut.',
    lookFor: ['Seal touching the leaf all round when the door is shut', 'Seal fixed firmly and not torn'],
    toConfirm: ['Smoke seal product, from the door set’s certification']
  }
];
