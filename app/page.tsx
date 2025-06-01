"use client";

import { useState } from "react";
import MazeView from "@/components/maze-view";
import AlgorithmModal from "@/components/modal";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="min-h-screen py-12">
      <MazeView onShowModal={() => setIsModalOpen(true)} />
      <AlgorithmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
