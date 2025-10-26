pathfinder-demo/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Main page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── maze-view.tsx        # Main container
│   ├── maze-grid.tsx        # Grid visualization
│   ├── control-panel.tsx    # Algorithm controls
│   ├── stats-display.tsx    # Performance metrics
│   └── ui/                  # shadcn components
├── lib/
│   ├── algorithms/          # Algorithm implementations
│   │   ├── bfs.ts          # Breadth-First Search
│   │   ├── dfs.ts          # Depth-First Search
│   │   └── astar.ts        # A* Algorithm
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Utility functions
└── hooks/
└── useMaze.ts          # Maze state management