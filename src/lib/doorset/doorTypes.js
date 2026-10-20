export const doorTypes = { flush: 1, board: 2, glazed: 3 };

export const everyDoorType = Object.values(doorTypes);

export const doorTypeChoices = [
  { doorType: doorTypes.flush, title: 'Door type 1', summary: 'Oak-effect flush leaf' },
  { doorType: doorTypes.board, title: 'Door type 2', summary: 'Painted grooved board leaf' },
  { doorType: doorTypes.glazed, title: 'Glazed leaf', summary: 'Drawn to show glazing, not from a photo' }
];
