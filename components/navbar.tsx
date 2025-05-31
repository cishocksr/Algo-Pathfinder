"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      className="w-full px-6 py-4 shadow-sm bg-card border-b border-border"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="text-lg font-bold">
          Maze Visualizer
        </Link>
        <div className="space-x-4 text-sm font-medium">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <a
            href="https://github.com/your-username/maze-visualizer"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
