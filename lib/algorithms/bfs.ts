import type { MazeGridType } from "../types";

interface AlgorithmResult {
  visited: [number, number][]; // Order nodes were explored
  path: [number, number][]; // Shortest path from start to end
}

/**
 * Breadth-First Search (BFS) Algorithm
 *
 * Explores nodes level by level, guaranteeing the shortest path
 * in an unweighted graph.
 *
 * Time Complexity: O(V + E) where V = vertices, E = edges
 * Space Complexity: O(V) for the queue and visited set
 *
 * @param maze - 2D grid representing the maze
 * @param start - Starting coordinates [x, y]
 * @param end - Target coordinates [x, y]
 * @returns Object with visited nodes in order and shortest path
 */
export function bfs(
  maze: MazeGridType,
  start: [number, number],
  end: [number, number]
): AlgorithmResult {
  // Queue stores: current position and path to reach it
  const queue: Array<{
    pos: [number, number];
    path: [number, number][];
  }> = [{ pos: start, path: [start] }];

  const visited = new Set<string>([`${start[0]},${start[1]}`]);
  const visitedOrder: [number, number][] = [start];

  // Direction vectors: right, down, left, up
  const directions: [number, number][] = [
    [1, 0], // right
    [0, 1], // down
    [-1, 0], // left
    [0, -1], // up
  ];

  while (queue.length > 0) {
    const { pos, path } = queue.shift()!;
    const [x, y] = pos;

    // Found the target!
    if (x === end[0] && y === end[1]) {
      return {
        visited: visitedOrder,
        path: path,
      };
    }

    // Explore all neighbors
    for (const [dx, dy] of directions) {
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
        queue.push({
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
