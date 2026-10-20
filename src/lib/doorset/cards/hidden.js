import { markers } from '../markers.js';

export const hiddenCards = [
  {
    key: 'certificationLabel',
    title: 'Certification label',
    marker: markers.confirm,
    does: 'A label on the top edge of the leaf that identifies the door set. Only a plain mark is drawn here.',
    lookFor: ['Label present on the top edge', 'Label readable and not painted over'],
    toConfirm: ['What the label carries, from the door set’s certification']
  },
  {
    key: 'certificationPlug',
    title: 'Certification plug',
    marker: markers.confirm,
    does: 'A plug set into the hinge edge of the leaf that identifies the door set. Only a plain mark is drawn here.',
    lookFor: ['Plug present in the hinge edge', 'Plug not painted over or removed'],
    toConfirm: ['What the plug carries, from the door set’s certification']
  },
  {
    key: 'hingePads',
    title: 'Intumescent pads behind the hinges',
    marker: markers.confirm,
    does: 'Intumescent pads sit behind each hinge leaf, where the hinge is let into the door edge.',
    lookFor: ['A pad behind every hinge', 'Pads not missing or damaged when a hinge is changed'],
    toConfirm: ['Pad product and size, from the door set’s certification']
  },
  {
    key: 'lock',
    title: 'Lock case',
    marker: markers.confirm,
    does: 'The lock case sits in a pocket in the leaf at the lock edge. Take the door set apart to bring it out.',
    lookFor: ['Lock case the right one for the door set', 'Pocket in the leaf no larger than the lock case needs'],
    toConfirm: ['Lock case, from the door set’s certification']
  },
  {
    key: 'lockIntumescent',
    title: 'Intumescent around the lock',
    marker: markers.confirm,
    does: 'Intumescent material lines the pocket around the lock case.',
    lookFor: ['Intumescent around the lock case, not missing or damaged'],
    toConfirm: ['Intumescent product, from the door set’s certification']
  }
];
