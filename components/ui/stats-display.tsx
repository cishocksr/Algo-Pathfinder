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

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-lg p-4 shadow-md"
        >
            <h3 className="text-lg font-semibold mb-3">
                {algorithm.toUpperCase()} Results
            </h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                    <p className="text-muted-foreground">Nodes Visited</p>
                    <p className="text-2xl font-bold text-primary">{stats.nodesVisited}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Path Length</p>
                    <p className="text-2xl font-bold text-primary">
                        {stats.pathLength || "No path"}
                    </p>
                </div>
                <div>
                    <p className="text-muted-foreground">Time Elapsed</p>
                    <p className="text-2xl font-bold text-primary">{stats.timeElapsed}ms</p>
                </div>
            </div>
        </motion.div>
    );
}
