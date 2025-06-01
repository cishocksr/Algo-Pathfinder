"use client";

import { motion } from "framer-motion";
import { MazeGridType } from "@/lib/types";

export default function MazeGrid({ maze }: { maze: MazeGridType }) {
  const cols = maze[0]?.length || 20;

  const getColor = (cell: string) => {
    switch (cell) {
      case "start":
        return "bg-green-500";
      case "end":
        return "bg-red-500";
      case "wall":
        return "bg-zinc-800";
      case "visited":
        return "bg-yellow-300";
      case "final-path":
        return "bg-blue-500";
      default:
        return "bg-background";
    }
  };

  return (
    <div
      className={`grid grid-cols-[repeat(${cols},_1fr)] gap-[2px] border border-border`}
    >
      {maze.map((row, y) =>
        row.map((cell, x) => (
          <motion.div
            key={`${x}-${y}`}
            className={`w-5 h-5 border border-muted-foreground ${getColor(
              cell
            )}`}
            animate={{ scale: cell === "visited" ? 1.2 : 1 }}
            transition={{ duration: 0.2 }}
          />
        ))
      )}
    </div>
  );
}
