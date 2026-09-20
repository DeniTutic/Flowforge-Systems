import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg viewBox="0 0 32 32" width="64" height="64" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#C2410C" />
        <rect x="9" y="8" width="4" height="16" rx="2" fill="#fff" />
        <rect x="9" y="8" width="14" height="4" rx="2" fill="#fff" />
        <rect x="9" y="15" width="10" height="4" rx="2" fill="#fff" />
        <circle cx="23" cy="21" r="2.25" fill="#FDBA74" />
      </svg>
    ),
    { ...size }
  );
}
