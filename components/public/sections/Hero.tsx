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
    <>
      <section
        id="hero"
        aria-label="Hero"
        style={{
          padding: "80px 24px",
          textAlign: "center",
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Top gold line using a div to mimic ::before */}
        <div
          style={{
            width: "1px",
            height: "60px",
            background: "var(--gold-dim)",
            marginBottom: "40px",
          }}
        />

        {/* Eyebrow */}
        {hero.eyebrow && <span className="eyebrow">{hero.eyebrow}</span>}

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(48px, 8vw, 72px)",
            lineHeight: 1.1,
            margin: "24px 0",
            color: "var(--text-primary)",
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
              fontSize: "19px",
              color: "var(--text-secondary)",
              maxWidth: "600px",
              margin: "0 auto 40px",
            }}
          >
            {hero.description}
          </p>
        )}

        {/* CTA Button */}
        <a
          href="#portfolio"
          className="btn-gold"
          style={{
            display: "inline-block",
            padding: "13px 32px",
            border: "1px solid var(--gold)",
            color: "var(--gold)",
            fontSize: "13px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            transition: "background .25s ease, color .25s ease",
          }}
        >
          {hero.button_text ?? "View Projects"}
        </a>
      </section>

      <hr className="hairline" />
    </>
  );
}
