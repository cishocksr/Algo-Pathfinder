"use client";

export default function Footer() {
  return (
    <footer className="w-full px-6 py-4 border-t border-border bg-card text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} Maze Visualizer — Built by Chris Shockley
    </footer>
  );
}
