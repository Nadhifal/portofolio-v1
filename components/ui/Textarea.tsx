import { type TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
        <textarea
          ref={ref}
          id={inputId}
          rows={4}
          style={{
            background: "var(--bg-1)",
            border: `1px solid ${error ? "#c96b5c" : "var(--line)"}`,
            color: "var(--text-primary)",
            padding: "10px 13px",
            fontFamily: "var(--font-eb-garamond), serif",
            fontSize: "14px",
            width: "100%",
            outline: "none",
            resize: "vertical",
            transition: "border-color 0.2s ease",
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

Textarea.displayName = "Textarea";
