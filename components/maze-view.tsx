"use client";

import MazeGrid from "@/components/maz-grid";
import ControlPanel from "@/components/control-panel";
import AlgorithmModal from "@/components/modal";
import { useMaze } from "@/hooks/useMaze";

export default function MazeView() {
  const { maze, generateMaze, resetMaze, traverse, showModal, setShowModal } =
    useMaze();

  return (
    <div className="flex flex-col items-center gap-6">
      <ControlPanel
        onBfs={() => traverse("bfs")}
        onDfs={() => traverse("dfs")}
        onReset={resetMaze}
        onNewMaze={() => generateMaze(20, 20)}
        onShowModal={() => setShowModal(true)}
      />
      <MazeGrid maze={maze} />
      <AlgorithmModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
