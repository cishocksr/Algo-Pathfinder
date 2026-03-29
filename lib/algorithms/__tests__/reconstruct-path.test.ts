import { reconstructPath } from "../reconstruct-path";

function key(x: number, y: number): string {
  return `${x},${y}`;
}

describe("reconstructPath", () => {
  it("returns a single cell when start equals end", () => {
    const parentMap = new Map<string, [number, number] | null>();
    parentMap.set(key(0, 0), null);

    expect(reconstructPath(parentMap, [0, 0])).toEqual([[0, 0]]);
  });

  it("reconstructs a straight line", () => {
    const parentMap = new Map<string, [number, number] | null>();
    parentMap.set(key(0, 0), null);
    parentMap.set(key(1, 0), [0, 0]);
    parentMap.set(key(2, 0), [1, 0]);

    expect(reconstructPath(parentMap, [2, 0])).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  });

  it("reconstructs an L-shaped chain", () => {
    const parentMap = new Map<string, [number, number] | null>();
    parentMap.set(key(0, 0), null);
    parentMap.set(key(1, 0), [0, 0]);
    parentMap.set(key(1, 1), [1, 0]);
    parentMap.set(key(1, 2), [1, 1]);

    expect(reconstructPath(parentMap, [1, 2])).toEqual([
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ]);
  });

  it("returns only end when end is missing from parent map (degenerate)", () => {
    const parentMap = new Map<string, [number, number] | null>();
    parentMap.set(key(5, 5), null);

    expect(reconstructPath(parentMap, [3, 3])).toEqual([[3, 3]]);
  });

  it("stops when parent key is absent (broken chain)", () => {
    const parentMap = new Map<string, [number, number] | null>();
    parentMap.set(key(2, 0), [1, 0]);
    parentMap.set(key(1, 0), [0, 0]);
    // key(0,0) intentionally missing — get returns undefined, coerced to null

    expect(reconstructPath(parentMap, [2, 0])).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  });
});
