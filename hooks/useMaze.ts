"use client";

import { useEffect, useState } from "react";
import type { MazeGridType } from "@/lib/types";
import { bfs } from "@/lib/algorithms/bfs";
import { dfs } from "@/lib/algorithms/dfs";

export function useMaze(width = 20, height = 20) {
  const [maze, setMaze] = useState<MazeGridType>([]);
  const [timeoutIds, setTimeoutIds] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // 👈 New state

  const [isRunning, setIsRunning] = useState(false);

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
    setIsRunning(false);
  };

  const resetMaze = () => {
    setMaze((prevMaze) =>
      prevMaze.map((row) =>
        row.map((cell) => (cell === "visited" ? "path" : cell))
      )
    );
    clearAllTimeouts();
    setIsRunning(false);
  };

  const clearAllTimeouts = () => {
    timeoutIds.forEach(clearTimeout);
    setTimeoutIds([]);
  };

  const animatePath = (steps: [number, number][][]) => {
  clearAllTimeouts();
  setIsRunning(true);
  setIsPaused(false);

  const finalPath = steps[steps.length - 1];

  steps.forEach((step, i) => {
    const [x, y] = step[step.length - 1];
    const id = window.setTimeout(() => {
      if (isPaused) return; // 👈 Don't animate if paused

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


        if (i === steps.length - 1) {
        finalPath.forEach(([fx, fy], j) => {
          const highlightId = window.setTimeout(() => {
            setMaze((prev) =>
              prev.map((row, rowIndex) =>
                row.map((cell, cellIndex) => {
                  if (rowIndex === fy && cellIndex === fx) {
                    return cell === "start" || cell === "end" ? cell : "final-path";
                  }
                  return cell;
                })
              )
            );
          }, j * 30); // highlight path slightly faster
          setTimeoutIds((prev) => [...prev, highlightId]);
        });

        setIsRunning(false);
      }
    }, i * 100); // slowed down to 100ms per step
    setTimeoutIds((prev) => [...prev, id]);
  });
};

  const traverse = (method: "bfs" | "dfs") => {
    const start: [number, number] = [0, 0];
    const end: [number, number] = [width - 1, height - 1];

    const steps =
      method === "bfs" ? bfs(maze, start, end) : dfs(maze, start, end);

    if (steps.length === 0) {
      console.warn("No path found");
      return;
    }

    animatePath(steps);
  };

  return {
    maze,
    generateMaze,
    resetMaze,
    traverse,
    showModal,
    setShowModal,
    isRunning,
  };
}
