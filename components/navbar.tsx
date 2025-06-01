"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button"; // shadcn/ui Button

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
        <div className="flex items-center gap-4 text-sm font-medium">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/your-user"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">GitHub</Button>
          </motion.a>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted &&
                (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
