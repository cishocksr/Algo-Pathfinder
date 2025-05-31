import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

export default function ControlPanel({
  onBfs,
  onDfs,
  onReset,
  onNewMaze,
  onShowModal,
}: {
  onBfs: () => void;
  onDfs: () => void;
  onReset: () => void;
  onNewMaze: () => void;
  onShowModal: () => void;
}) {
  const buttonVariants = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <MotionButton {...buttonVariants} onClick={onBfs}>
        Start BFS
      </MotionButton>
      <MotionButton {...buttonVariants} onClick={onDfs}>
        Start DFS
      </MotionButton>
      <MotionButton {...buttonVariants} onClick={onReset} variant="secondary">
        Reset
      </MotionButton>
      <MotionButton {...buttonVariants} onClick={onNewMaze} variant="outline">
        New Maze
      </MotionButton>
      <MotionButton {...buttonVariants} onClick={onShowModal} variant="ghost">
        About
      </MotionButton>
    </div>
  );
}
