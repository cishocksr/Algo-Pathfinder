import { act, renderHook, waitFor } from "@testing-library/react";
import { useMaze } from "../use-maze";

describe("useMaze", () => {
  it("builds a grid with the requested width and height", async () => {
    const { result } = renderHook(() => useMaze(5, 7));

    await waitFor(() => {
      expect(result.current.maze.length).toBe(7);
    });
    expect(result.current.maze[0]?.length).toBe(5);
    expect(result.current.maze[0][0]).toBe("start");
    expect(result.current.maze[6][4]).toBe("end");
  });

  it("keeps start/end corners after generateMaze", async () => {
    const { result } = renderHook(() => useMaze(3, 3));

    await waitFor(() => expect(result.current.maze.length).toBe(3));

    act(() => {
      result.current.generateMaze(3, 3);
    });

    await waitFor(() => {
      expect(result.current.maze[0][0]).toBe("start");
      expect(result.current.maze[2][2]).toBe("end");
    });
  });

  it("completes a BFS traversal and records stats (fake timers)", async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useMaze(4, 4));

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => expect(result.current.maze.length).toBe(4));

    act(() => {
      result.current.traverse("bfs");
    });

    await act(async () => {
      jest.runAllTimers();
    });

    expect(result.current.isRunning).toBe(false);
    expect(result.current.stats).not.toBeNull();
    expect(result.current.currentAlgorithm).toBe("bfs");
    expect(result.current.stats!.nodesVisited).toBeGreaterThan(0);

    jest.useRealTimers();
  });

  it("does not toggle walls while an algorithm is running", async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useMaze(3, 3));

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => expect(result.current.maze.length).toBe(3));

    const cellBefore = result.current.maze[1][1];

    act(() => {
      result.current.traverse("bfs");
    });

    act(() => {
      result.current.toggleWall(1, 1);
    });

    expect(result.current.maze[1][1]).toBe(cellBefore);

    await act(async () => {
      jest.runAllTimers();
    });

    jest.useRealTimers();
  });

  it("resetMaze clears visited and final-path markers", async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useMaze(3, 3));

    await act(async () => {
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => expect(result.current.maze.length).toBe(3));

    act(() => {
      result.current.traverse("astar");
    });

    await act(async () => {
      jest.runAllTimers();
    });

    act(() => {
      result.current.resetMaze();
    });

    const flat = result.current.maze.flat();
    expect(flat.includes("visited")).toBe(false);
    expect(flat.includes("final-path")).toBe(false);

    jest.useRealTimers();
  });
});
