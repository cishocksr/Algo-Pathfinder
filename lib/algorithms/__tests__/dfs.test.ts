import { dfs } from "../dfs";
import { bfs } from "../bfs";
import type { MazeGridType } from "../../types";
import {
  expectOrthogonalPath,
  expectValidPathInMaze,
  makeOpenMaze,
  shortestPathLength,
} from "../maze-test-helpers";

describe("dfs", () => {
  const start: [number, number] = [0, 0];
  const end: [number, number] = [2, 2];

  it("finds a valid path to the goal when one exists", () => {
    const maze: MazeGridType = [
      ["start", "path", "path"],
      ["path", "path", "path"],
      ["path", "path", "end"],
    ];

    const result = dfs(maze, start, end);

    expectValidPathInMaze(maze, result.path, start, end);
  });

  it("returns an empty path when the goal is unreachable", () => {
    const maze: MazeGridType = [
      ["start", "wall", "path"],
      ["wall", "wall", "path"],
      ["path", "path", "end"],
    ];

    const result = dfs(maze, start, end);

    expect(result.path).toEqual([]);
    expect(result.visited[0]).toEqual(start);
  });

  it("handles start and end on a single row", () => {
    const maze: MazeGridType = [["start", "path", "path", "path", "end"]];
    const s: [number, number] = [0, 0];
    const e: [number, number] = [4, 0];

    const result = dfs(maze, s, e);

    expectValidPathInMaze(maze, result.path, s, e);
  });

  it("succeeds immediately when start equals end", () => {
    const maze: MazeGridType = [
      ["start", "path"],
      ["path", "path"],
    ];
    const s: [number, number] = [0, 0];

    const result = dfs(maze, s, s);

    expect(result.path).toEqual([[0, 0]]);
    expect(result.visited).toEqual([[0, 0]]);
  });

  it("may use a longer path than BFS on a grid with a short direct route", () => {
    const maze: MazeGridType = [
      ["start", "path", "end"],
      ["path", "path", "path"],
      ["path", "path", "path"],
    ];
    const s: [number, number] = [0, 0];
    const e: [number, number] = [2, 0];

    const dfsResult = dfs(maze, s, e);
    const bfsResult = bfs(maze, s, e);

    expectValidPathInMaze(maze, dfsResult.path, s, e);
    expect(dfsResult.path.length).toBeGreaterThanOrEqual(bfsResult.path.length);
    expect(bfsResult.path.length).toBe(shortestPathLength(maze, s, e));
  });

  it("respects neighbor priority (right before down with this stack order)", () => {
    const maze: MazeGridType = [
      ["start", "path"],
      ["path", "end"],
    ];
    const s: [number, number] = [0, 0];
    const e: [number, number] = [1, 1];

    const result = dfs(maze, s, e);

    expectValidPathInMaze(maze, result.path, s, e);
    expect(result.path).toEqual([
      [0, 0],
      [1, 0],
      [1, 1],
    ]);
  });

  it("does not re-visit cells", () => {
    const maze = makeOpenMaze(8, 8);
    const goal: [number, number] = [7, 7];

    const result = dfs(maze, start, goal);
    const keys = result.visited.map(([x, y]) => `${x},${y}`);

    expect(new Set(keys).size).toBe(keys.length);
  });

  it("finds a path in a narrow corridor", () => {
    const maze: MazeGridType = [
      ["start", "path", "wall", "wall"],
      ["wall", "path", "wall", "wall"],
      ["wall", "path", "path", "path"],
      ["wall", "wall", "wall", "end"],
    ];
    const s: [number, number] = [0, 0];
    const e: [number, number] = [3, 3];

    const result = dfs(maze, s, e);

    expectValidPathInMaze(maze, result.path, s, e);
  });

  it("visits every reachable cell before failing on a fully enclosed start", () => {
    const maze: MazeGridType = [
      ["start", "wall"],
      ["wall", "path"],
    ];
    const s: [number, number] = [0, 0];
    const e: [number, number] = [1, 1];

    const result = dfs(maze, s, e);

    expect(result.path).toEqual([]);
    expect(result.visited.length).toBe(1);
  });

  it("produces a contiguous path without skipping cells", () => {
    const maze: MazeGridType = [
      ["start", "path", "wall", "path"],
      ["path", "path", "path", "path"],
      ["wall", "path", "wall", "path"],
      ["path", "path", "path", "end"],
    ];
    const s: [number, number] = [0, 0];
    const e: [number, number] = [3, 3];

    const result = dfs(maze, s, e);

    expectValidPathInMaze(maze, result.path, s, e);
    expectOrthogonalPath(result.path);
  });
});
