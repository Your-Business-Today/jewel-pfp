import { markers } from './markers.js';
import { everyDoorCards } from './cards/everyDoor.js';
import { flushDoorCards } from './cards/flushDoor.js';
import { boardDoorCards } from './cards/boardDoor.js';
import { surroundCards } from './cards/surround.js';
import { sealCards } from './cards/seals.js';
import { hiddenCards } from './cards/hidden.js';
import { glazedDoorCards } from './cards/glazedDoor.js';

export { markers };

/** @typedef {{ key: string, doorTypes?: number[], title: string, marker: string, does: string, lookFor: string[], toConfirm: string[] }} PartCard */

/** @type {PartCard[]} */
export const partCards = [...surroundCards, ...sealCards, ...everyDoorCards, ...flushDoorCards, ...boardDoorCards, ...glazedDoorCards, ...hiddenCards];

/** @param {PartCard} card @param {number} doorType */
const isOnDoorType = (card, doorType) => !card.doorTypes || card.doorTypes.includes(doorType);

/** @param {number} doorType */
export function cardsFor(doorType) {
  return partCards.filter((card) => isOnDoorType(card, doorType));
}

/** @param {string} key @param {number} doorType */
export function cardFor(key, doorType) {
  return cardsFor(doorType).find((card) => card.key === key);
}
