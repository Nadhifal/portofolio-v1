import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--bg-0)]",
  ghost:
    "border border-[var(--line-strong)] text-[var(--text-secondary)] hover:border-[var(--gold)] hover:text-[var(--gold)]",
  danger:
    "border border-[#4a2a24] text-[#c96b5c] hover:border-[#c96b5c] hover:bg-[#c96b5c] hover:text-[var(--bg-0)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[11px] tracking-[0.15em]",
  md: "px-[34px] py-[14px] text-[13px] tracking-[0.2em]",
  lg: "px-10 py-4 text-[14px] tracking-[0.2em]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={[
          "inline-flex items-center justify-center gap-2",
          "uppercase font-[var(--font-eb-garamond)] transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className,
        ].join(" ")}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="inline-block w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
