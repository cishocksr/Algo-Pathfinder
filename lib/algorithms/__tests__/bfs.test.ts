import { bfs } from "../bfs";
import type { MazeGridType } from "../../types";
import {
  expectShortestPath,
  expectValidPathInMaze,
  makeOpenMaze,
  shortestPathLength,
} from "../maze-test-helpers";

describe("bfs", () => {
  const start: [number, number] = [0, 0];
  const end: [number, number] = [2, 2];

  it("finds a shortest path in an open grid", () => {
    const maze: MazeGridType = [
      ["start", "path", "path"],
      ["path", "path", "path"],
      ["path", "path", "end"],
    ];

    const result = bfs(maze, start, end);

    expectValidPathInMaze(maze, result.path, start, end);
    expectShortestPath(maze, result.path, start, end);
  });

  it("routes around a wall barrier", () => {
    const maze: MazeGridType = [
      ["start", "path", "path"],
      ["wall", "wall", "path"],
      ["path", "path", "end"],
    ];

    const result = bfs(maze, start, end);

    expectValidPathInMaze(maze, result.path, start, end);
    expectShortestPath(maze, result.path, start, end);
  });

  it("returns an empty path when the goal is unreachable", () => {
    const maze: MazeGridType = [
      ["start", "wall", "path"],
      ["wall", "wall", "path"],
      ["path", "path", "end"],
    ];

    const result = bfs(maze, start, end);

    expect(result.path).toEqual([]);
    expect(shortestPathLength(maze, start, end)).toBe(-1);
    expect(result.visited[0]).toEqual(start);
    expect(new Set(result.visited.map(([x, y]) => `${x},${y}`)).size).toBe(
      result.visited.length
    );
  });

  it("handles start and end on a single row", () => {
    const maze: MazeGridType = [["start", "path", "path", "path", "end"]];
    const s: [number, number] = [0, 0];
    const e: [number, number] = [4, 0];

    const result = bfs(maze, s, e);

    expect(result.path).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ]);
    expectShortestPath(maze, result.path, s, e);
  });

  it("handles start and end in a single column", () => {
    const maze: MazeGridType = [["start"], ["path"], ["path"], ["end"]];
    const s: [number, number] = [0, 0];
    const e: [number, number] = [0, 3];

    const result = bfs(maze, s, e);

    expectValidPathInMaze(maze, result.path, s, e);
    expectShortestPath(maze, result.path, s, e);
  });

  it("immediately succeeds when start equals end", () => {
    const maze: MazeGridType = [
      ["start", "path"],
      ["path", "path"],
    ];
    const s: [number, number] = [0, 0];

    const result = bfs(maze, s, s);

    expect(result.path).toEqual([[0, 0]]);
    expect(result.visited).toEqual([[0, 0]]);
  });

  it("does not re-visit cells", () => {
    const maze = makeOpenMaze(6, 6);
    const e: [number, number] = [5, 5];

    const result = bfs(maze, start, e);
    const keys = result.visited.map(([x, y]) => `${x},${y}`);

    expect(new Set(keys).size).toBe(keys.length);
  });

  it("matches optimal length on a maze with two equal-length routes", () => {
    const maze: MazeGridType = [
      ["start", "path", "path"],
      ["path", "wall", "path"],
      ["path", "path", "end"],
    ];
    const s: [number, number] = [0, 0];
    const e: [number, number] = [2, 2];

    const result = bfs(maze, s, e);

    expectShortestPath(maze, result.path, s, e);
    expect(result.path.length).toBe(5);
  });

  it("completes on a larger open grid", () => {
    const size = 40;
    const maze = makeOpenMaze(size, size);
    const goal: [number, number] = [size - 1, size - 1];

    const t0 = performance.now();
    const result = bfs(maze, [0, 0], goal);
    const elapsed = performance.now() - t0;

    expectValidPathInMaze(maze, result.path, [0, 0], goal);
    expectShortestPath(maze, result.path, [0, 0], goal);
    expect(elapsed).toBeLessThan(2000);
  });
});
