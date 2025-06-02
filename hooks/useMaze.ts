"use client";

import { useEffect, useRef, useState } from "react";
import type { MazeGridType } from "@/lib/types";
import { bfs } from "@/lib/algorithms/bfs";
import { dfs } from "@/lib/algorithms/dfs";

export function useMaze(width = 20, height = 20) {
  const [maze, setMaze] = useState<MazeGridType>([]);
  const [timeoutIds, setTimeoutIds] = useState<ReturnType<typeof setTimeout>[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const traversalRef = useRef<[number, number][]>([]);
  const indexRef = useRef(0);

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
    setIsPaused(false);
    traversalRef.current = [];
    indexRef.current = 0;
  };

  const resetMaze = () => {
    setMaze((prevMaze) =>
      prevMaze.map((row) =>
        row.map((cell) => (cell === "visited" ? "path" : cell))
      )
    );
    clearAllTimeouts();
    setIsRunning(false);
    setIsPaused(false);
    traversalRef.current = [];
    indexRef.current = 0;
  };

  const clearAllTimeouts = () => {
    timeoutIds.forEach(clearTimeout);
    setTimeoutIds([]);
  };

  const traverse = (method: "bfs" | "dfs") => {
    const algorithm = method === "bfs" ? bfs : dfs;
    const start: [number, number] = [0, 0];
    const end: [number, number] = [maze.length - 1, maze[0].length - 1];
    const fullPaths = algorithm(maze, start, end);

    traversalRef.current = fullPaths.map(p => p[p.length - 1]);
    indexRef.current = 0;

    setIsRunning(true);
    setIsPaused(false);
    stepThroughTraversal();
  };

  const stepThroughTraversal = () => {
    const steps = traversalRef.current;
    let ids: ReturnType<typeof setTimeout>[] = [];

    for (let i = indexRef.current; i < steps.length; i++) {
      const [x, y] = steps[i];

      const id = setTimeout(() => {
        if (isPaused) return;
        setMaze((prev) =>
          prev.map((row, rowIndex) =>
            row.map((cell, cellIndex) =>
              rowIndex === y && cellIndex === x && cell !== "start" && cell !== "end"
                ? "visited"
                : cell
            )
          )
        );
        indexRef.current = i + 1;

        if (i === steps.length - 1) {
          setIsRunning(false);
        }
      }, (i - indexRef.current) * 50);

      ids.push(id);
    }

    setTimeoutIds(ids);
  };

  useEffect(() => {
    if (!isPaused && isRunning) {
      stepThroughTraversal();
    } else {
      clearAllTimeouts();
    }
  }, [isPaused]);

  return {
    maze,
    generateMaze,
    resetMaze,
    traverse,
    showModal,
    setShowModal,
    isRunning,
    isPaused,
    setIsPaused,
  };
}
