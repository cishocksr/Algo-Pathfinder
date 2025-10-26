"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { MazeGridType } from "@/lib/types";

interface MazeGridProps {
  maze: MazeGridType;
  columns?: number;
  onCellClick?: (x: number, y: number) => void;
  isInteractive?: boolean;
}

/**
 * MazeGrid Component
 *
 * Displays the maze with animated cells. Uses React.memo for performance
 * with large grids. Shows different colors for:
 * - Start (green)
 * - End (red)
 * - Walls (dark gray)
 * - Visited cells (yellow - exploration phase)
 * - Final path (blue - solution)
 */
const MazeGrid = memo(
  function MazeGrid({
    maze,
    columns = 20,
    onCellClick,
    isInteractive = false,
  }: MazeGridProps) {
    // Color mapping with better accessibility
    const getCellColor = (cell: string): string => {
      switch (cell) {
        case "start":
          return "bg-green-500 dark:bg-green-600";
        case "end":
          return "bg-red-500 dark:bg-red-600";
        case "wall":
          return "bg-zinc-600 dark:bg-zinc-400";
        case "visited":
          return "bg-amber-300 dark:bg-amber-500"; // Better contrast
        case "final-path":
          return "bg-blue-400 dark:bg-blue-600"; // Clear solution path
        case "path":
        default:
          return "bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700";
      }
    };

    // Animation variants for cell state changes
    const cellVariants = {
      visited: {
        scale: [1, 1.2, 1],
        transition: { duration: 0.3 },
      },
      finalPath: {
        scale: [1, 1.3, 1.1],
        transition: { duration: 0.4 },
      },
    };

    return (
      <div className="w-full max-w-full overflow-auto flex justify-center p-4">
        <div
          className="grid gap-[1px] border-2 border-border rounded-lg overflow-hidden shadow-lg"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(1.25rem, 1fr))`,
          }}
          role="grid"
          aria-label="Pathfinding maze visualization"
        >
          {maze.map((row, y) =>
            row.map((cell, x) => {
              const baseColor = getCellColor(cell);
              const isClickable =
                isInteractive && cell !== "start" && cell !== "end";

              return (
                <motion.div
                  key={`${x}-${y}`}
                  className={`
                  w-5 h-5 
                  ${baseColor}
                  ${isClickable ? "cursor-pointer hover:opacity-80" : ""}
                  transition-colors
                `}
                  variants={cellVariants}
                  animate={
                    cell === "visited"
                      ? "visited"
                      : cell === "final-path"
                        ? "finalPath"
                        : undefined
                  }
                  onClick={() => isClickable && onCellClick?.(x, y)}
                  role="gridcell"
                  aria-label={`Cell at row ${y}, column ${x}, type ${cell}`}
                />
              );
            })
          )}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for memo - only re-render if maze or columns actually changed
    return (
      prevProps.maze === nextProps.maze &&
      prevProps.columns === nextProps.columns &&
      prevProps.isInteractive === nextProps.isInteractive
    );
  }
);

export default MazeGrid;
