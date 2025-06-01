import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

const MotionButton = motion(Button);

export default function ControlPanel({
  onBfs,
  onDfs,
  onReset,
  onNewMaze,
  onShowModal,
  isRunning,
  isPaused,
  setIsPaused,
}: {
  onBfs: () => void;
  onDfs: () => void;
  onReset: () => void;
  onNewMaze: () => void;
  onShowModal: () => void;
  isRunning: boolean;
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>; // ✅ correct type
}) {
  const buttonVariants = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-lg font-semibold text-foreground">Maze Controls</h2>
      <div className="flex flex-wrap justify-center gap-2">
        <MotionButton
          {...buttonVariants}
          onClick={onBfs}
          disabled={isRunning}
          variant="default"
        >
          Start BFS
        </MotionButton>
        <MotionButton
          {...buttonVariants}
          onClick={onDfs}
          disabled={isRunning}
          variant="default"
        >
          Start DFS
        </MotionButton>
        <MotionButton
          {...buttonVariants}
          onClick={onReset}
          disabled={isRunning}
          variant="secondary"
        >
          Reset
        </MotionButton>
        <MotionButton
          {...buttonVariants}
          onClick={onNewMaze}
          disabled={isRunning}
          variant="outline"
        >
          New Maze
        </MotionButton>
        <MotionButton {...buttonVariants} onClick={onShowModal} variant="ghost">
          About
        </MotionButton>
        <MotionButton
          {...buttonVariants}
          onClick={() => setIsPaused((prev) => !prev)}
          disabled={!isRunning}
          variant="secondary"
        >
          {isPaused ? "Resume" : "Pause"}
        </MotionButton>
      </div>
    </div>
  );
}
