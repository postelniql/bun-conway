import {
  clearGrid,
  DEFAULT_GRID_SIZE,
  GENERATION_TTL_MS,
  isValidGridSizeInput,
  loadInitialGrid,
  nextGeneration,
} from "./grid";

export const startGame = (gridSizeUserInput: number) => {
  const gridSize = isValidGridSizeInput(gridSizeUserInput)
    ? gridSizeUserInput
    : DEFAULT_GRID_SIZE;

  let gridHTML = loadInitialGrid(gridSize);

  return gridHTML;
};

export const stopGame = () => {
  const gridHTML = clearGrid();
  return gridHTML;
};
