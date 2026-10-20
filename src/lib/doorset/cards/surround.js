import { markers } from '../markers.js';
import { surround } from '../measures.js';

export const surroundCards = [
  {
    key: 'wall',
    title: 'Wall',
    marker: markers.confirm,
    does: 'The wall the door set is fitted into. The door set and the wall around it work together.',
    lookFor: ['No holes or damage in the wall around the frame'],
    toConfirm: ['Wall construction around the opening']
  },
  {
    key: 'architrave',
    title: 'Architrave',
    marker: markers.confirm,
    does: 'The trim on each face that covers the joint between the frame and the wall. Take the door set apart to remove it and see what is behind.',
    lookFor: ['Architrave fitted on both faces'],
    toConfirm: ['Architrave size and how it is fixed']
  },
  {
    key: 'packing',
    title: 'Packing',
    marker: markers.confirm,
    does: 'Packers between the frame and the wall at each fixing, holding the frame straight and square.',
    lookFor: ['Packers at every fixing point', 'Frame straight and square in the opening'],
    toConfirm: ['Packing material, from the door set’s fitting instructions']
  },
  {
    key: 'fireStopping',
    title: 'Fire stopping',
    marker: markers.confirm,
    does: `Fire stopping material fills the gap between the frame and the wall, which should be ${surround.fireStoppingFigure}.`,
    lookFor: [`Gap between frame and wall ${surround.fireStoppingFigure}`, 'Fire stopping fills the gap the full depth of the frame, with no voids'],
    toConfirm: ['Fire stopping product, from the door set’s fitting instructions']
  },
  {
    key: 'fixings',
    title: 'Frame fixings',
    marker: markers.confirm,
    does: `Fixings through each side of the frame into the wall, at ${surround.fixingCentresFigure}.`,
    lookFor: ['Fixings at every point along both sides of the frame', 'Frame does not move when the door is opened and closed'],
    toConfirm: ['Fixing type, from the door set’s fitting instructions']
  }
];
