import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#fff8e8",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%"
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: "#a855f7",
            border: "10px solid #050505",
            color: "#050505",
            display: "flex",
            fontSize: 62,
            fontWeight: 900,
            height: 132,
            justifyContent: "center",
            width: 132
          }}
        >
          TB
        </div>
      </div>
    ),
    size
  );
}
