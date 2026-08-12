import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const inputBaseStyle: React.CSSProperties = {
  background: "var(--bg-1)",
  border: "1px solid var(--line)",
  color: "var(--text-primary)",
  padding: "10px 13px",
  fontFamily: "var(--font-eb-garamond), serif",
  fontSize: "14px",
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s ease",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = "", style, ...props }, ref) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          style={{
            ...inputBaseStyle,
            borderColor: error ? "#c96b5c" : "var(--line)",
            ...style,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = error ? "#c96b5c" : "var(--gold)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? "#c96b5c" : "var(--line)";
          }}
          {...props}
        />
        {error && (
          <span style={{ fontSize: "12px", color: "#c96b5c" }}>{error}</span>
        )}
        {hint && !error && (
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{hint}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
