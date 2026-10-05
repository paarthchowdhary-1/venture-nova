import { ImageResponse } from "next/og";

export const alt = "VentureNova: turn your idea into a real venture";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 90px",
        color: "white",
        background:
          "linear-gradient(135deg, #3b2fc9 0%, #7a2fd0 55%, #e0527a 100%)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -80,
          top: -80,
          width: 420,
          height: 420,
          borderRadius: 9999,
          background: "rgba(255,255,255,0.12)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 120,
          bottom: -120,
          width: 300,
          height: 300,
          borderRadius: 9999,
          background: "rgba(255,200,60,0.35)",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: 22,
            background: "white",
            color: "#3b2fc9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
            fontWeight: 900,
          }}
        >
          VN
        </div>
        <div style={{ fontSize: 44, fontWeight: 800 }}>VentureNova</div>
      </div>
      <div
        style={{
          marginTop: 44,
          fontSize: 84,
          fontWeight: 900,
          lineHeight: 1.05,
          maxWidth: 900,
        }}
      >
        Turn your idea into a real venture.
      </div>
      <div style={{ marginTop: 28, fontSize: 34, opacity: 0.9 }}>
        Lessons, real tasks, and an AI coach. For young founders, ages 12 to 18.
      </div>
    </div>,
    size,
  );
}
