// Fate
// rules to decide if a cell lives
// based on count of neighbors
const ca = (dim, fate) => {
  const length = dim * dim;
  let grid = new Uint8Array(length);

  const index = (row, col) => {
    const index = row * dim + col;
    if (row >= dim || col >= dim || index >= length) {
      throw new Error('Index out of bounds');
    }
    return row * dim + col;
  };

  const entries = () => {
    return grid;
  };

  const getCell = (row, col) => {
    return grid[index(row, col)];
  };

  const setCell = (row, col, val) => {
    grid[index(row, col)] = val;
  };

  const neighbors = (row, col) => {
    let i = index(row, col);
    let atTop = row === 0;
    let atBottom = (row + 1) % dim === 0;
    let atLeft = i % dim === 0;
    let atRight = (i + 1) % dim === 0;
    let neighbors = [];

    // row above
    if (!atTop) {
      if (!atLeft) {
        neighbors.push(grid[index(row - 1, col - 1)]);
      }
      neighbors.push(grid[index(row - 1, col)]);
      if (!atRight) {
        neighbors.push(grid[index(row - 1, col + 1)]);
      }
    }

    // same row
    if (!atLeft) {
      neighbors.push(grid[index(row, col - 1)]);
    }
    if (!atRight) {
      neighbors.push(grid[index(row, col + 1)]);
    }

    // bottom row
    if (!atBottom) {
      if (!atLeft) {
        neighbors.push(grid[index(row + 1, col - 1)]);
      }
      neighbors.push(grid[index(row + 1, col)]);
      if (!atRight) {
        neighbors.push(grid[index(row + 1, col + 1)]);
      }
    }

    return neighbors;
  };

  const randomize = () => {
    grid = grid.map((c) => (c = Math.floor(Math.random() * 2)));
  };

  const next = () => {
    let next = new Uint8Array(length);
    grid.forEach((c, index) => {
      let row = Math.floor(index / dim);
      let col = index - row * dim;
      let cell = grid[index];
      let count = neighbors(row, col).reduce((prev, curr) => prev + curr, 0);

      next[index] = fate(cell, count);
    });
    grid = next;
  };

  const toString = () => {
    let output = grid.reduce((prev, curr, index) => {
      if ((index + 1) % dim === 0) return prev + curr + '\n';
      return prev + curr + '\t';
    }, '');
    return output;
  };

  return {
    entries,
    getCell,
    setCell,
    neighbors,
    randomize,
    next,
    toString,
  };
};
