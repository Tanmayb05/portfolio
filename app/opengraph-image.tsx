import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const alt = "Tanmay Bhuskute Portfolio OS social preview";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#fff8e8",
          color: "#050505",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: 56,
          width: "100%"
        }}
      >
        <div style={{ display: "flex", gap: 18 }}>
          <div
            style={{
              background: "#a855f7",
              border: "6px solid #050505",
              color: "#ffffff",
              fontSize: 38,
              fontWeight: 900,
              padding: "18px 22px"
            }}
          >
            TB
          </div>
          <div
            style={{
              border: "6px solid #050505",
              fontSize: 28,
              fontWeight: 900,
              padding: "18px 22px"
            }}
          >
            PORTFOLIO OS / V4
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 112,
              fontWeight: 900,
              lineHeight: 0.9
            }}
          >
            <span>TANMAY</span>
            <span>BHUSKUTE</span>
          </div>
          <div
            style={{
              borderTop: "6px solid #050505",
              fontSize: 34,
              fontWeight: 700,
              marginTop: 28,
              paddingTop: 22,
              width: 900
            }}
          >
            {siteConfig.description}
          </div>
        </div>
        <div
          style={{
            background: "#f7ff00",
            border: "6px solid #050505",
            fontSize: 26,
            fontWeight: 900,
            padding: "14px 20px",
            width: 500
          }}
        >
          CLOUD / BACKEND / AI SYSTEMS
        </div>
      </div>
    ),
    size
  );
}
