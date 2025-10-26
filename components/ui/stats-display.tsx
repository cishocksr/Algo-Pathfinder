"use client";

import { motion } from "framer-motion";

interface AlgorithmStats {
    nodesVisited: number;
    pathLength: number;
    timeElapsed: number;
}

interface StatsDisplayProps {
    stats: AlgorithmStats | null;
    algorithm: string | null;
}

/**
 * StatsDisplay Component
 *
 * Shows algorithm performance metrics after completion
 */
export function StatsDisplay({ stats, algorithm }: StatsDisplayProps) {
    if (!stats || !algorithm) return null;

    // Format algorithm name for display
    const getAlgorithmLabel = (algo: string): string => {
        switch (algo.toLowerCase()) {
            case "bfs":
                return "BFS";
            case "dfs":
                return "DFS";
            case "astar":
                return "A*";
            default:
                return algo.toUpperCase();
        }
    };

    // Get color based on algorithm
    const getAlgorithmColor = (algo: string): string => {
        switch (algo.toLowerCase()) {
            case "bfs":
                return "text-blue-600 dark:text-blue-400";
            case "dfs":
                return "text-purple-600 dark:text-purple-400";
            case "astar":
                return "text-green-600 dark:text-green-400";
            default:
                return "text-primary";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-lg p-6 shadow-md w-full max-w-3xl"
        >
            <h3 className={`text-xl font-semibold mb-4 ${getAlgorithmColor(algorithm)}`}>
                {getAlgorithmLabel(algorithm)} Results
            </h3>
            <div className="grid grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                    <p className="text-muted-foreground mb-1">Nodes Visited</p>
                    <p className="text-3xl font-bold text-foreground">{stats.nodesVisited}</p>
                    <p className="text-xs text-muted-foreground mt-1">cells explored</p>
                </div>
                <div className="text-center">
                    <p className="text-muted-foreground mb-1">Path Length</p>
                    <p className="text-3xl font-bold text-foreground">
                        {stats.pathLength || "No path"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {stats.pathLength ? "steps to goal" : ""}
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-muted-foreground mb-1">Time Elapsed</p>
                    <p className="text-3xl font-bold text-foreground">{stats.timeElapsed}ms</p>
                    <p className="text-xs text-muted-foreground mt-1">execution time</p>
                </div>
            </div>

            {/* Efficiency indicator */}
            {stats.pathLength > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Efficiency Ratio:</span>
                        <span className="font-semibold">
                            {((stats.pathLength / stats.nodesVisited) * 100).toFixed(1)}%
                        </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Lower is better - indicates how many nodes were explored vs. the final path length
                    </p>
                </div>
            )}
        </motion.div>
    );
}