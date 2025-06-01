"use client";

import { useEffect, useState } from "react";
import type { MazeGridType } from "@/lib/types";

export function useMaze(width = 20, height = 20) {
  const [maze, setMaze] = useState<MazeGridType>([]);
  const [timeoutIds, setTimeoutIds] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    generateMaze(width, height);
  }, []);

  const generateMaze = (w: number, h: number) => {
    const newMaze = Array.from({ length: h }, (_, y) =>
      Array.from({ length: w }, (_, x) =>
        x === 0 && y === 0
          ? "start"
          : x === w - 1 && y === h - 1
          ? "end"
          : Math.random() > 0.2
          ? "path"
          : "wall"
      )
    );
    setMaze(newMaze);
    clearAllTimeouts();
  };

  const resetMaze = () => {
    setMaze((prevMaze) =>
      prevMaze.map((row) =>
        row.map((cell) => (cell === "visited" ? "path" : cell))
      )
    );
    clearAllTimeouts();
  };

  const clearAllTimeouts = () => {
    timeoutIds.forEach(clearTimeout);
    setTimeoutIds([]);
  };

  const traverse = (method: "bfs" | "dfs") => {
    const structure: [number, number][] = [[0, 0]];
    const visited = new Set(["0,0"]);

    const step = () => {
      if (structure.length === 0) return;
      const [x, y] =
        method === "bfs" ? structure.shift()! : structure.pop()!;
      const directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ];

      const visitCell = ([x, y]: [number, number]) => {
        setMaze((prev) =>
          prev.map((row, rowIndex) =>
            row.map((cell, cellIndex) => {
              if (rowIndex === y && cellIndex === x) {
                return cell === "start" || cell === "end" ? cell : "visited";
              }
              return cell;
            })
          )
        );
        return maze[y][x] === "end";
      };

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        const key = `${nx},${ny}`;
        if (
          nx >= 0 &&
          nx < width &&
          ny >= 0 &&
          ny < height &&
          !visited.has(key)
        ) {
          visited.add(key);
          if (maze[ny][nx] === "path" || maze[ny][nx] === "end") {
            if (visitCell([nx, ny])) return;
            structure.push([nx, ny]);
          }
        }
      }

      const id = window.setTimeout(step, 50);
      setTimeoutIds((prev) => [...prev, id]);
    };

    step();
  };

  return {
    maze,
    generateMaze,
    resetMaze,
    traverse,
    showModal,
    setShowModal,
  };
}
