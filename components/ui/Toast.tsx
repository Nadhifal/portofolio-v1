"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const typeColors: Record<ToastType, string> = {
  success: "var(--gold)",
  error: "#c96b5c",
  info: "var(--text-secondary)",
};

export function Toast({
  message,
  type = "success",
  duration = 3000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const show = requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => {
      cancelAnimationFrame(show);
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  return (
    <div
      role="alert"
      aria-live="polite"
      className={visible ? "toast-enter" : "toast-exit"}
      style={{
        position: "fixed",
        bottom: "22px",
        right: "22px",
        background: "var(--bg-1)",
        border: `1px solid ${typeColors[type]}`,
        color: typeColors[type],
        padding: "11px 20px",
        fontSize: "13px",
        fontFamily: "var(--font-eb-garamond), serif",
        letterSpacing: "0.04em",
        zIndex: 1000,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      {message}
    </div>
  );
}

/**
 * useToast hook — manage toast state in parent components
 *
 * @example
 * const { toast, showToast } = useToast();
 * showToast("Tersimpan!", "success");
 * return <>{toast}</>;
 */
export function useToast() {
  const [toastState, setToastState] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  const showToast = (message: string, type: ToastType = "success") => {
    setToastState({ message, type });
  };

  const toast = toastState ? (
    <Toast
      message={toastState.message}
      type={toastState.type}
      onClose={() => setToastState(null)}
    />
  ) : null;

  return { toast, showToast };
}
