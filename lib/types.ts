export type CellType =
  | "start"
  | "end"
  | "path"
  | "wall"
  | "visited"
  | "final-path";

export type MazeGridType = CellType[][];
