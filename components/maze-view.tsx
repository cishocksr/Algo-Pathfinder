"use client";

import MazeGrid from "@/components/maz-grid";
import ControlPanel from "@/components/control-panel";
import AlgorithmModal from "@/components/modal";
import { useMaze } from "@/hooks/useMaze";

export default function MazeView() {
  const {
    maze,
    generateMaze,
    resetMaze,
    traverse,
    showModal,
    setShowModal,
    isRunning, // ✅ include this
  } = useMaze();

  return (
    <div className="flex flex-col justify-center items-center flex-1 gap-6 py-8">
      <ControlPanel
        onBfs={() => traverse("bfs")}
        onDfs={() => traverse("dfs")}
        onReset={resetMaze}
        onNewMaze={() => generateMaze(20, 20)}
        onShowModal={() => setShowModal(true)}
        isRunning={isRunning} // ✅ pass it here
      />
      <MazeGrid maze={maze} />
      <AlgorithmModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
