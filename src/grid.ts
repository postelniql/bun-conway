export const DEFAULT_GRID_SIZE = 10;

export const isValidGridSizeInput = (input: number) => {
  return input !== 0;
};

const generateInitialGrid = (gridSize: number) => {
  const grid = Array.from({ length: gridSize }).map(() =>
    Array.from({ length: gridSize }).map(() => `<div class='cell'></div>`)
  );

  return grid.map((row) => row.join("")).join("");
};

export const loadInitialGrid = (gridSize: number) => {
  const grid = generateInitialGrid(gridSize);
  return `<div class="grid" id='game-grid' game-grid-size="${gridSize}">${grid} </div>`;
};

export const clearGrid = () => {
  const grid = "";

  return grid;
};
