"use client";

import { motion } from "framer-motion";
import { MazeGridType } from "@/lib/types";

export default function MazeGrid({ maze }: { maze: MazeGridType }) {
  return (
    <div
      className={`grid grid-cols-[repeat(20,_1fr)] gap-[2px] border border-border`}
    >
      {maze.map((row, y) =>
        row.map((cell, x) => {
          const baseColor =
            cell === "start"
              ? "bg-green-500"
              : cell === "end"
              ? "bg-red-500"
              : cell === "wall"
              ? "bg-zinc-800"
              : cell === "visited"
              ? "bg-yellow-300"
              : "bg-background";

          return (
            <motion.div
              key={`${x}-${y}`}
              className={`w-5 h-5 border border-muted-foreground ${baseColor}`}
              animate={{ scale: cell === "visited" ? 1.2 : 1 }}
              transition={{ duration: 0.2 }}
            />
          );
        })
      )}
    </div>
  );
}
