import { createClient } from "@/lib/supabase/server";
import { SectionHeading } from "@/components/ui";
import PortfolioClient from "@/components/public/PortfolioClient";
import type { PortfolioCategory, PortfolioProject } from "@/lib/types";

const FALLBACK_CATEGORIES: PortfolioCategory[] = [
  { id: "1", slug: "website", label: "Website", sort_order: 1 },
  { id: "2", slug: "mobile", label: "Mobile App", sort_order: 2 },
  { id: "3", slug: "ml", label: "Machine Learning", sort_order: 3 },
];

const FALLBACK_PROJECTS: PortfolioProject[] = [
  {
    id: "1",
    category_id: "1",
    icon: "ti-code",
    plate_label: "Plate I",
    title: "IMPACT.ID — AI & Blockchain Education Platform",
    description:
      "Lead Developer for LIDM 2026; Next.js frontend with an AI Challenge Engine and AI Mentor powered by the Gemini API.",
    slug: "impact-id",
    role: "Lead Developer · LIDM 2026",
    content:
      "IMPACT.ID adalah platform edukasi berbasis AI dan blockchain yang dikembangkan untuk LIDM 2026.",
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
    description:
      "Full-stack Laravel marketplace platform built for the P2MW business proposal competition.",
    slug: "klambie",
    role: "Full-Stack Developer · P2MW",
    content:
      "Klambie adalah marketplace jasa desain untuk kompetisi P2MW.",
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
    description:
      "Laravel backend and React frontend showcasing activities, programs, and member portfolios.",
    slug: "undc",
    role: "Full-Stack Developer",
    content: "Situs profil resmi UKM Untirta Digital Creative.",
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
    description:
      "Multinomial Naive Bayes + TF-IDF model classifying 4,664+ reviews at 85.74% accuracy.",
    slug: "seabank-sentiment",
    role: "Data Analyst",
    content:
      "Analisis sentimen ulasan pengguna Seabank dengan akurasi 85.74%.",
    tech: ["Python", "Scikit-learn", "Pandas", "TF-IDF"],
    live_url: null,
    repo_url: null,
    image_url: null,
    sort_order: 1,
    created_at: "",
  },
];

export default async function Portfolio() {
  let categories: PortfolioCategory[] = FALLBACK_CATEGORIES;
  let projects: PortfolioProject[] = FALLBACK_PROJECTS;

  try {
    const supabase = await createClient();
    const [catResult, projResult] = await Promise.all([
      supabase
        .from("portfolio_categories")
        .select("*")
        .order("sort_order"),
      supabase
        .from("portfolio_projects")
        .select("*")
        .order("sort_order"),
    ]);
    if (catResult.data && catResult.data.length > 0)
      categories = catResult.data;
    if (projResult.data && projResult.data.length > 0)
      projects = projResult.data;
  } catch {
    // Use fallback silently
  }

  return (
    <section
      id="portfolio"
      aria-label="Portfolio"
      style={{
        padding: "96px 0",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="wrap">
        <SectionHeading eyebrow="Selected Work" title="Portfolio" />
        <PortfolioClient
          categories={categories}
          projects={projects}
        />
      </div>
    </section>
  );
}
