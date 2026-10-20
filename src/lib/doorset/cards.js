// @ts-nocheck — three.js ships no types for this project's checker
export const markers = {
  seen: 'SEEN IN PHOTO',
  confirm: 'TO CONFIRM'
};

export const partCards = [
  {
    key: 'frame',
    title: 'Frame',
    marker: markers.seen,
    does: 'Holds the leaf in its opening. The stop on the frame is what the leaf closes against.',
    lookFor: ['Frame fixed firmly in the wall', 'Stop continuous along the head and both sides', 'No splits or damage to the frame'],
    toConfirm: ['Frame type and fixing method, from the door set’s certification']
  },
  {
    key: 'leaf',
    title: 'Leaf',
    marker: markers.seen,
    does: 'The door itself. Oak-effect veneered flush leaf, as door type 1.',
    lookFor: ['Leaf sits evenly in the frame', 'Gaps around it even and within the range shown', 'No holes or alterations that are not part of the door set'],
    toConfirm: ['Leaf construction, from the door set’s certification']
  },
  {
    key: 'hinges',
    title: 'Hinges',
    marker: markers.seen,
    does: 'Three hinges carry the leaf on the hinge side.',
    lookFor: ['All three hinges present', 'Every screw fitted and tight', 'No wear, drop or movement in the leaf'],
    toConfirm: ['Hinge type, from the door set’s certification']
  },
  {
    key: 'closer',
    title: 'Door closer',
    marker: markers.seen,
    does: 'An overhead closer with a regular arm. The body sits on the leaf, and the arm stands at a right angle to the leaf before running back to the frame.',
    lookFor: ['Arm at a right angle to the leaf when the door is shut', 'Door closes and latches by itself from any open position', 'Closer and arm firmly fixed, with no oil leaking'],
    toConfirm: ['Closer model and size, from the door set’s certification']
  },
  {
    key: 'lever',
    title: 'Latch and lever handle',
    marker: markers.seen,
    does: 'The latch holds the door shut in its frame. The lever handle works it.',
    lookFor: ['Latch engages every time the door closes', 'Handle and backplate firmly fixed', 'Strike plate in place on the frame'],
    toConfirm: ['Lock, latch and handle set, from the door set’s certification']
  },
  {
    key: 'viewer',
    title: 'Door viewer',
    marker: markers.seen,
    does: 'A spy hole through the leaf.',
    lookFor: ['Viewer fitted through the full leaf', 'No gap around it'],
    toConfirm: ['Viewer type, from the door set’s certification']
  },
  {
    key: 'chain',
    title: 'Door chain',
    marker: markers.seen,
    does: 'A chain between the frame and the leaf, on the lock side.',
    lookFor: ['Chain and its fixings secure'],
    toConfirm: ['Whether a chain is within the door set’s certification']
  }
];

/** @param {string} key */
export function cardFor(key) {
  return partCards.find((card) => card.key === key);
}
