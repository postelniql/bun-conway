export const DEFAULT_GRID_SIZE = 25;
export const GENERATION_TTL_MS = 500;
const CHANCE_OF_ALIVE = 0.02;

type GameGrid = string[][];

export const isValidGridSizeInput = (input: number) => {
  return input !== 0;
};

const generateInitialGrid = (gridSize: number) => {
  return Array.from({ length: gridSize }).map(() =>
    Array.from({ length: gridSize }).map(() => `<div class='cell'></div>`)
  );
};

const serializeGrid = (grid: GameGrid) => {
  return grid.map((row) => row.join("")).join("");
};

const injectLifeIntoCells = (grid: GameGrid) => {
  grid.forEach((row) =>
    row.forEach((_, index) => {
      if (Math.random() < CHANCE_OF_ALIVE) {
        row[index] = `<div class='cell alive'></div>`;
      }
    })
  );
};

export const loadInitialGrid = (gridSize: number) => {
  const grid = generateInitialGrid(gridSize);

  injectLifeIntoCells(grid);

  const serializedGrid = serializeGrid(grid);
  return `<div class="grid" id='game-grid' game-grid-size="${gridSize}">${serializedGrid} </div>`;
};

export const clearGrid = (gridSize: number) => {
  const grid = generateInitialGrid(gridSize);

  const serializedGrid = serializeGrid(grid);
  return `<div class="grid" id='game-grid' game-grid-size="${gridSize}">${serializedGrid} </div>`;
};

export const nextGeneration = (grid: GameGrid) => {
  console.log("returned new generation");
  return grid;
};
