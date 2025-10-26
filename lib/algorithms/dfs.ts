import type { MazeGridType } from "../types";

interface AlgorithmResult {
    visited: [number, number][];
    path: [number, number][];
}

/**
 * Depth-First Search (DFS) Algorithm
 *
 * Explores as far as possible along each branch before backtracking.
 * Does NOT guarantee the shortest path!
 *
 * Time Complexity: O(V + E) where V = vertices, E = edges
 * Space Complexity: O(V) for the stack and visited set
 *
 * @param maze - 2D grid representing the maze
 * @param start - Starting coordinates [x, y]
 * @param end - Target coordinates [x, y]
 * @returns Object with visited nodes in order and found path (may not be shortest)
 */
export function dfs(
    maze: MazeGridType,
    start: [number, number],
    end: [number, number]
): AlgorithmResult {
    // Stack stores: current position and path to reach it
    const stack: Array<{
        pos: [number, number];
        path: [number, number][];
    }> = [{ pos: start, path: [start] }];

    const visited = new Set<string>([`${start[0]},${start[1]}`]);
    const visitedOrder: [number, number][] = [start];

    // Direction vectors: right, down, left, up
    const directions: [number, number][] = [
        [1, 0],  // right
        [0, 1],  // down
        [-1, 0], // left
        [0, -1], // up
    ];

    while (stack.length > 0) {
        const { pos, path } = stack.pop()!; // LIFO - Last In First Out
        const [x, y] = pos;

        // Found the target!
        if (x === end[0] && y === end[1]) {
            return {
                visited: visitedOrder,
                path: path,
            };
        }

        // Explore all neighbors (in reverse to maintain consistent direction priority)
        for (let i = directions.length - 1; i >= 0; i--) {
            const [dx, dy] = directions[i];
            const newX = x + dx;
            const newY = y + dy;
            const key = `${newX},${newY}`;

            // Check if valid move
            if (
                newX >= 0 &&
                newX < maze[0].length &&
                newY >= 0 &&
                newY < maze.length &&
                !visited.has(key) &&
                (maze[newY][newX] === "path" || maze[newY][newX] === "end")
            ) {
                visited.add(key);
                visitedOrder.push([newX, newY]);
                stack.push({
                    pos: [newX, newY],
                    path: [...path, [newX, newY]],
                });
            }
        }
    }

    // No path found
    return {
        visited: visitedOrder,
        path: [],
    };
}