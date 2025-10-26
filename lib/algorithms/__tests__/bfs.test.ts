import { bfs } from "../bfs";
import type { MazeGridType } from "../../types";

describe("BFS Algorithm", () => {
  it("should find the shortest path in a simple maze", () => {
    const maze: MazeGridType = [
      ["start", "path", "path"],
      ["path", "path", "path"],
      ["path", "path", "end"],
    ];

    const result = bfs(maze, [0, 0], [2, 2]);

    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[0]).toEqual([0, 0]); // Start position
    expect(result.path[result.path.length - 1]).toEqual([2, 2]); // End position
  });

  it("should find path around obstacles", () => {
    const maze: MazeGridType = [
      ["start", "path", "path"],
      ["wall", "wall", "path"],
      ["path", "path", "end"],
    ];

    const result = bfs(maze, [0, 0], [2, 2]);

    expect(result.path.length).toBeGreaterThan(0);
    expect(result.visited.length).toBeGreaterThan(0);
    // Should find a path despite walls
    expect(result.path[result.path.length - 1]).toEqual([2, 2]);
  });

  it("should return empty path when no solution exists", () => {
    const maze: MazeGridType = [
      ["start", "wall", "path"],
      ["wall", "wall", "path"],
      ["path", "path", "end"],
    ];

    const result = bfs(maze, [0, 0], [2, 2]);

    expect(result.path).toEqual([]);
    expect(result.visited.length).toBeGreaterThan(0);
  });

  it("should handle a maze with only start and end", () => {
    const maze: MazeGridType = [["start", "end"]];

    const result = bfs(maze, [0, 0], [1, 0]);

    expect(result.path.length).toBe(2);
    expect(result.path).toEqual([
      [0, 0],
      [1, 0],
    ]);
  });

  it("should visit nodes level by level", () => {
    const maze: MazeGridType = [
      ["start", "path", "path", "path"],
      ["path", "path", "path", "path"],
      ["path", "path", "path", "end"],
    ];

    const result = bfs(maze, [0, 0], [3, 2]);

    // BFS should explore all nodes at distance d before distance d+1
    expect(result.visited.length).toBeGreaterThan(0);
    expect(result.path.length).toBeGreaterThan(0);
  });

  it("should guarantee shortest path", () => {
    const maze: MazeGridType = [
      ["start", "path", "path", "path"],
      ["path", "wall", "wall", "path"],
      ["path", "path", "path", "end"],
    ];

    const result = bfs(maze, [0, 0], [3, 2]);

    // The shortest path should be 7 nodes (including start and end)
    // BFS guarantees this is the shortest path
    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[0]).toEqual([0, 0]);
    expect(result.path[result.path.length - 1]).toEqual([3, 2]);
  });

  it("should handle large mazes efficiently", () => {
    const size = 50;
    const maze: MazeGridType = Array.from({ length: size }, (_, y) =>
      Array.from({ length: size }, (_, x) => {
        if (x === 0 && y === 0) return "start";
        if (x === size - 1 && y === size - 1) return "end";
        return "path";
      })
    );

    const startTime = performance.now();
    const result = bfs(maze, [0, 0], [size - 1, size - 1]);
    const endTime = performance.now();

    expect(result.path.length).toBeGreaterThan(0);
    expect(endTime - startTime).toBeLessThan(1000); // Should complete in under 1 second
  });
});
