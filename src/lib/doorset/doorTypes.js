export const doorTypes = { flush: 1, board: 2 };

export const everyDoorType = Object.values(doorTypes);

export const doorTypeChoices = [
  { doorType: doorTypes.flush, title: 'Door type 1', summary: 'Oak-effect flush leaf' },
  { doorType: doorTypes.board, title: 'Door type 2', summary: 'Painted grooved board leaf' }
];
