"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Play, Pause, Square, Zap } from "lucide-react";

const MotionButton = motion(Button);

interface ControlPanelProps {
  onBfs: () => void;
  onDfs: () => void;
  onAstar: () => void;
  onReset: () => void;
  onNewMaze: () => void;
  onShowModal: () => void;
  onResizeGrid: (cols: number, rows: number) => void;
  onTogglePause: () => void;
  onStop: () => void;
  isRunning: boolean;
  isPaused: boolean;
  animationSpeed: number;
  onSpeedChange: (speed: number) => void;
}

export default function ControlPanel({
  onBfs,
  onDfs,
  onAstar,
  onReset,
  onNewMaze,
  onShowModal,
  onResizeGrid,
  onTogglePause,
  onStop,
  isRunning,
  isPaused,
  animationSpeed,
  onSpeedChange,
}: ControlPanelProps) {
  const buttonVariants = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  // Convert speed (ms per step) to readable label
  const getSpeedLabel = (speed: number) => {
    if (speed <= 10) return "Very Fast";
    if (speed <= 30) return "Fast";
    if (speed <= 60) return "Normal";
    if (speed <= 100) return "Slow";
    return "Very Slow";
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl">
      {/* Main Controls */}
      <div className="flex flex-wrap justify-center gap-2">
        <MotionButton
          {...buttonVariants}
          onClick={onBfs}
          variant="default"
          disabled={isRunning}
        >
          <Play size={16} />
          Start BFS
        </MotionButton>
        <MotionButton
          {...buttonVariants}
          onClick={onDfs}
          variant="default"
          disabled={isRunning}
        >
          <Play size={16} />
          Start DFS
        </MotionButton>
        <MotionButton
          {...buttonVariants}
          onClick={onAstar}
          variant="default"
          disabled={isRunning}
        >
          <Play size={16} />
          Start A*
        </MotionButton>

        {/* Pause/Resume Button (only visible when running) */}
        {isRunning && (
          <MotionButton
            {...buttonVariants}
            onClick={onTogglePause}
            variant="secondary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {isPaused ? (
              <>
                <Play size={16} />
                Resume
              </>
            ) : (
              <>
                <Pause size={16} />
                Pause
              </>
            )}
          </MotionButton>
        )}

        {/* Stop Button (only visible when running) */}
        {isRunning && (
          <MotionButton
            {...buttonVariants}
            onClick={onStop}
            variant="destructive"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Square size={16} />
            Stop
          </MotionButton>
        )}

        <MotionButton
          {...buttonVariants}
          onClick={onReset}
          variant="outline"
          disabled={isRunning}
        >
          Reset
        </MotionButton>
        <MotionButton
          {...buttonVariants}
          onClick={onNewMaze}
          variant="outline"
          disabled={isRunning}
        >
          New Maze
        </MotionButton>
        <MotionButton {...buttonVariants} onClick={onShowModal} variant="ghost">
          About
        </MotionButton>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MotionButton
              {...buttonVariants}
              variant="ghost"
              disabled={isRunning}
            >
              Grid Size
            </MotionButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => onResizeGrid(10, 10)}>
              10 × 10
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onResizeGrid(20, 20)}>
              20 × 20
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onResizeGrid(30, 30)}>
              30 × 30
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onResizeGrid(40, 40)}>
              40 × 40
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Speed Control Slider */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Zap size={16} className="text-primary" />
            Animation Speed: {getSpeedLabel(animationSpeed)}
          </label>
          <span className="text-xs text-muted-foreground">
            {animationSpeed}ms
          </span>
        </div>
        <Slider
          value={[animationSpeed]}
          onValueChange={([value]) => onSpeedChange(value)}
          min={5}
          max={200}
          step={5}
          className="w-full"
          disabled={isRunning}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>
    </div>
  );
}
