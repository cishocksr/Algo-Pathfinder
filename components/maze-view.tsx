"use client";

import MazeGrid from "@/components/maze-grid";
import ControlPanel from "@/components/control-panel";
import AlgorithmModal from "@/components/modal";
import { StatsDisplay } from "@/components/stats-display";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMaze } from "@/hooks/use-maze";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Zap, Target } from "lucide-react";

export default function MazeView() {
    const {
        maze,
        generateMaze,
        resetMaze,
        traverse,
        showModal,
        setShowModal,
        isRunning,
        isPaused,
        togglePause,
        stopAnimation,
        animationSpeed,
        setAnimationSpeed,
        currentAlgorithm,
        stats,
    } = useMaze();

    const { toast } = useToast();
    const [gridSize, setGridSize] = useState({ cols: 20, rows: 20 });

    const handleResizeGrid = (cols: number, rows: number) => {
        setGridSize({ cols, rows });
        generateMaze(cols, rows);
        toast({
            title: "Grid Resized",
            description: `New maze generated with size ${cols}×${rows}`,
        });
    };

    const handleAlgorithmStart = (algorithm: string) => {
        toast({
            title: `Starting ${algorithm.toUpperCase()}`,
            description: "Watch the algorithm explore the maze!",
        });
    };

    const handleNewMaze = () => {
        generateMaze(gridSize.cols, gridSize.rows);
        toast({
            title: "New Maze Generated",
            description: "Ready to explore!",
            variant: "success",
        });
    };

    // Show completion toast when algorithm finishes
    useEffect(() => {
        if (stats && currentAlgorithm) {
            const algorithmLabel = currentAlgorithm === "astar" ? "A*" : currentAlgorithm.toUpperCase();
            if (stats.pathLength > 0) {
                toast({
                    title: `${algorithmLabel} Complete!`,
                    description: `Found path with ${stats.pathLength} steps in ${stats.timeElapsed}ms`,
                    variant: "success",
                });
            } else {
                toast({
                    title: `${algorithmLabel} Complete`,
                    description: "No path found to the destination",
                    variant: "destructive",
                });
            }
        }
    }, [stats, currentAlgorithm, toast]);

    return (
        <div className="flex flex-col items-center gap-8">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-2"
            >
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Algorithm Pathfinder
                </h1>
                <p className="text-muted-foreground text-sm max-w-2xl">
                    Visualize how different pathfinding algorithms explore a maze to find the shortest path
                </p>
                {currentAlgorithm && (
                    <Badge variant="info" className="mt-2">
                        <Activity className="mr-1 size-3" />
                        Running: {currentAlgorithm === "astar" ? "A*" : currentAlgorithm.toUpperCase()}
                    </Badge>
                )}
            </motion.div>

            {/* Info Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Target className="size-4 text-blue-500" />
                            Grid Size
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{gridSize.cols}×{gridSize.rows}</div>
                        <CardDescription className="text-xs">
                            {gridSize.cols * gridSize.rows} total cells
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Zap className="size-4 text-amber-500" />
                            Speed
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{animationSpeed}ms</div>
                        <CardDescription className="text-xs">
                            Animation delay per step
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Activity className="size-4 text-green-500" />
                            Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            {isRunning ? (
                                <>
                                    <Badge variant={isPaused ? "warning" : "success"}>
                                        {isPaused ? "Paused" : "Running"}
                                    </Badge>
                                    <div className={`size-2 rounded-full ${isPaused ? 'bg-amber-500' : 'bg-green-500 animate-pulse'}`} />
                                </>
                            ) : (
                                <Badge variant="secondary">Ready</Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Control Panel */}
            <Card className="w-full max-w-5xl">
                <CardContent className="pt-6">
                    <ControlPanel
                        onBfs={() => {
                            traverse("bfs");
                            handleAlgorithmStart("BFS");
                        }}
                        onDfs={() => {
                            traverse("dfs");
                            handleAlgorithmStart("DFS");
                        }}
                        onAstar={() => {
                            traverse("astar");
                            handleAlgorithmStart("A*");
                        }}
                        onReset={resetMaze}
                        onNewMaze={handleNewMaze}
                        onShowModal={() => setShowModal(true)}
                        onResizeGrid={handleResizeGrid}
                        onTogglePause={togglePause}
                        onStop={stopAnimation}
                        isRunning={isRunning}
                        isPaused={isPaused}
                        animationSpeed={animationSpeed}
                        onSpeedChange={setAnimationSpeed}
                    />
                </CardContent>
            </Card>

            {/* Stats Display - Shows after algorithm completes */}
            {stats && <StatsDisplay stats={stats} algorithm={currentAlgorithm} />}

            {/* Maze Grid */}
            <Card className="w-full max-w-fit">
                <CardContent className="p-0">
                    <MazeGrid maze={maze} columns={gridSize.cols} />
                </CardContent>
            </Card>

            {/* Algorithm Info Modal */}
            <AlgorithmModal open={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
}