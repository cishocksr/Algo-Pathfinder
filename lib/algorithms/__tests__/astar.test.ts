import { astar } from "../astar";
import { bfs } from "../bfs";
import type { MazeGridType } from "../../types";
import {
  expectShortestPath,
  expectValidPathInMaze,
  makeOpenMaze,
  shortestPathLength,
} from "../maze-test-helpers";

describe("astar", () => {
  const start: [number, number] = [0, 0];
  const end: [number, number] = [2, 2];

  it("finds a shortest path in an open grid", () => {
    const maze: MazeGridType = [
      ["start", "path", "path"],
      ["path", "path", "path"],
      ["path", "path", "end"],
    ];

    const result = astar(maze, start, end);

    expectValidPathInMaze(maze, result.path, start, end);
    expectShortestPath(maze, result.path, start, end);
  });

  it("matches BFS optimal path length on a fixed obstacle layout", () => {
    const maze: MazeGridType = [
      ["start", "path", "path", "path", "path"],
      ["path", "wall", "wall", "wall", "path"],
      ["path", "path", "path", "path", "end"],
    ];
    const s: [number, number] = [0, 0];
    const e: [number, number] = [4, 2];

    const aStarResult = astar(maze, s, e);
    const bfsResult = bfs(maze, s, e);

    expect(aStarResult.path.length).toBe(bfsResult.path.length);
    expectShortestPath(maze, aStarResult.path, s, e);
  });

  it("returns an empty path when the goal is unreachable", () => {
    const maze: MazeGridType = [
      ["start", "wall", "path"],
      ["wall", "wall", "path"],
      ["path", "path", "end"],
    ];

    const result = astar(maze, start, end);

    expect(result.path).toEqual([]);
    expect(shortestPathLength(maze, start, end)).toBe(-1);
  });

  it("handles start and end on a single row with minimal visits on a line", () => {
    const maze: MazeGridType = [["start", "path", "path", "path", "end"]];
    const s: [number, number] = [0, 0];
    const e: [number, number] = [4, 0];

    const result = astar(maze, s, e);

    expect(result.path.length).toBe(5);
    expect(result.visited.length).toBe(5);
    expectShortestPath(maze, result.path, s, e);
  });

  it("succeeds immediately when start equals end", () => {
    const maze: MazeGridType = [
      ["start", "path"],
      ["path", "path"],
    ];
    const s: [number, number] = [0, 0];

    const result = astar(maze, s, s);

    expect(result.path).toEqual([[0, 0]]);
    expect(result.visited).toEqual([[0, 0]]);
  });

  it("does not re-visit cells in visited order", () => {
    const maze = makeOpenMaze(10, 10);
    const goal: [number, number] = [9, 9];

    const result = astar(maze, start, goal);
    const keys = result.visited.map(([x, y]) => `${x},${y}`);

    expect(new Set(keys).size).toBe(keys.length);
  });

  it("solves a deterministic sparse wall field (no randomness)", () => {
    const size = 12;
    const walls = new Set<string>([
      "2,2",
      "3,3",
      "5,4",
      "4,6",
      "7,7",
      "8,5",
    ]);
    const maze: MazeGridType = Array.from({ length: size }, (_, y) =>
      Array.from({ length: size }, (_, x) => {
        if (x === 0 && y === 0) return "start";
        if (x === size - 1 && y === size - 1) return "end";
        return walls.has(`${x},${y}`) ? "wall" : "path";
      })
    );
    const s: [number, number] = [0, 0];
    const e: [number, number] = [size - 1, size - 1];

    const result = astar(maze, s, e);

    expect(result.path.length).toBeGreaterThan(0);
    expectValidPathInMaze(maze, result.path, s, e);
    expectShortestPath(maze, result.path, s, e);
  });

  it("handles an L-shaped required route to the goal", () => {
    const maze: MazeGridType = [
      ["start", "path", "path"],
      ["wall", "wall", "path"],
      ["wall", "wall", "path"],
      ["end", "path", "path"],
    ];
    const s: [number, number] = [0, 0];
    const e: [number, number] = [0, 3];

    const result = astar(maze, s, e);

    expectValidPathInMaze(maze, result.path, s, e);
    expectShortestPath(maze, result.path, s, e);
  });

  it("completes on a larger open grid with optimal length", () => {
    const size = 35;
    const maze = makeOpenMaze(size, size);
    const goal: [number, number] = [size - 1, size - 1];

    const t0 = performance.now();
    const result = astar(maze, [0, 0], goal);
    const elapsed = performance.now() - t0;

    expectValidPathInMaze(maze, result.path, [0, 0], goal);
    expectShortestPath(maze, result.path, [0, 0], goal);
    expect(elapsed).toBeLessThan(2000);
  });
});
