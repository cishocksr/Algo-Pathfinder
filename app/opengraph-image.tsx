import { ImageResponse } from "next/og";

export const alt =
  "Algo Pathfinder — interactive BFS, DFS, and A* maze visualization";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #1e1b4b 0%, #312e81 45%, #4c1d95 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            padding: 48,
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "#e0e7ff",
              letterSpacing: -2,
            }}
          >
            Algo Pathfinder
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#a5b4fc",
              textAlign: "center",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            Visualize BFS, DFS, and A* pathfinding on interactive mazes
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
