export type CellType =
  | "start"
  | "end"
  | "path"
  | "wall"
  | "visited"
  | "final-path";

export type MazeGridType = CellType[][];

export interface AlgorithmResult {
  visited: [number, number][]; // Order nodes were explored
  path: [number, number][]; // Path from start to end
}
