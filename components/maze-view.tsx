"use client";

import MazeGrid from "@/components/maz-grid";
import ControlPanel from "@/components/control-panel";
import { useMaze } from "@/hooks/useMaze";

export default function MazeView({ onShowModal }: { onShowModal: () => void }) {
  const {
    maze,
    generateMaze,
    resetMaze,
    traverse,
    isRunning,
    isPaused,
    setIsPaused,
  } = useMaze();

  return (
    <div className="flex flex-col justify-center items-center flex-1 gap-6 py-8">
      <ControlPanel
        onBfs={() => traverse("bfs")}
        onDfs={() => traverse("dfs")}
        onReset={resetMaze}
        onNewMaze={() => generateMaze(20, 20)}
        onShowModal={onShowModal}
        isRunning={isRunning}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />
      <MazeGrid maze={maze} />
    </div>
  );
}
