"use client";

import { motion } from "framer-motion";
import { MazeGridType } from "@/lib/types";

export default function MazeGrid({
  maze,
  columns = 20,
}: {
  maze: MazeGridType;
  columns?: number;
}) {
  return (
    <div className="w-full max-w-full overflow-auto flex justify-center">
      <div
        className="grid gap-[2px] border border-border"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(1.25rem, 1fr))`,
        }}
      >
        {maze.map((row, y) =>
          row.map((cell, x) => {
            const baseColor =
              cell === "start"
                ? "bg-green-500"
                : cell === "end"
                ? "bg-red-500"
                : cell === "wall"
                ? "bg-zinc-600 dark:bg-zinc-400"
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
    </div>
  );
}
