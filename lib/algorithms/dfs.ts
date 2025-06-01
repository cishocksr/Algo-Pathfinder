import type { MazeGridType } from "../types";

/**
 * Depth-First Search
 * Returns an array of step-by-step paths to visualize DFS progress
 */
export function dfs(
  maze: MazeGridType,
  start: [number, number],
  end: [number, number]
): [number, number][][] {
  const stack: [number, number][][] = [[[...start]]];
  const visited = new Set<string>([`${start[0]},${start[1]}`]);

  while (stack.length > 0) {
    const path = stack.pop()!;
    const [x, y] = path[path.length - 1];

    if (x === end[0] && y === end[1]) {
      return path.map((_, i) => path.slice(0, i + 1));
    }

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      const key = `${nx},${ny}`;

      if (
        nx >= 0 &&
        ny >= 0 &&
        ny < maze.length &&
        nx < maze[0].length &&
        !visited.has(key) &&
        (maze[ny][nx] === "path" || maze[ny][nx] === "end")
      ) {
        visited.add(key);
        stack.push([...path, [nx, ny]]);
      }
    }
  }

  return []; // No path found
}

