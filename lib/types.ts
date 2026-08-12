// Database row types (matching supabase/migrations/0001_init.sql)

export interface SiteSettings {
  id: string;
  site_name: string;
  updated_at: string;
}

export interface HeroContent {
  id: string;
  eyebrow: string | null;
  title_plain: string | null;
  title_highlight: string | null;
  description: string | null;
  button_text: string | null;
  updated_at: string;
}

export interface AboutContent {
  id: string;
  eyebrow: string | null;
  name: string | null;
  lead: string | null;
  edu_meta: string | null;
  paragraph: string | null;
  signature: string | null;
  photo_url: string | null;
  updated_at: string;
}

export interface Skill {
  id: string;
  icon: string;
  label: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert" | null;
  percent: number | null;
  sort_order: number;
}

export interface PortfolioCategory {
  id: string;
  slug: string;
  label: string;
  sort_order: number;
}

export interface PortfolioProject {
  id: string;
  category_id: string | null;
  icon: string | null;
  plate_label: string | null;
  title: string;
  description: string | null;
  slug: string;
  role: string | null;
  content: string | null;
  tech: string[] | null;
  live_url: string | null;
  repo_url: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface Experience {
  id: string;
  year_label: string | null;
  title: string;
  description: string | null;
  sort_order: number;
}

export interface Testimonial {
  id: string;
  quote: string | null;
  cite: string | null;
}

export interface ContactInfo {
  id: string;
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin_url: string | null;
  github_url: string | null;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
