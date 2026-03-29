import type { MazeGridType, AlgorithmResult } from "../types";
import { reconstructPath } from "./reconstruct-path";

interface AStarNode {
  pos: [number, number];
  g: number; // Cost from start to current node
  f: number; // Total cost (g + h)
}

/**
 * Binary min-heap keyed on f-score for O(log n) insert/extract.
 * Replaces the naive array sort (O(n log n) per iteration).
 */
class MinHeap {
  private heap: AStarNode[] = [];

  get size(): number {
    return this.heap.length;
  }

  push(node: AStarNode): void {
    this.heap.push(node);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): AStarNode | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.sinkDown(0);
    }
    return min;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].f <= this.heap[index].f) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  private sinkDown(index: number): void {
    const length = this.heap.length;
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < length && this.heap[left].f < this.heap[smallest].f) {
        smallest = left;
      }
      if (right < length && this.heap[right].f < this.heap[smallest].f) {
        smallest = right;
      }
      if (smallest === index) break;

      [this.heap[smallest], this.heap[index]] = [
        this.heap[index],
        this.heap[smallest],
      ];
      index = smallest;
    }
  }
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
 * Time Complexity: O(V log V) with binary heap
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
  const h = manhattanDistance(start, end);
  const openSet = new MinHeap();
  openSet.push({ pos: start, g: 0, f: h });

  const visited = new Set<string>([`${start[0]},${start[1]}`]);
  const visitedOrder: [number, number][] = [start];

  // Parent map for O(V) path reconstruction instead of O(V²) path copies
  const parentMap = new Map<string, [number, number] | null>();
  parentMap.set(`${start[0]},${start[1]}`, null);

  const directions: [number, number][] = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  while (openSet.size > 0) {
    const current = openSet.pop()!;
    const [x, y] = current.pos;

    // Found the target!
    if (x === end[0] && y === end[1]) {
      return {
        visited: visitedOrder,
        path: reconstructPath(parentMap, end),
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
        parentMap.set(key, [x, y]);

        const g = current.g + 1;
        const newH = manhattanDistance([newX, newY], end);
        openSet.push({ pos: [newX, newY], g, f: g + newH });
      }
    }
  }

  // No path found
  return {
    visited: visitedOrder,
    path: [],
  };
}
