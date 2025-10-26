"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

export default function AlgorithmModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-background p-6 rounded-xl"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Pathfinding Algorithms
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 text-sm mt-4">
            {/* BFS Section */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">
                BFS (Breadth-First Search)
              </h3>
              <p className="text-muted-foreground">
                Explores all neighbors at the current depth before moving to
                nodes at the next depth level.
              </p>
              <div className="bg-muted/50 p-3 rounded-md space-y-1">
                <p>
                  <strong>Guarantees:</strong> ✅ Shortest path
                </p>
                <p>
                  <strong>Time Complexity:</strong> O(V + E)
                </p>
                <p>
                  <strong>Space Complexity:</strong> O(V)
                </p>
                <p>
                  <strong>Best for:</strong> Unweighted graphs, finding shortest
                  path
                </p>
              </div>
            </div>

            {/* DFS Section */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">
                DFS (Depth-First Search)
              </h3>
              <p className="text-muted-foreground">
                Explores as far as possible along each branch before
                backtracking.
              </p>
              <div className="bg-muted/50 p-3 rounded-md space-y-1">
                <p>
                  <strong>Guarantees:</strong> ❌ May not find shortest path
                </p>
                <p>
                  <strong>Time Complexity:</strong> O(V + E)
                </p>
                <p>
                  <strong>Space Complexity:</strong> O(V)
                </p>
                <p>
                  <strong>Best for:</strong> Exploring all paths, maze
                  generation, topological sorting
                </p>
              </div>
            </div>

            {/* A* Section */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">
                A* (A-Star)
              </h3>
              <p className="text-muted-foreground">
                Uses a heuristic function to guide the search toward the goal,
                combining the benefits of Dijkstra&apos;s algorithm and greedy
                best-first search.
              </p>
              <div className="bg-muted/50 p-3 rounded-md space-y-1">
                <p>
                  <strong>Guarantees:</strong> ✅ Shortest path (with admissible
                  heuristic)
                </p>
                <p>
                  <strong>Time Complexity:</strong> O(E) with good heuristic
                </p>
                <p>
                  <strong>Space Complexity:</strong> O(V)
                </p>
                <p>
                  <strong>Best for:</strong> Pathfinding with obstacles, game
                  AI, navigation systems
                </p>
                <p>
                  <strong>Heuristic:</strong> Manhattan distance (perfect for
                  grid-based movement)
                </p>
              </div>
            </div>

            {/* Comparison */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">
                When to Use Each Algorithm?
              </h3>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>
                  <strong>BFS:</strong> When you need the shortest path and all
                  edges have equal weight
                </li>
                <li>
                  <strong>DFS:</strong> When you need to explore all possible
                  paths or don&apos;t care about optimality
                </li>
                <li>
                  <strong>A*:</strong> When you need the optimal path and want
                  better performance than BFS
                </li>
              </ul>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">
                Visualization Legend
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded" />
                  <span>Start</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded" />
                  <span>End</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-zinc-600 rounded" />
                  <span>Wall</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-300 rounded" />
                  <span>Visited (Exploring)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-400 rounded" />
                  <span>Final Path</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white border border-zinc-300 rounded" />
                  <span>Empty Path</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
