import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/types";

const FALLBACK: Testimonial = {
  id: "fallback",
  quote:
    '"I believe great products live at the intersection of clean code and thoughtful design — built end to end, one feature at a time."',
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

  // Ensure the quote has quotation marks around it if it doesn't already
  const formattedQuote = item.quote
    ? item.quote.startsWith('"')
      ? item.quote
      : `"${item.quote}"`
    : "";

  return (
    <section
      id="testimonial"
      className="testimonial"
      aria-label="Testimonial"
      style={{
        padding: "96px 0",
        background: "var(--bg-1)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        textAlign: "center",
      }}
    >
      <div className="wrap">
        {formattedQuote && (
          <blockquote
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "30px",
              lineHeight: 1.5,
              maxWidth: "680px",
              margin: "0 auto 24px",
              color: "var(--text-primary)",
            }}
          >
            {formattedQuote}
          </blockquote>
        )}

        {item.cite && (
          <cite
            style={{
              fontStyle: "normal",
              fontSize: "13px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-secondary)",
            }}
          >
            {item.cite}
          </cite>
        )}
      </div>
    </section>
  );
}
