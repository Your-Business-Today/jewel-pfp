import { markers } from '../markers.js';

export const everyDoorCards = [
  {
    key: 'frame',
    title: 'Frame',
    marker: markers.seen,
    does: 'Holds the leaf in its opening. The stop on the frame is what the leaf closes against.',
    lookFor: ['Frame fixed firmly in the wall', 'Stop continuous along the head and both sides', 'No splits or damage to the frame'],
    toConfirm: ['Frame type and fixing method, from the door set’s certification']
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
    does: 'The latch holds the door shut in its frame. A lever handle on each face works it. On door type 2 a lock cylinder sits below the handle.',
    lookFor: ['Latch engages every time the door closes', 'Handles and backplates firmly fixed on both faces', 'Strike plate in place on the frame'],
    toConfirm: ['Lock, latch and handle set, from the door set’s certification']
  },
  {
    key: 'viewer',
    title: 'Door viewer',
    marker: markers.seen,
    does: 'A spy hole through the leaf.',
    lookFor: ['Viewer fitted through the full leaf', 'No gap around it'],
    toConfirm: ['Viewer type, from the door set’s certification']
  }
];
