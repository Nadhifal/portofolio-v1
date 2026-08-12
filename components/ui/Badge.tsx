interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "muted" | "level";
  className?: string;
}

/** Skill level to badge color mapping */
const levelColors: Record<string, string> = {
  Expert: "var(--gold)",
  Advanced: "var(--gold-dim)",
  Intermediate: "var(--text-secondary)",
  Beginner: "var(--text-muted)",
};

export function Badge({ children, variant = "muted", className = "" }: BadgeProps) {
  const baseStyle: React.CSSProperties = {
    display: "inline-block",
    fontFamily: "var(--font-eb-garamond), serif",
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    padding: "3px 10px",
    border: "1px solid",
  };

  const variantStyle: React.CSSProperties =
    variant === "gold"
      ? {
          borderColor: "var(--gold-dim)",
          color: "var(--gold)",
          background: "transparent",
        }
      : {
          borderColor: "var(--line-strong)",
          color: "var(--text-muted)",
          background: "transparent",
        };

  return (
    <span style={{ ...baseStyle, ...variantStyle }} className={className}>
      {children}
    </span>
  );
}

/** Level badge that maps "Expert" / "Advanced" / etc. to appropriate gold color */
export function LevelBadge({ level }: { level: string }) {
  const color = levelColors[level] ?? "var(--text-muted)";
  return (
    <span
      style={{
        fontFamily: "var(--font-eb-garamond), serif",
        fontSize: "11px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color,
      }}
    >
      {level}
    </span>
  );
}

/** Tech stack tag (comma-separated array → individual tags) */
export function TechTag({ tech }: { tech: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        border: "1px solid var(--line-strong)",
        color: "var(--text-secondary)",
        fontSize: "12px",
        letterSpacing: "0.06em",
        padding: "2px 10px",
        fontFamily: "var(--font-eb-garamond), serif",
      }}
    >
      {tech}
    </span>
  );
}
