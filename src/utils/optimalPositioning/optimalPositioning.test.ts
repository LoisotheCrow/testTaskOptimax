import { buildGrid, buildRow, insertOptimal, tryToFit } from "./optimalPositioning";

test('row array is filled by false on init', () => {
  expect(buildRow(5)).toStrictEqual([false, false, false, false, false]);
});

test('builds grid of the right size', () => {
  const grid = buildGrid({ w: 2, h: 3 });
  expect(grid).toStrictEqual([[false, false], [false, false], [false, false]]);
});

test('doesnt fit if exceeds row length', () => {
  const grid = [[false, false, false]];
  expect(tryToFit(grid, { w: 10, h: 1 }, 0, 0)).toBe(false);
});

test('doesnt fit if position already taken', () => {
  const grid = [[true, false, false]];
  expect(tryToFit(grid, { w: 1, h: 1 }, 0, 0)).toBe(false);
});

test('does fit if place is not taken and not too long', () => {
  const grid = [[false, false, false]];
  expect(tryToFit(grid, { w: 3, h: 1 }, 0, 0)).toBe(true);
});

test('does fit it exceeds height', () => {
  const grid = [[false, false, false]];
  expect(tryToFit(grid, { w: 3, h: 5 }, 0, 0)).toBe(true);
});

test('fits on free place im between elements', () => {
  const layout = [{ i: 'a', x: 0, y: 0, w: 1, h: 1 }, { i: 'b', x: 2, y: 0, w: 1, h: 1 }];
  
  expect(insertOptimal(layout, { w: 1, h: 1, i: 'c' }, { w: 3, h: 1 })).toStrictEqual([
    ...layout,
    { i: 'c', x: 1, y: 0, w: 1, h: 1 },
  ]);
});
