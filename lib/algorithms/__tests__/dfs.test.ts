import { dfs } from "../dfs";
import type { MazeGridType } from "../../types";

describe("DFS Algorithm", () => {
    it("should find a path in a simple maze", () => {
        const maze: MazeGridType = [
            ["start", "path", "path"],
            ["path", "path", "path"],
            ["path", "path", "end"],
        ];

        const result = dfs(maze, [0, 0], [2, 2]);

        expect(result.path.length).toBeGreaterThan(0);
        expect(result.path[0]).toEqual([0, 0]); // Start position
        expect(result.path[result.path.length - 1]).toEqual([2, 2]); // End position
    });

    it("should explore deeply before backtracking", () => {
        const maze: MazeGridType = [
            ["start", "path", "path", "path"],
            ["path", "path", "path", "path"],
            ["path", "path", "path", "end"],
        ];

        const result = dfs(maze, [0, 0], [3, 2]);

        // DFS should find a path, but may not be shortest
        expect(result.path.length).toBeGreaterThan(0);
        expect(result.visited.length).toBeGreaterThan(0);
    });

    it("should return empty path when no solution exists", () => {
        const maze: MazeGridType = [
            ["start", "wall", "path"],
            ["wall", "wall", "path"],
            ["path", "path", "end"],
        ];

        const result = dfs(maze, [0, 0], [2, 2]);

        expect(result.path).toEqual([]);
        expect(result.visited.length).toBeGreaterThan(0);
    });

    it("should handle a maze with only start and end", () => {
        const maze: MazeGridType = [
            ["start", "end"],
        ];

        const result = dfs(maze, [0, 0], [1, 0]);

        expect(result.path.length).toBe(2);
        expect(result.path).toEqual([[0, 0], [1, 0]]);
    });

    it("should find path around obstacles", () => {
        const maze: MazeGridType = [
            ["start", "path", "path"],
            ["wall", "wall", "path"],
            ["path", "path", "end"],
        ];

        const result = dfs(maze, [0, 0], [2, 2]);

        expect(result.path.length).toBeGreaterThan(0);
        // Should find a path despite walls
        expect(result.path[result.path.length - 1]).toEqual([2, 2]);
    });

    it("may not find the shortest path (unlike BFS)", () => {
        const maze: MazeGridType = [
            ["start", "path", "end"],
            ["path", "path", "path"],
            ["path", "path", "path"],
        ];

        const result = dfs(maze, [0, 0], [2, 0]);

        // DFS will find a path, but it might be longer than the shortest path (3 nodes)
        expect(result.path.length).toBeGreaterThan(0);
        // The path length could be longer than optimal due to DFS's depth-first nature
    });

    it("should handle complex mazes with multiple paths", () => {
        const maze: MazeGridType = [
            ["start", "path", "wall", "path"],
            ["path", "path", "path", "path"],
            ["wall", "path", "wall", "path"],
            ["path", "path", "path", "end"],
        ];

        const result = dfs(maze, [0, 0], [3, 3]);

        expect(result.path.length).toBeGreaterThan(0);
        expect(result.path[0]).toEqual([0, 0]);
        expect(result.path[result.path.length - 1]).toEqual([3, 3]);
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
        const result = dfs(maze, [0, 0], [size - 1, size - 1]);
        const endTime = performance.now();

        expect(result.path.length).toBeGreaterThan(0);
        expect(endTime - startTime).toBeLessThan(1000); // Should complete in under 1 second
    });
});