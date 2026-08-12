"use client";

import { useActionState } from "react";
import { signIn } from "@/app/admin/actions";
import { Input, Button } from "@/components/ui";
import type { ActionState } from "@/app/admin/actions";

const initial: ActionState = {};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(signIn, initial);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "380px",
        border: "1px solid var(--line)",
        background: "var(--bg-1)",
        padding: "40px 36px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <span
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "28px",
            color: "var(--text-primary)",
          }}
        >
          N.<span style={{ color: "var(--gold)" }}>A</span>
        </span>
        <p
          style={{
            fontFamily: "var(--font-eb-garamond), serif",
            fontSize: "13px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginTop: "6px",
          }}
        >
          Admin Access
        </p>
        {/* Gold rule */}
        <div
          style={{
            width: "40px",
            height: "1px",
            background: "var(--gold-dim)",
            margin: "14px auto 0",
          }}
        />
      </div>

      {/* Form */}
      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Input
          label="Email"
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="admin@example.com"
          disabled={isPending}
        />
        <Input
          label="Password"
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          disabled={isPending}
        />

        {state.error && (
          <p
            style={{
              fontFamily: "var(--font-eb-garamond), serif",
              fontSize: "13px",
              color: "#c96b5c",
              textAlign: "center",
            }}
          >
            {state.error}
          </p>
        )}

        <Button
          type="submit"
          id="login-submit"
          isLoading={isPending}
          style={{ width: "100%", marginTop: "4px" }}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
