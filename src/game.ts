import {
  clearGrid,
  DEFAULT_GRID_SIZE,
  isValidGridSizeInput,
  loadInitialGrid,
} from "./grid";

export const startGame = (gridSizeUserInput: number) => {
  const gridSize = isValidGridSizeInput(gridSizeUserInput)
    ? gridSizeUserInput
    : DEFAULT_GRID_SIZE;

  const gridHTML = loadInitialGrid(gridSize);

  return gridHTML;
};
export const stopGame = () => {
  const gridHTML = clearGrid();
  return gridHTML;
};
