import { doorTypes } from '../doorTypes.js';

const doorsWithViewers = [doorTypes.flush, doorTypes.board];

export const everyDoorCards = [
  {
    key: 'frame',
    title: 'Frame',
    does: 'The fixed surround the door hangs in, and it must be just as strong as the door. The stop on the frame is what the leaf closes against, so the door closes neatly and flush.',
    lookFor: ['Frame fixed firmly in the wall', 'Stop continuous along the head and both sides', 'No splits or damage to the frame']
  },
  {
    key: 'closer',
    title: 'Door closer',
    does: 'A fire door only works when it is shut. This overhead closer is fixed to the door with an arm to the frame: open the door and let go, and it should close fully on its own and click into its latch.',
    lookFor: ['Arm at a right angle to the leaf when the door is shut', 'Door closes and latches by itself from any open position', 'Closer and arm firmly fixed, with no oil leaking']
  },
  {
    key: 'lever',
    title: 'Latch and lever handle',
    does: 'The latch holds the door firmly shut so fire pressure cannot push it open. A lever handle on each face works it and should spring back to level on its own. On door type 2 a lock cylinder sits below the handle.',
    lookFor: ['Latch engages every time the door closes', 'Handles and backplates firmly fixed on both faces', 'Strike plate in place on the frame']
  },
  {
    key: 'viewer',
    doorTypes: doorsWithViewers,
    title: 'Door viewer',
    does: 'A spy hole through the leaf. Anything that goes through a fire door is a potential weak spot, so a viewer must be a fire-rated product made for the door, never cut on site.',
    lookFor: ['Viewer fitted through the full leaf', 'No gap around it']
  },
  {
    key: 'viewerWrap',
    doorTypes: doorsWithViewers,
    title: 'Intumescent wrap around the viewer',
    does: 'Intumescent material wraps the viewer where it passes through the leaf.',
    lookFor: ['Wrap present all round the viewer', 'No gap between the viewer and the leaf']
  }
];
