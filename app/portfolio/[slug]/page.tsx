import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/public/sections/Navbar";
import Footer from "@/components/public/sections/Footer";
import { TechTag } from "@/components/ui";
import { getIcon } from "@/lib/icons";
import type { PortfolioProject } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let title = "Portfolio Project";

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("portfolio_projects")
      .select("title")
      .eq("slug", slug)
      .single();
    if (data) title = data.title;
  } catch {
    const fallback = FALLBACK_PROJECTS.find((p) => p.slug === slug);
    if (fallback) title = fallback.title;
  }

  return { title };
}

// Fallback projects matching seed data (for when env vars not set)
const FALLBACK_PROJECTS: PortfolioProject[] = [
  {
    id: "1",
    category_id: "1",
    icon: "ti-code",
    plate_label: "Plate I",
    title: "IMPACT.ID — AI & Blockchain Education Platform",
    description: "Lead Developer for LIDM 2026; Next.js frontend with an AI Challenge Engine and AI Mentor powered by the Gemini API.",
    slug: "impact-id",
    role: "Lead Developer · LIDM 2026",
    content: "IMPACT.ID adalah platform edukasi berbasis AI dan blockchain yang dikembangkan untuk LIDM 2026. Saya memimpin pengembangan frontend Next.js, termasuk AI Challenge Engine dan AI Mentor berbasis Gemini API.",
    tech: ["Next.js", "React", "Gemini API", "Tailwind CSS"],
    live_url: null,
    repo_url: null,
    image_url: null,
    sort_order: 1,
    created_at: "",
  },
  {
    id: "2",
    category_id: "1",
    icon: "ti-shopping-cart",
    plate_label: "Plate II",
    title: "Klambie — Design Marketplace",
    description: "Full-stack Laravel marketplace platform built for the P2MW business proposal competition.",
    slug: "klambie",
    role: "Full-Stack Developer · P2MW",
    content: "Klambie adalah marketplace jasa desain yang dibangun untuk kompetisi proposal bisnis P2MW, menghubungkan desainer independen dengan klien.",
    tech: ["Laravel", "MySQL", "Bootstrap"],
    live_url: null,
    repo_url: null,
    image_url: null,
    sort_order: 2,
    created_at: "",
  },
  {
    id: "3",
    category_id: "1",
    icon: "ti-building-community",
    plate_label: "Plate III",
    title: "Untirta Digital Creative — UKM Profile Site",
    description: "Laravel backend and React frontend showcasing activities, programs, and member portfolios.",
    slug: "undc",
    role: "Full-Stack Developer",
    content: "Situs profil resmi UKM Untirta Digital Creative untuk menampilkan kegiatan, program kerja, dan portofolio anggota.",
    tech: ["Laravel", "React", "MySQL"],
    live_url: null,
    repo_url: null,
    image_url: null,
    sort_order: 3,
    created_at: "",
  },
  {
    id: "4",
    category_id: "3",
    icon: "ti-chart-bar",
    plate_label: "Plate I",
    title: "Seabank Review Sentiment Analysis",
    description: "Multinomial Naive Bayes + TF-IDF model classifying 4,664+ reviews at 85.74% accuracy.",
    slug: "seabank-sentiment",
    role: "Data Analyst",
    content: "Analisis sentimen lebih dari 4.664 ulasan pengguna aplikasi Seabank menggunakan Multinomial Naive Bayes + TF-IDF, mencapai akurasi 85.74%.",
    tech: ["Python", "Scikit-learn", "Pandas", "TF-IDF"],
    live_url: null,
    repo_url: null,
    image_url: null,
    sort_order: 1,
    created_at: "",
  },
];

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  let project: PortfolioProject | null = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("portfolio_projects")
      .select("*")
      .eq("slug", slug)
      .single();
    if (data) project = data;
  } catch {
    // Try fallback
  }

  // Fallback to static data if Supabase not configured
  if (!project) {
    project = FALLBACK_PROJECTS.find((p) => p.slug === slug) ?? null;
  }

  if (!project) notFound();

  const Icon = getIcon(project.icon ?? "ti-code");
  const IconExternal = getIcon("ti-external-link");
  const IconGit = getIcon("ti-git-branch");

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        {/* Header */}
        <div
          style={{
            borderBottom: "1px solid var(--line)",
            padding: "64px 0 48px",
          }}
        >
          <div className="wrap">
            {/* Back link */}
            <Link
              href="/#portfolio"
              id="back-to-portfolio"
              className="link-back"
              style={{ marginBottom: "40px" }}
            >
              ← Portfolio
            </Link>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
              <Icon size={36} style={{ color: "var(--gold-dim)", marginTop: "4px", flexShrink: 0 }} />
              <div>
                {project.plate_label && (
                  <span
                    style={{
                      fontFamily: "var(--font-eb-garamond), serif",
                      fontSize: "11px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      display: "block",
                      marginBottom: "10px",
                    }}
                  >
                    {project.plate_label}
                  </span>
                )}
                <h1
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "clamp(28px, 5vw, 48px)",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    lineHeight: 1.15,
                    marginBottom: "12px",
                  }}
                >
                  {project.title}
                </h1>
                {project.role && (
                  <p
                    style={{
                      fontFamily: "var(--font-eb-garamond), serif",
                      fontSize: "16px",
                      color: "var(--gold-dim)",
                      margin: "0 0 16px",
                    }}
                  >
                    {project.role}
                  </p>
                )}

                {/* External links */}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="project-live-url"
                      className="btn-ghost"
                    >
                      <IconExternal size={12} /> Live Demo
                    </a>
                  )}
                  {project.repo_url && (
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="project-repo-url"
                      className="btn-ghost"
                    >
                      <IconGit size={12} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div style={{ padding: "64px 0" }}>
          <div
            className="wrap"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 260px",
              gap: "64px",
              alignItems: "start",
            }}
          >
            {/* Case study */}
            <div>
              {project.description && (
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "22px",
                    fontStyle: "italic",
                    color: "var(--text-secondary)",
                    lineHeight: 1.5,
                    marginBottom: "32px",
                    borderLeft: "2px solid var(--gold)",
                    paddingLeft: "20px",
                  }}
                >
                  {project.description}
                </p>
              )}
              {project.content && (
                <div
                  style={{
                    fontFamily: "var(--font-eb-garamond), serif",
                    fontSize: "18px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.75,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {project.content}
                </div>
              )}
            </div>

            {/* Sidebar: tech stack */}
            {project.tech && project.tech.length > 0 && (
              <aside>
                <p
                  style={{
                    fontFamily: "var(--font-eb-garamond), serif",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "14px",
                  }}
                >
                  Tech Stack
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {project.tech.map((t) => (
                    <TechTag key={t} tech={t} />
                  ))}
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
