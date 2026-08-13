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
      className="py-[96px] bg-[var(--bg-1)] border-y border-[var(--line)] px-6"
    >
      <div className="max-w-[1000px] mx-auto">
        <SectionHeading eyebrow="Technical Proficiency" title="Skills" />

        <div className="max-w-[640px] mx-auto flex flex-col gap-8">
          {skills.map((skill) => {
            const Icon = getIcon(skill.icon);
            return (
              <div key={skill.id} className="mb-2">
                {/* Row: label + level */}
                <div className="flex justify-between text-[14px] tracking-[0.08em] uppercase text-[var(--text-secondary)] mb-2 items-center">
                  <b className="text-[var(--text-primary)] font-normal font-serif text-[18px] tracking-[0.02em] normal-case inline-flex items-center gap-[10px]">
                    <Icon size={18} className="text-[var(--gold)]" />
                    {skill.label}
                  </b>
                  <div className="flex items-center gap-2">
                    <span>{skill.level}</span>
                    {skill.percent !== null && (
                      <span className="opacity-75 text-[12px]">({skill.percent}%)</span>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-[2px] bg-[var(--bg-2)] relative">
                  <div
                    className="absolute left-0 top-0 h-[2px] bg-[var(--gold)]"
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
