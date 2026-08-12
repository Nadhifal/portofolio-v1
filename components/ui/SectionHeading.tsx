interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {eyebrow && (
        <span className="eyebrow block mb-4">{eyebrow}</span>
      )}
      <h2
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          fontSize: "36px",
          fontWeight: 500,
          color: "var(--text-primary)",
          marginTop: eyebrow ? "14px" : 0,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          width: "60px",
          height: "1px",
          background: "var(--gold)",
          margin: "20px auto 0",
        }}
      />
    </div>
  );
}
