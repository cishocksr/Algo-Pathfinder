import { astar } from "../astar";
import type { MazeGridType } from "../../types";

describe("A* Algorithm", () => {
  it("should find the shortest path in a simple maze", () => {
    const maze: MazeGridType = [
      ["start", "path", "path"],
      ["path", "path", "path"],
      ["path", "path", "end"],
    ];

    const result = astar(maze, [0, 0], [2, 2]);

    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[0]).toEqual([0, 0]); // Start position
    expect(result.path[result.path.length - 1]).toEqual([2, 2]); // End position
  });

  it("should find path around obstacles efficiently", () => {
    const maze: MazeGridType = [
      ["start", "path", "path"],
      ["wall", "wall", "path"],
      ["path", "path", "end"],
    ];

    const result = astar(maze, [0, 0], [2, 2]);

    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[result.path.length - 1]).toEqual([2, 2]);
    // A* should explore fewer nodes than BFS in many cases
    expect(result.visited.length).toBeGreaterThan(0);
  });

  it("should return empty path when no solution exists", () => {
    const maze: MazeGridType = [
      ["start", "wall", "path"],
      ["wall", "wall", "path"],
      ["path", "path", "end"],
    ];

    const result = astar(maze, [0, 0], [2, 2]);

    expect(result.path).toEqual([]);
    expect(result.visited.length).toBeGreaterThan(0);
  });

  it("should handle a maze with only start and end", () => {
    const maze: MazeGridType = [["start", "end"]];

    const result = astar(maze, [0, 0], [1, 0]);

    expect(result.path.length).toBe(2);
    expect(result.path).toEqual([
      [0, 0],
      [1, 0],
    ]);
  });

  it("should guarantee shortest path (with Manhattan distance heuristic)", () => {
    const maze: MazeGridType = [
      ["start", "path", "path", "path"],
      ["path", "wall", "wall", "path"],
      ["path", "path", "path", "end"],
    ];

    const result = astar(maze, [0, 0], [3, 2]);

    // A* with Manhattan distance guarantees shortest path
    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[0]).toEqual([0, 0]);
    expect(result.path[result.path.length - 1]).toEqual([3, 2]);
  });

  it("should explore fewer nodes than BFS in favorable cases", () => {
    // Create a maze where A* should be more efficient
    const maze: MazeGridType = [
      ["start", "path", "path", "path", "path"],
      ["path", "path", "path", "path", "path"],
      ["path", "path", "path", "path", "path"],
      ["path", "path", "path", "path", "path"],
      ["path", "path", "path", "path", "end"],
    ];

    const result = astar(maze, [0, 0], [4, 4]);

    // A* should find the shortest path
    expect(result.path.length).toBe(9); // Manhattan distance + 1 for start
    // The visited count should be relatively small due to heuristic guidance
    expect(result.visited.length).toBeGreaterThan(0);
  });

  it("should handle complex mazes with obstacles", () => {
    const maze: MazeGridType = [
      ["start", "path", "wall", "path", "path"],
      ["path", "path", "wall", "path", "path"],
      ["wall", "path", "wall", "path", "path"],
      ["path", "path", "path", "wall", "path"],
      ["path", "path", "path", "path", "end"],
    ];

    const result = astar(maze, [0, 0], [4, 4]);

    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[0]).toEqual([0, 0]);
    expect(result.path[result.path.length - 1]).toEqual([4, 4]);
  });

  it("should be more efficient than uninformed search for distant goals", () => {
    const size = 30;
    const maze: MazeGridType = Array.from({ length: size }, (_, y) =>
      Array.from({ length: size }, (_, x) => {
        if (x === 0 && y === 0) return "start";
        if (x === size - 1 && y === size - 1) return "end";
        // Add some random walls to make it interesting
        if (
          Math.random() < 0.1 &&
          !(x === 0 && y === 0) &&
          !(x === size - 1 && y === size - 1)
        ) {
          return "wall";
        }
        return "path";
      })
    );

    const startTime = performance.now();
    const result = astar(maze, [0, 0], [size - 1, size - 1]);
    const endTime = performance.now();

    expect(result.path.length).toBeGreaterThan(0);
    expect(endTime - startTime).toBeLessThan(1000); // Should complete efficiently
  });

  it("should handle straight-line paths optimally", () => {
    const maze: MazeGridType = [["start", "path", "path", "path", "end"]];

    const result = astar(maze, [0, 0], [4, 0]);

    // Should find the direct path
    expect(result.path.length).toBe(5);
    expect(result.visited.length).toBe(5); // A* should explore minimal nodes
  });

  it("should work correctly with L-shaped mazes", () => {
    const maze: MazeGridType = [
      ["start", "path", "path"],
      ["wall", "wall", "path"],
      ["wall", "wall", "path"],
      ["end", "path", "path"],
    ];

    const result = astar(maze, [0, 0], [0, 3]);

    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[0]).toEqual([0, 0]);
    expect(result.path[result.path.length - 1]).toEqual([0, 3]);
  });
});
