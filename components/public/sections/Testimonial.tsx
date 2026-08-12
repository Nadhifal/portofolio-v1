import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/types";

const FALLBACK: Testimonial = {
  id: "fallback",
  quote:
    "I believe great products live at the intersection of clean code and thoughtful design — built end to end, one feature at a time.",
  cite: "— Nadhif Alfasya",
};

export default async function TestimonialSection() {
  let item: Testimonial = FALLBACK;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("testimonial")
      .select("*")
      .single();
    if (data) item = data;
  } catch {
    // Use fallback silently
  }

  return (
    <section
      id="testimonial"
      aria-label="Testimonial"
      style={{
        padding: "96px 0",
        borderTop: "1px solid var(--line)",
        textAlign: "center",
      }}
    >
      <div
        className="wrap"
        style={{ maxWidth: "680px", margin: "0 auto" }}
      >
        {/* Opening gold quote mark */}
        <div
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "80px",
            lineHeight: 0.8,
            color: "var(--gold-dim)",
            marginBottom: "24px",
          }}
          aria-hidden="true"
        >
          "
        </div>

        {item.quote && (
          <blockquote
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(22px, 3vw, 32px)",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.45,
              color: "var(--text-primary)",
              margin: "0 0 28px",
            }}
          >
            {item.quote}
          </blockquote>
        )}

        {/* Gold rule */}
        <div
          style={{
            width: "40px",
            height: "1px",
            background: "var(--gold)",
            margin: "0 auto 20px",
          }}
        />

        {item.cite && (
          <cite
            style={{
              fontFamily: "var(--font-eb-garamond), serif",
              fontSize: "14px",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
              fontStyle: "normal",
              textTransform: "uppercase",
            }}
          >
            {item.cite}
          </cite>
        )}
      </div>
    </section>
  );
}
