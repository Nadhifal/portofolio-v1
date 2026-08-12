import { createClient } from "@/lib/supabase/server";
import { SectionHeading } from "@/components/ui";
import type { Experience } from "@/lib/types";

const FALLBACK: Experience[] = [
  {
    id: "1",
    year_label: "April 2026 — Present",
    title: "Staff, AI Division — UKM Untirta Digital Creative",
    description:
      "Contributing to AI-based projects including AI agents and automation; involved in internal committees, working meetings, and workshops.",
    sort_order: 1,
  },
  {
    id: "2",
    year_label: "June 2026",
    title: "Data Science Essentials with Python — Cisco Networking Academy",
    description: "Certification completed through Faculty of Engineering, Untirta.",
    sort_order: 2,
  },
  {
    id: "3",
    year_label: "August 2025",
    title: "English Certificate of Achievement — NSP International",
    description: "Conversation Level 1, Survival English.",
    sort_order: 3,
  },
];

export default async function ExperienceSection() {
  let items: Experience[] = FALLBACK;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("experience")
      .select("*")
      .order("sort_order");
    if (data && data.length > 0) items = data;
  } catch {
    // Use fallback silently
  }

  return (
    <section
      id="experience"
      aria-label="Experience"
      style={{
        padding: "96px 0",
        background: "var(--bg-1)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="wrap">
        <SectionHeading eyebrow="Background" title="Experience" />

        <div
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Vertical timeline line */}
          <div
            style={{
              position: "absolute",
              left: "148px",
              top: 0,
              bottom: 0,
              width: "1px",
              background: "var(--line-strong)",
            }}
          />

          {items.map((item, i) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "148px 1fr",
                gap: "32px",
                paddingBottom: i < items.length - 1 ? "40px" : 0,
                position: "relative",
              }}
            >
              {/* Year label */}
              <div style={{ textAlign: "right", paddingRight: "24px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-eb-garamond), serif",
                    fontSize: "13px",
                    color: "var(--text-muted)",
                    letterSpacing: "0.04em",
                    lineHeight: 1.5,
                  }}
                >
                  {item.year_label}
                </span>
              </div>

              {/* Timeline dot + content */}
              <div style={{ position: "relative" }}>
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-36px",
                    top: "6px",
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "var(--gold)",
                    boxShadow: "0 0 0 3px var(--bg-1)",
                  }}
                />

                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    marginBottom: item.description ? "8px" : 0,
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </h3>
                {item.description && (
                  <p
                    style={{
                      fontFamily: "var(--font-eb-garamond), serif",
                      fontSize: "16px",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
