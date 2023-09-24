import {
  clearGrid,
  DEFAULT_GRID_SIZE,
  GENERATION_TTL_MS,
  isValidGridSizeInput,
  loadInitialGrid,
  nextGeneration,
} from "./grid";

export type GameConfiguration = string;

export const generateGameGrid = (
  gridSizeUserInput: number
): GameConfiguration => {
  const gridSize = isValidGridSizeInput(gridSizeUserInput)
    ? gridSizeUserInput
    : DEFAULT_GRID_SIZE;

  let gridHTML = loadInitialGrid(gridSize);

  return gridHTML;
};

export const clearGameGrid = () => {
  const gridHTML = clearGrid();
  return gridHTML;
};

export const startGame = () => {};

export const stopGame = () => {};
