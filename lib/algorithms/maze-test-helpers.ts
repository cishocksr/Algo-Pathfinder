import type { MazeGridType } from "../types";

const ORTHO: [number, number][] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

/** Manhattan distance between two grid points. */
export function manhattan(a: [number, number], b: [number, number]): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

/** Open grid: start top-left, end bottom-right, interior paths, rectangular. */
export function makeOpenMaze(width: number, height: number): MazeGridType {
  return Array.from({ length: height }, (_, y) =>
    Array.from({ length: width }, (_, x) => {
      if (x === 0 && y === 0) return "start";
      if (x === width - 1 && y === height - 1) return "end";
      return "path";
    })
  );
}

function isWalkable(cell: MazeGridType[number][number]): boolean {
  return cell === "path" || cell === "end";
}

/**
 * BFS reference for shortest unweighted path length (steps = cells - 1).
 * Same movement rules as app algorithms: only "path" and "end" are enterable.
 */
export function shortestPathLength(
  maze: MazeGridType,
  start: [number, number],
  end: [number, number]
): number {
  const h = maze.length;
  const w = maze[0]?.length ?? 0;
  if (w === 0 || h === 0) return -1;
  if (start[0] === end[0] && start[1] === end[1]) return 1;

  const queue: [number, number][] = [start];
  const dist = new Map<string, number>();
  dist.set(`${start[0]},${start[1]}`, 1);

  while (queue.length) {
    const [x, y] = queue.shift()!;
    const d = dist.get(`${x},${y}`)!;
    if (x === end[0] && y === end[1]) return d;

    for (const [dx, dy] of ORTHO) {
      const nx = x + dx;
      const ny = y + dy;
      const key = `${nx},${ny}`;
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      if (dist.has(key)) continue;
      if (!isWalkable(maze[ny][nx])) continue;
      dist.set(key, d + 1);
      queue.push([nx, ny]);
    }
  }
  return -1;
}

/** Every step moves exactly one cell in a cardinal direction. */
export function expectOrthogonalPath(path: [number, number][]): void {
  for (let i = 1; i < path.length; i++) {
    const d = manhattan(path[i - 1], path[i]);
    expect(d).toBe(1);
  }
}

/** Path endpoints and each cell is traversable per algorithm rules. */
export function expectValidPathInMaze(
  maze: MazeGridType,
  path: [number, number][],
  start: [number, number],
  end: [number, number]
): void {
  expect(path.length).toBeGreaterThan(0);
  expect(path[0]).toEqual(start);
  expect(path[path.length - 1]).toEqual(end);
  expectOrthogonalPath(path);

  for (const [x, y] of path) {
    const cell = maze[y][x];
    expect(cell === "start" || cell === "path" || cell === "end").toBe(true);
  }
}

/** When a path exists, length must match BFS optimal cell count. */
export function expectShortestPath(
  maze: MazeGridType,
  path: [number, number][],
  start: [number, number],
  end: [number, number]
): void {
  const optimal = shortestPathLength(maze, start, end);
  expect(optimal).toBeGreaterThan(0);
  expect(path.length).toBe(optimal);
}
