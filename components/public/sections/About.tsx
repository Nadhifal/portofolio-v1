import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { getIcon } from "@/lib/icons";
import type { AboutContent } from "@/lib/types";

const FALLBACK: AboutContent = {
  id: "fallback",
  eyebrow: "About Me",
  name: "Nadhif Alfasya",
  lead: "I am an Informatics student (GPA 3.54/4.00) with hands-on experience as a full-stack web developer, comfortable building end-to-end applications with React, Next.js, Node.js, and Laravel. I have led teams in academic projects and national competitions including LIDM and P2MW.",
  edu_meta: "B.S. in Informatics, Universitas Sultan Ageng Tirtayasa — 2024 – Present · GPA 3.54 / 4.00",
  paragraph: "Based in Serang, Banten, currently seeking an MBKM internship / SKS conversion opportunity in Software & Web Development.",
  signature: "— Nadhif",
  photo_url: null,
  updated_at: "",
};

export default async function AboutSection() {
  let about: AboutContent = FALLBACK;

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("about_content").select("*").single();
    if (data) about = data;
  } catch {
    // Use fallback
  }

  let degree = "B.S. in Informatics";
  let school = "Universitas Sultan Ageng Tirtayasa";
  let year = "2024 – Present";
  let gpa = "GPA 3.54 / 4.00";

  if (about.edu_meta) {
    const parts = about.edu_meta.split(/[,—·]/).map((s) => s.trim());
    if (parts.length >= 4) {
      degree = parts[0];
      school = parts[1];
      year = parts[2];
      gpa = parts[3];
    } else {
      degree = about.edu_meta;
      school = "";
      year = "";
      gpa = "";
    }
  }

  const IconSchool = getIcon("ti-school");
  const IconCalendar = getIcon("ti-calendar");
  const IconStar = getIcon("ti-star");

  return (
    <section id="about" className="py-[100px] px-6 bg-[var(--bg-0)]">
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[80px] items-start mt-5">
          {/* Portrait Column */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[300px] md:max-w-[380px] mb-10 md:mb-0">
              <div className="relative aspect-[3/4] bg-[var(--bg-1)] border border-[var(--line)] after:content-[''] after:absolute after:-right-3 after:-bottom-3 after:w-[60%] after:h-[40%] after:border-r after:border-b after:border-[var(--gold-dim)]">
                {about.photo_url ? (
                  <Image
                    src={about.photo_url}
                    alt={about.name ?? "Profile photo"}
                    fill
                    sizes="(max-width: 900px) 300px, 380px"
                    className="object-cover grayscale contrast-110"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[repeating-linear-gradient(45deg,var(--line)_0,var(--line)_1px,transparent_0,transparent_50%)] bg-[length:12px_12px]">
                    <span className="font-serif text-[13px] tracking-widest text-[var(--text-muted)]">
                      Photo
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div>
            <span className="eyebrow">{about.eyebrow}</span>
            <h2 className="my-3.5 mb-5 text-[34px] text-[var(--text-primary)]">{about.name}</h2>
            
            <p className="text-[19px] text-[var(--text-primary)] leading-[1.6] mb-6">
              {about.lead}
            </p>

            <div className="flex gap-4 items-start p-5 border border-[var(--line)] bg-[var(--bg-1)] my-7">
              <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-[var(--bg-2)] border border-[var(--line)] text-[var(--gold-dim)] rounded-full text-[22px]">
                <IconSchool size={24} />
              </div>
              <div>
                <div className="font-serif text-[22px] mb-1">{degree}</div>
                {school && <div className="text-[var(--text-secondary)] text-[15px] mb-3">{school}</div>}
                {(year || gpa) && (
                  <div className="flex gap-4 flex-wrap">
                    {year && (
                      <span className="flex items-center gap-1.5 text-[12px] tracking-[0.04em] text-[var(--text-muted)] border border-[var(--line)] py-1 px-2.5">
                        <IconCalendar size={14} /> {year}
                      </span>
                    )}
                    {gpa && (
                      <span className="flex items-center gap-1.5 text-[12px] tracking-[0.04em] text-[var(--text-muted)] border border-[var(--line)] py-1 px-2.5">
                        <IconStar size={14} /> {gpa}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <p className="text-[var(--text-secondary)] leading-[1.7] mb-6">
              {about.paragraph}
            </p>

            {about.signature && (
              <p className="font-serif text-[24px] italic text-[var(--gold-dim)] mt-6">{about.signature}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
