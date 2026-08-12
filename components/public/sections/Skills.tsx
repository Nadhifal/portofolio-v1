import { createClient } from "@/lib/supabase/server";
import { SectionHeading, LevelBadge } from "@/components/ui";
import { getIcon } from "@/lib/icons";
import type { Skill } from "@/lib/types";

const FALLBACK: Skill[] = [
  {
    id: "1",
    icon: "ti-brand-react",
    label: "Front-End (React / Next.js)",
    level: "Advanced",
    percent: 90,
    sort_order: 1,
  },
  {
    id: "2",
    icon: "ti-server-2",
    label: "Back-End (Node.js / Laravel)",
    level: "Advanced",
    percent: 85,
    sort_order: 2,
  },
  {
    id: "3",
    icon: "ti-database",
    label: "Database (MySQL / SQL)",
    level: "Intermediate",
    percent: 75,
    sort_order: 3,
  },
  {
    id: "4",
    icon: "ti-brain",
    label: "AI & Data Analysis (Python)",
    level: "Intermediate",
    percent: 70,
    sort_order: 4,
  },
];

export default async function Skills() {
  let skills: Skill[] = FALLBACK;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("sort_order");
    if (data && data.length > 0) skills = data;
  } catch {
    // Use fallback silently
  }

  return (
    <section
      id="skills"
      aria-label="Skills"
      style={{
        padding: "96px 0",
        background: "var(--bg-1)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="wrap">
        <SectionHeading eyebrow="Technical Proficiency" title="Skills" />

        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          {skills.map((skill) => {
            const Icon = getIcon(skill.icon);
            return (
              <div key={skill.id}>
                {/* Row: icon + label + level + percent */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "10px",
                  }}
                >
                  <Icon
                    size={18}
                    style={{ color: "var(--gold-dim)", flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-eb-garamond), serif",
                      fontSize: "17px",
                      color: "var(--text-primary)",
                      flex: 1,
                    }}
                  >
                    {skill.label}
                  </span>
                  {skill.level && <LevelBadge level={skill.level} />}
                  {skill.percent !== null && (
                    <span
                      style={{
                        fontFamily: "var(--font-eb-garamond), serif",
                        fontSize: "13px",
                        color: "var(--text-muted)",
                        minWidth: "36px",
                        textAlign: "right",
                      }}
                    >
                      {skill.percent}%
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="skill-bar">
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${skill.percent ?? 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
