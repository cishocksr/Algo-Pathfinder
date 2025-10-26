import type { MazeGridType } from "../types";

interface AlgorithmResult {
    visited: [number, number][];
    path: [number, number][];
}

interface Node {
    pos: [number, number];
    path: [number, number][];
    g: number; // Cost from start to current node
    h: number; // Heuristic (estimated cost to end)
    f: number; // Total cost (g + h)
}

/**
 * Manhattan distance heuristic for A*
 * Works well for grid-based movement (no diagonals)
 */
function manhattanDistance(
    pos: [number, number],
    end: [number, number]
): number {
    return Math.abs(pos[0] - end[0]) + Math.abs(pos[1] - end[1]);
}

/**
 * A* (A-Star) Algorithm
 *
 * Uses a heuristic to guide search towards the goal.
 * Guarantees shortest path with admissible heuristic.
 *
 * Time Complexity: O(E) where E = edges (with good heuristic)
 * Space Complexity: O(V) for the priority queue
 *
 * @param maze - 2D grid representing the maze
 * @param start - Starting coordinates [x, y]
 * @param end - Target coordinates [x, y]
 * @returns Object with visited nodes in order and shortest path
 */
export function astar(
    maze: MazeGridType,
    start: [number, number],
    end: [number, number]
): AlgorithmResult {
    // Priority queue (simple array, sorted by f-score)
    const openSet: Node[] = [
        {
            pos: start,
            path: [start],
            g: 0,
            h: manhattanDistance(start, end),
            f: manhattanDistance(start, end),
        },
    ];

    const visited = new Set<string>([`${start[0]},${start[1]}`]);
    const visitedOrder: [number, number][] = [start];

    const directions: [number, number][] = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];

    while (openSet.length > 0) {
        // Get node with lowest f-score
        openSet.sort((a, b) => a.f - b.f);
        const current = openSet.shift()!;
        const [x, y] = current.pos;

        // Found the target!
        if (x === end[0] && y === end[1]) {
            return {
                visited: visitedOrder,
                path: current.path,
            };
        }

        // Explore neighbors
        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            const key = `${newX},${newY}`;

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

                const g = current.g + 1; // Each step costs 1
                const h = manhattanDistance([newX, newY], end);
                const f = g + h;

                openSet.push({
                    pos: [newX, newY],
                    path: [...current.path, [newX, newY]],
                    g,
                    h,
                    f,
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