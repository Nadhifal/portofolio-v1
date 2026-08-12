export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      style={{
        borderTop: "1px solid var(--line)",
        padding: "36px 0",
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "20px",
            letterSpacing: "0.06em",
            color: "var(--text-primary)",
          }}
        >
          N.<span style={{ color: "var(--gold)" }}>A</span>
        </span>

        <p
          style={{
            fontFamily: "var(--font-eb-garamond), serif",
            fontSize: "13px",
            letterSpacing: "0.06em",
            color: "var(--text-muted)",
            margin: 0,
          }}
        >
          © {year} Nadhif Alfasya. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
