/*
  Default OG image (1200x630). Uses Next 16's built-in @vercel/og — no extra
  dep. Renders the team mark left of giant display text on the brand-black
  background with a steel-blue accent dot. Per-page OG images can override
  by exporting `opengraph-image.tsx` from that route folder.
*/

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "MakEMinds Robotics · FTC Team 23786 · Edison NJ";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px",
          backgroundColor: "#050506",
          color: "#e8eef4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "999px",
              border: "1px solid #1a2028",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#649dc7",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            M
          </div>
          <span style={{ fontSize: "20px", letterSpacing: "0.2em", color: "#8090a4" }}>
            FTC TEAM 23786
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "180px",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
            }}
          >
            MAKEMINDS
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "180px",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
            }}
          >
            ROBOTICS<span style={{ color: "#649dc7" }}>.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "18px",
            color: "#8090a4",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span>EDISON · NJ · USA</span>
          <span>makemindsrobotics.org</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
