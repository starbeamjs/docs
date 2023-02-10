import { Cell } from "@starbeam/universal";

const cell = Cell(0);

console.log(cell.current);

cell.current = 1;

console.log(cell.current);
