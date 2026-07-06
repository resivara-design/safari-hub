import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0B6E4F 0%, #074A35 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            color: "#F8F4EC",
            letterSpacing: -1,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "#D4B268",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
