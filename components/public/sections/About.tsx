import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { SectionHeading } from "@/components/ui";
import type { AboutContent } from "@/lib/types";

const FALLBACK: AboutContent = {
  id: "fallback",
  eyebrow: "About Me",
  name: "Nadhif Alfasya",
  lead: "I am an Informatics student (GPA 3.54/4.00) with hands-on experience as a full-stack web developer, comfortable building end-to-end applications with React, Next.js, Node.js, and Laravel. I have led teams in academic projects and national competitions including LIDM and P2MW.",
  edu_meta:
    "B.S. Informatics, Universitas Sultan Ageng Tirtayasa — 2024 – Present · GPA 3.54 / 4.00",
  paragraph:
    "Based in Serang, Banten, currently seeking an MBKM internship / SKS conversion opportunity in Software & Web Development.",
  signature: "— Nadhif",
  photo_url: null,
  updated_at: "",
};

export default async function About() {
  let about: AboutContent = FALLBACK;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("about_content")
      .select("*")
      .single();
    if (data) about = data;
  } catch {
    // Use fallback silently
  }

  return (
    <section
      id="about"
      aria-label="About"
      style={{
        padding: "96px 0",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="wrap">
        <SectionHeading eyebrow={about.eyebrow ?? ""} title="Nadhif Alfasya" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Photo column */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                aspectRatio: "3/4",
                background: "var(--bg-1)",
                border: "1px solid var(--line)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {about.photo_url ? (
                <Image
                  src={about.photo_url}
                  alt={about.name ?? "Profile photo"}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              ) : (
                /* Placeholder crosshatch when no photo */
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "repeating-linear-gradient(45deg, var(--line) 0, var(--line) 1px, transparent 0, transparent 50%) 0 0 / 12px 12px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "13px",
                      letterSpacing: "0.1em",
                      color: "var(--text-muted)",
                    }}
                  >
                    Photo
                  </span>
                </div>
              )}
            </div>
            {/* Gold corner accent */}
            <div
              style={{
                position: "absolute",
                bottom: "-10px",
                right: "-10px",
                width: "80px",
                height: "80px",
                border: "1px solid var(--gold-dim)",
                borderTop: "none",
                borderLeft: "none",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Text column */}
          <div>
            {/* Lead paragraph with drop-cap */}
            {about.lead && (
              <p
                className="drop-cap"
                style={{
                  fontFamily: "var(--font-eb-garamond), serif",
                  fontSize: "18px",
                  color: "var(--text-primary)",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                }}
              >
                {about.lead}
              </p>
            )}

            {/* Edu card */}
            {about.edu_meta && (
              <div
                style={{
                  background: "var(--bg-1)",
                  borderLeft: "2px solid var(--gold)",
                  padding: "14px 18px",
                  marginBottom: "24px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-eb-garamond), serif",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {about.edu_meta}
                </p>
              </div>
            )}

            {/* Paragraph */}
            {about.paragraph && (
              <p
                style={{
                  fontFamily: "var(--font-eb-garamond), serif",
                  fontSize: "17px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: "32px",
                }}
              >
                {about.paragraph}
              </p>
            )}

            {/* Signature */}
            {about.signature && (
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "20px",
                  fontStyle: "italic",
                  color: "var(--gold-dim)",
                  margin: 0,
                }}
              >
                {about.signature}
              </p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
