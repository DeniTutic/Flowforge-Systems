import { ImageResponse } from "next/og";
import { SITE_HOST } from "@/lib/site";

export const alt = "Flowforge Systems — Websites & AI systems that drive growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0B0F14",
          color: "#EDEAE4",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(234,88,12,0.45) 0%, rgba(234,88,12,0) 65%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg viewBox="0 0 32 32" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#C2410C" />
            <rect x="9" y="8" width="4" height="16" rx="2" fill="#fff" />
            <rect x="9" y="8" width="14" height="4" rx="2" fill="#fff" />
            <rect x="9" y="15" width="10" height="4" rx="2" fill="#fff" />
            <circle cx="23" cy="21" r="2.25" fill="#FDBA74" />
          </svg>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>
            Flowforge
            <span style={{ color: "#9AA3B2", fontWeight: 500, marginLeft: 10 }}>Systems</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2.5,
              maxWidth: 980,
            }}
          >
            Websites and AI systems that generate leads.
          </div>
          <div style={{ fontSize: 30, color: "#9AA3B2", maxWidth: 900, lineHeight: 1.35 }}>
            Modern sites and automations that turn traffic into clients.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#9AA3B2" }}>
          <div style={{ width: 12, height: 12, borderRadius: 9999, background: "#EA580C" }} />
          {SITE_HOST}
        </div>
      </div>
    ),
    { ...size }
  );
}
