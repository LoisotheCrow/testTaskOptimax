import { Layout } from "react-grid-layout";

export interface ElementGeometry {
  w: number;
  h: number;
  i?: string;
}

export interface GridConstraints {
  w: number;
  h?: number;
}

interface Position {
  x: number;
  y: number;
}

type InternalGrid = boolean[][];

export const buildRow = (w: number): boolean[] => new Array(w).fill(false);

export const buildGrid = (constraint: GridConstraints): boolean[][] => {
  const arr: boolean[][] = [];

  for (let i = 0; i < constraint.h; i += 1) {
    arr.push(buildRow(constraint.w));
  }

  return arr;
}

export const buildInternalGrid = (
  layout: Layout[],
  constraint: GridConstraints,
): InternalGrid => {
  const grid = buildGrid(constraint);

  layout.forEach(element => {
    for (let i = 0; i < element.h; i += 1) {
      for (let j = 0; j < element.w; j += 1) {
        if (!grid[element.y + i]) {
          grid.push(buildRow(constraint.w));
        }

        grid[element.y + i][element.x + j] = true;
      }
    }
  });

  return grid;
}

export const tryToFit = (
  grid: InternalGrid,
  element: ElementGeometry,
  x: number,
  y: number,
): boolean => {
  for (let i = y; i < element.h + y; i += 1) {
    if (i >= grid.length) {
      break;
    }

    for (let j = x; j < element.w + x; j += 1) {
      if (j >= grid[i].length) {
        return false;
      }

      if (grid[i][j]) {
        return false;
      }
    }
  }

  return true;
}

export const insertOptimal = (
  layout: Layout[],
  element: ElementGeometry,
  constraint: GridConstraints,
): Layout[] => {
  const position = {} as Position;
  const grid = buildInternalGrid(layout, constraint);

  for (let i = 0; i < grid.length; i += 1) {
    if (typeof position.x === 'number') {
      break;
    }

    for (let j = 0; j < grid[0].length; j += 1) {
      if (tryToFit(grid, element, j, i)) {
        position.x = j;
        position.y = i;
        break;
      }
    }
  }

  if (typeof position.x !== 'number') {
    position.x = 0;
    position.y = grid[0].length + 1;
  }

  return[
    ...layout,
    { i: element.i || layout.length.toString(), ...position, ...element },
  ];
}
