import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Apply the "plate" visual style (museum card with number label) */
  plate?: boolean;
}

export function Card({ plate = false, className = "", children, ...props }: CardProps) {
  if (plate) {
    return (
      <div
        className={`relative border border-[var(--line)] bg-[var(--bg-1)] transition-colors duration-200 hover:border-[var(--gold-dim)] ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`border border-[var(--line)] bg-[var(--bg-1)] p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

/** Small label displayed at the top of a plate card, e.g. "Plate I" */
export function PlateLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-eb-garamond), serif",
        fontSize: "11px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
      }}
    >
      {children}
    </span>
  );
}
