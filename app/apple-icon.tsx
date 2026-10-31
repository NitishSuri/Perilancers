import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#15120E",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24">
          <path
            fill="#FF5A1F"
            d="M10.6 1.5h2.8l-.3 7.1 6-3.8 1.4 2.4-6.3 3.3 6.3 3.3-1.4 2.4-6-3.8.3 7.1h-2.8l.3-7.1-6 3.8-1.4-2.4 6.3-3.3-6.3-3.3 1.4-2.4 6 3.8z"
          />
        </svg>
      </div>
    ),
    size,
  );
}
