# Algo-Pathfinder — Improvements

## Bug Fixes

### 1. Stale Maze State in `traverse` (Critical)

**File:** `hooks/use-maze.ts`

The `traverse` function called `resetMaze()` to clear visited/final-path cells before running an algorithm. However, `resetMaze()` uses React's `setMaze()` — a state update that is **asynchronous**. The algorithm then immediately ran on the _old_ maze closure, which still contained `"visited"` and `"final-path"` cells. Since the algorithms only treat `"path"` and `"end"` as traversable, those leftover cells acted as walls, causing incorrect or missing paths on re-runs.

**Fix:** Compute a `cleanMaze` synchronously (mapping visited/final-path → path) and pass it directly to the algorithm, instead of relying on the async state update.

### 2. Inverted Efficiency Ratio Description

**File:** `components/stats-display.tsx`

The stats panel showed an "Efficiency Ratio" computed as `(pathLength / nodesVisited) * 100` with the description _"Lower is better"_. This was backwards — a **higher** ratio means fewer wasted explorations (100% = the algorithm only visited cells on the final path).

**Fix:** Changed the description to _"Higher is better — ratio of path length to total nodes explored"_.

### 3. `alert()` Instead of Toast for "No Path Found"

**File:** `hooks/use-maze.ts`

The hook used a raw browser `alert("No path found!")` when an algorithm returned no visited nodes. This was inconsistent with the rest of the app, which uses a toast notification system. Additionally, the existing `useEffect` in `maze-view.tsx` already handled the "no path" case with a toast on algorithm completion.

**Fix:** Removed the `alert()` call. The existing completion toast in `maze-view.tsx` already displays a destructive toast when `stats.pathLength === 0`, so no additional handling was needed.

---

## Performance Improvements

### 4. A\* — Binary Min-Heap Instead of Array Sort

**File:** `lib/algorithms/astar.ts`

The A\* open set was a plain array that was **fully sorted** on every iteration (`openSet.sort()`). This made each extraction O(n log n), giving the algorithm an overall complexity of O(V² log V).

**Fix:** Replaced the sorted array with a **binary min-heap** that provides O(log n) insertion and extraction, bringing the algorithm to O(V log V) overall. The `MinHeap` class implements standard `bubbleUp` / `sinkDown` operations keyed on f-score.

### 5. BFS & DFS — Parent Map Instead of Path Copies

**Files:** `lib/algorithms/bfs.ts`, `lib/algorithms/dfs.ts`

Both algorithms stored the **entire path from start to current node** at every queue/stack entry via `path: [...path, [newX, newY]]`. This created a new array copy at each step, resulting in **O(V²)** memory usage on large grids.

**Fix:** Replaced with a `parentMap` (`Map<string, [number, number] | null>`) that records each node's parent. The path is reconstructed only once when the target is found, using a shared `reconstructPath` utility. Memory usage is now **O(V)**.

---

## Code Quality

### 6. Consolidated Shared `AlgorithmResult` Type

**Files:** `lib/types.ts`, `lib/algorithms/bfs.ts`, `lib/algorithms/dfs.ts`, `lib/algorithms/astar.ts`, `hooks/use-maze.ts`

The `AlgorithmResult` interface was duplicated four times — once in each algorithm file and once in the maze hook.

**Fix:** Defined it once in `lib/types.ts` and imported it everywhere. Also extracted the `reconstructPath` utility into `lib/algorithms/reconstruct-path.ts` since all three algorithms share the same path-reconstruction logic.

### 7. Interactive Wall Drawing

**Files:** `hooks/use-maze.ts`, `components/maze-view.tsx`

The `MazeGrid` component accepted `onCellClick` and `isInteractive` props, but they were never connected — users could not draw or remove walls.

**Fix:** Added a `toggleWall(x, y)` function to the `useMaze` hook that toggles cells between `"wall"` and `"path"` (protecting start/end cells). Wired it up in `maze-view.tsx` so clicking any non-start/end cell toggles it, but only when an algorithm isn't running.

---

## Files Changed

| File                                 | Change                                            |
| ------------------------------------ | ------------------------------------------------- |
| `lib/types.ts`                       | Added shared `AlgorithmResult` interface          |
| `lib/algorithms/reconstruct-path.ts` | **New** — shared path reconstruction utility      |
| `lib/algorithms/bfs.ts`              | Parent map, shared types                          |
| `lib/algorithms/dfs.ts`              | Parent map, shared types                          |
| `lib/algorithms/astar.ts`            | Min-heap, parent map, shared types                |
| `hooks/use-maze.ts`                  | Stale maze fix, removed alert, added `toggleWall` |
| `components/stats-display.tsx`       | Fixed efficiency ratio description                |
| `components/maze-view.tsx`           | Wired up interactive wall toggling                |

## Test Results

All **25 existing tests pass** with no modifications required. Algorithm coverage:

- `bfs.ts` — 100% lines
- `dfs.ts` — 100% lines
- `astar.ts` — 100% lines
- `reconstruct-path.ts` — 100% lines
