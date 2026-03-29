/**
 * Reconstructs the path from start to end by walking the parent map backwards.
 *
 * @param parentMap - Maps each cell key ("x,y") to its parent coordinate, or null for the start
 * @param end - The target coordinates
 * @returns Ordered array of coordinates from start to end
 */
export function reconstructPath(
  parentMap: Map<string, [number, number] | null>,
  end: [number, number]
): [number, number][] {
  const path: [number, number][] = [];
  let current: [number, number] | null = end;

  while (current !== null) {
    path.unshift(current);
    const key: string = `${current[0]},${current[1]}`;
    current = parentMap.get(key) ?? null;
  }

  return path;
}
