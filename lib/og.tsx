/** Shared layout for generated Open Graph / Twitter share images (1200×630). */
export const ogSize = { width: 1200, height: 630 };

const STAR =
  "M10.6 1.5h2.8l-.3 7.1 6-3.8 1.4 2.4-6.3 3.3 6.3 3.3-1.4 2.4-6-3.8.3 7.1h-2.8l.3-7.1-6 3.8-1.4-2.4 6.3-3.3-6.3-3.3 1.4-2.4 6 3.8z";

export function OgCard({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background: "#FBF9F1",
        backgroundImage: "radial-gradient(circle at 90% 10%, rgba(141,164,126,0.7), transparent 40%)",
        color: "#3D2B1F",
        border: "14px solid #3D2B1F",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: 40, fontWeight: 800 }}>
          <svg width="44" height="44" viewBox="0 0 24 24" style={{ marginRight: 10 }}>
            <path fill="#2F4F3E" d={STAR} />
          </svg>
          Perilancers
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            background: "#DFE7D6",
            border: "3px solid #3D2B1F",
            borderRadius: 999,
            padding: "8px 22px",
          }}
        >
          {eyebrow}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, maxWidth: 1000 }}>{title}</div>
      <div style={{ display: "flex", fontSize: 28, color: "#76614E" }}>{footer}</div>
    </div>
  );
}
