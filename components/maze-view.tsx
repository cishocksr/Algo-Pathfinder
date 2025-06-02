"use client";

import MazeGrid from "@/components/maz-grid";
import ControlPanel from "@/components/control-panel";
import AlgorithmModal from "@/components/modal";
import { useMaze } from "@/hooks/useMaze";
import { useState } from "react";

export default function MazeView() {
  const { maze, generateMaze, resetMaze, traverse, showModal, setShowModal } =
    useMaze();

  const [gridSize, setGridSize] = useState({ cols: 20, rows: 20 });

  const handleResizeGrid = (cols: number, rows: number) => {
    setGridSize({ cols, rows });
    generateMaze(cols, rows);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <ControlPanel
        onBfs={() => traverse("bfs")}
        onDfs={() => traverse("dfs")}
        onReset={resetMaze}
        onNewMaze={() => generateMaze(gridSize.cols, gridSize.rows)}
        onShowModal={() => setShowModal(true)}
        onResizeGrid={handleResizeGrid}
      />
      <MazeGrid maze={maze} columns={gridSize.cols} />
      <AlgorithmModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
