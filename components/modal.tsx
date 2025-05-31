"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

export default function AlgorithmModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent asChild>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-background p-6 rounded-xl shadow-xl"
        >
          <DialogHeader>
            <DialogTitle>About BFS & DFS</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <p>
              <strong>BFS (Breadth-First Search):</strong> Explores all
              neighbors at the current depth before going deeper.
            </p>
            <p>
              <strong>DFS (Depth-First Search):</strong> Goes as far as possible
              along each branch before backtracking.
            </p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
