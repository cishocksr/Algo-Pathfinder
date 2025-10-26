"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MazeGridType } from "@/lib/types";
import { bfs } from "@/lib/algorithms/bfs";
import { dfs } from "@/lib/algorithms/dfs";

// Constants instead of magic numbers
const WALL_PROBABILITY = 0.2;
const DEFAULT_ANIMATION_SPEED = 50; // ms per step

type AlgorithmType = "bfs" | "dfs";

interface AlgorithmResult {
    visited: [number, number][];
    path: [number, number][];
}

interface AlgorithmStats {
    nodesVisited: number;
    pathLength: number;
    timeElapsed: number;
}

export function useMaze(width = 20, height = 20) {
    const [maze, setMaze] = useState<MazeGridType>([]);
    const [showModal, setShowModal] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [animationSpeed, setAnimationSpeed] = useState(DEFAULT_ANIMATION_SPEED);
    const [currentAlgorithm, setCurrentAlgorithm] = useState<AlgorithmType | null>(null);
    const [stats, setStats] = useState<AlgorithmStats | null>(null);

    // Use refs for animation control
    const visitedNodesRef = useRef<[number, number][]>([]);
    const finalPathRef = useRef<[number, number][]>([]);
    const currentStepRef = useRef(0);
    const animationIdRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    // Generate maze with proper typing and constants
    const generateMaze = useCallback((w: number, h: number) => {
        const newMaze: MazeGridType = Array.from({ length: h }, (_, rowIdx) =>
            Array.from({ length: w }, (_, colIdx) => {
                if (rowIdx === 0 && colIdx === 0) return "start";
                if (rowIdx === h - 1 && colIdx === w - 1) return "end";
                return Math.random() > WALL_PROBABILITY ? "path" : "wall";
            })
        );

        setMaze(newMaze);
        resetAnimation();
    }, []);

    // Initialize maze on mount
    useEffect(() => {
        generateMaze(width, height);
    }, [width, height, generateMaze]);

    // Clean animation state
    const resetAnimation = useCallback(() => {
        if (animationIdRef.current !== null) {
            clearTimeout(animationIdRef.current);
            animationIdRef.current = null;
        }
        visitedNodesRef.current = [];
        finalPathRef.current = [];
        currentStepRef.current = 0;
        setIsRunning(false);
        setIsPaused(false);
        setCurrentAlgorithm(null); // Clear algorithm on reset
        setStats(null); // Clear stats on reset
    }, []);

    // Reset only visited cells, keep walls
    const resetMaze = useCallback(() => {
        setMaze((prevMaze) =>
            prevMaze.map((row) =>
                row.map((cell) =>
                    cell === "visited" || cell === "final-path" ? "path" : cell
                )
            )
        );
        resetAnimation();
    }, [resetAnimation]);

    // Animation step function
    const animateStep = useCallback(() => {
        const visitedNodes = visitedNodesRef.current;
        const finalPath = finalPathRef.current;
        const step = currentStepRef.current;

        // Phase 1: Show visited nodes
        if (step < visitedNodes.length) {
            const [x, y] = visitedNodes[step];

            setMaze((prev) =>
                prev.map((row, rowIdx) =>
                    row.map((cell, colIdx) =>
                        rowIdx === y && colIdx === x && cell !== "start" && cell !== "end"
                            ? "visited"
                            : cell
                    )
                )
            );

            currentStepRef.current++;

            if (!isPaused) {
                animationIdRef.current = window.setTimeout(
                    animateStep,
                    animationSpeed
                );
            }
        }
        // Phase 2: Show final path
        else if (step - visitedNodes.length < finalPath.length) {
            const pathIndex = step - visitedNodes.length;
            const [x, y] = finalPath[pathIndex];

            setMaze((prev) =>
                prev.map((row, rowIdx) =>
                    row.map((cell, colIdx) =>
                        rowIdx === y && colIdx === x && cell !== "start" && cell !== "end"
                            ? "final-path"
                            : cell
                    )
                )
            );

            currentStepRef.current++;

            if (!isPaused) {
                animationIdRef.current = window.setTimeout(
                    animateStep,
                    animationSpeed / 2 // Faster for final path
                );
            }
        }
        // Animation complete
        else {
            const endTime = performance.now();
            setStats({
                nodesVisited: visitedNodes.length,
                pathLength: finalPath.length,
                timeElapsed: Math.round(endTime - startTimeRef.current),
            });
            setIsRunning(false);
            // 🔧 FIX: Don't clear currentAlgorithm here!
            // Keep it so StatsDisplay can show which algorithm was used
            // It will be cleared when user runs a new algorithm or resets
        }
    }, [animationSpeed, isPaused]);

    // Handle pause/resume
    useEffect(() => {
        if (isRunning && !isPaused && animationIdRef.current === null) {
            animateStep();
        } else if (isPaused && animationIdRef.current !== null) {
            clearTimeout(animationIdRef.current);
            animationIdRef.current = null;
        }
    }, [isPaused, isRunning, animateStep]);

    // Run algorithm
    const traverse = useCallback(
        (method: AlgorithmType) => {
            if (isRunning) return; // Prevent running multiple algorithms

            resetMaze();

            const algorithm = method === "bfs" ? bfs : dfs;
            const start: [number, number] = [0, 0];
            const end: [number, number] = [width - 1, height - 1];

            startTimeRef.current = performance.now();

            // Run algorithm (this should return {visited, path})
            const result = algorithm(maze, start, end) as AlgorithmResult;

            if (result.visited.length === 0) {
                alert("No path found!");
                return;
            }

            visitedNodesRef.current = result.visited;
            finalPathRef.current = result.path;
            currentStepRef.current = 0;

            setCurrentAlgorithm(method);
            setIsRunning(true);
            setIsPaused(false);

            // Start animation
            animateStep();
        },
        [maze, width, height, isRunning, resetMaze, animateStep]
    );

    // Toggle pause
    const togglePause = useCallback(() => {
        if (isRunning) {
            setIsPaused((prev) => !prev);
        }
    }, [isRunning]);

    // Stop animation completely
    const stopAnimation = useCallback(() => {
        resetAnimation();
        resetMaze();
    }, [resetAnimation, resetMaze]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationIdRef.current !== null) {
                clearTimeout(animationIdRef.current);
            }
        };
    }, []);

    return {
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
    };
}