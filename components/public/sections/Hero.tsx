import { createClient } from "@/lib/supabase/server";
import type { HeroContent } from "@/lib/types";

const FALLBACK: HeroContent = {
  id: "fallback",
  eyebrow: "Informatics Student & Full-Stack Developer",
  title_plain: "Building products that",
  title_highlight: "work end to end",
  description:
    "5th-semester Informatics student at Universitas Sultan Ageng Tirtayasa, building full-stack web applications with React, Next.js, Node.js, and Laravel.",
  button_text: "View Projects",
  updated_at: "",
};

export default async function Hero() {
  let hero: HeroContent = FALLBACK;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("hero_content")
      .select("*")
      .single();
    if (data) hero = data;
  } catch {
    // Use fallback silently during development (env vars not set yet)
  }

  return (
    <section
      id="hero"
      aria-label="Hero"
      style={{
        minHeight: "92vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 32px",
        maxWidth: "720px",
        margin: "0 auto",
      }}
    >
      {/* Gold hairline top */}
      <div
        style={{
          width: "1px",
          height: "56px",
          background: "var(--gold-dim)",
          marginBottom: "40px",
        }}
      />

      {/* Eyebrow */}
      {hero.eyebrow && (
        <span
          className="eyebrow"
          style={{ display: "block", marginBottom: "28px" }}
        >
          {hero.eyebrow}
        </span>
      )}

      {/* Title */}
      <h1
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          fontSize: "clamp(42px, 7vw, 72px)",
          fontWeight: 400,
          lineHeight: 1.1,
          color: "var(--text-primary)",
          marginBottom: "28px",
        }}
      >
        {hero.title_plain}{" "}
        <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
          {hero.title_highlight}
        </em>
      </h1>

      {/* Description */}
      {hero.description && (
        <p
          style={{
            fontFamily: "var(--font-eb-garamond), serif",
            fontSize: "18px",
            color: "var(--text-secondary)",
            maxWidth: "560px",
            lineHeight: 1.7,
            marginBottom: "44px",
          }}
        >
          {hero.description}
        </p>
      )}

      {/* CTA Button */}
      <a
        href="#portfolio"
        id="hero-cta"
        className="btn-gold"
      >
        {hero.button_text ?? "View Projects"}
      </a>

      {/* Gold hairline bottom */}
      <div
        style={{
          width: "1px",
          height: "56px",
          background: "var(--gold-dim)",
          marginTop: "56px",
        }}
      />
    </section>
  );
}
