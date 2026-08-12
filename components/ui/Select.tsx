import { type SelectHTMLAttributes, forwardRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, hint, id, options, placeholder, className = "", style, ...props },
    ref
  ) => {
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
        <select
          ref={ref}
          id={inputId}
          style={{
            background: "var(--bg-1)",
            border: `1px solid ${error ? "#c96b5c" : "var(--line)"}`,
            color: "var(--text-primary)",
            padding: "10px 13px",
            fontFamily: "var(--font-eb-garamond), serif",
            fontSize: "14px",
            width: "100%",
            outline: "none",
            transition: "border-color 0.2s ease",
            cursor: "pointer",
            ...style,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = error ? "#c96b5c" : "var(--gold)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? "#c96b5c" : "var(--line)";
          }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
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

Select.displayName = "Select";
