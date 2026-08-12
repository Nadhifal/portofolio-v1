-- ============================================================
-- Migration: 0001_init.sql
-- Portofolio v1 — Initial Schema
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. PROFILES (extends Supabase Auth)
-- ─────────────────────────────────────────────────────────────
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- 2. SITE SETTINGS (singleton)
-- ─────────────────────────────────────────────────────────────
create table site_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text not null default 'My Portfolio',
  updated_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- 3. HERO CONTENT (singleton)
-- ─────────────────────────────────────────────────────────────
create table hero_content (
  id uuid primary key default gen_random_uuid(),
  eyebrow text,
  title_plain text,
  title_highlight text,
  description text,
  button_text text,
  updated_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- 4. ABOUT CONTENT (singleton)
-- ─────────────────────────────────────────────────────────────
create table about_content (
  id uuid primary key default gen_random_uuid(),
  eyebrow text,
  name text,
  lead text,
  edu_meta text,
  paragraph text,
  signature text,
  photo_url text,
  updated_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- 5. SKILLS
-- ─────────────────────────────────────────────────────────────
create table skills (
  id uuid primary key default gen_random_uuid(),
  icon text not null,
  label text not null,
  level text check (level in ('Beginner','Intermediate','Advanced','Expert')),
  percent int check (percent between 0 and 100),
  sort_order int default 0
);

-- ─────────────────────────────────────────────────────────────
-- 6. PORTFOLIO CATEGORIES
-- ─────────────────────────────────────────────────────────────
create table portfolio_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  label text not null,
  sort_order int default 0
);

-- ─────────────────────────────────────────────────────────────
-- 7. PORTFOLIO PROJECTS
-- ─────────────────────────────────────────────────────────────
create table portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references portfolio_categories(id) on delete set null,
  icon text,
  plate_label text,
  title text not null,
  description text,
  slug text unique not null,
  role text,
  content text,
  tech text[],
  live_url text,
  repo_url text,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- 8. EXPERIENCE
-- ─────────────────────────────────────────────────────────────
create table experience (
  id uuid primary key default gen_random_uuid(),
  year_label text,
  title text not null,
  description text,
  sort_order int default 0
);

-- ─────────────────────────────────────────────────────────────
-- 9. TESTIMONIAL (singleton)
-- ─────────────────────────────────────────────────────────────
create table testimonial (
  id uuid primary key default gen_random_uuid(),
  quote text,
  cite text
);

-- ─────────────────────────────────────────────────────────────
-- 10. CONTACT INFO (singleton)
-- ─────────────────────────────────────────────────────────────
create table contact_info (
  id uuid primary key default gen_random_uuid(),
  email text,
  phone text,
  location text,
  linkedin_url text,
  github_url text
);

-- ─────────────────────────────────────────────────────────────
-- 11. CONTACT MESSAGES
-- ─────────────────────────────────────────────────────────────
create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table site_settings enable row level security;
alter table hero_content enable row level security;
alter table about_content enable row level security;
alter table skills enable row level security;
alter table portfolio_categories enable row level security;
alter table portfolio_projects enable row level security;
alter table experience enable row level security;
alter table testimonial enable row level security;
alter table contact_info enable row level security;
alter table contact_messages enable row level security;

-- ─────────────────────────────────────────────────────────────
-- PROFILES — only owner can read/update their own profile
-- ─────────────────────────────────────────────────────────────
create policy "Users can view own profile"
  on profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  to authenticated
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- ─────────────────────────────────────────────────────────────
-- CONTENT TABLES — public SELECT, authenticated full access
-- (site_settings, hero_content, about_content, skills,
--  portfolio_categories, portfolio_projects, experience,
--  testimonial, contact_info)
-- ─────────────────────────────────────────────────────────────

-- site_settings
create policy "Public can read site_settings"
  on site_settings for select
  to anon, authenticated
  using (true);

create policy "Admin can insert site_settings"
  on site_settings for insert
  to authenticated
  with check (true);

create policy "Admin can update site_settings"
  on site_settings for update
  to authenticated
  using (true);

create policy "Admin can delete site_settings"
  on site_settings for delete
  to authenticated
  using (true);

-- hero_content
create policy "Public can read hero_content"
  on hero_content for select
  to anon, authenticated
  using (true);

create policy "Admin can insert hero_content"
  on hero_content for insert
  to authenticated
  with check (true);

create policy "Admin can update hero_content"
  on hero_content for update
  to authenticated
  using (true);

create policy "Admin can delete hero_content"
  on hero_content for delete
  to authenticated
  using (true);

-- about_content
create policy "Public can read about_content"
  on about_content for select
  to anon, authenticated
  using (true);

create policy "Admin can insert about_content"
  on about_content for insert
  to authenticated
  with check (true);

create policy "Admin can update about_content"
  on about_content for update
  to authenticated
  using (true);

create policy "Admin can delete about_content"
  on about_content for delete
  to authenticated
  using (true);

-- skills
create policy "Public can read skills"
  on skills for select
  to anon, authenticated
  using (true);

create policy "Admin can insert skills"
  on skills for insert
  to authenticated
  with check (true);

create policy "Admin can update skills"
  on skills for update
  to authenticated
  using (true);

create policy "Admin can delete skills"
  on skills for delete
  to authenticated
  using (true);

-- portfolio_categories
create policy "Public can read portfolio_categories"
  on portfolio_categories for select
  to anon, authenticated
  using (true);

create policy "Admin can insert portfolio_categories"
  on portfolio_categories for insert
  to authenticated
  with check (true);

create policy "Admin can update portfolio_categories"
  on portfolio_categories for update
  to authenticated
  using (true);

create policy "Admin can delete portfolio_categories"
  on portfolio_categories for delete
  to authenticated
  using (true);

-- portfolio_projects
create policy "Public can read portfolio_projects"
  on portfolio_projects for select
  to anon, authenticated
  using (true);

create policy "Admin can insert portfolio_projects"
  on portfolio_projects for insert
  to authenticated
  with check (true);

create policy "Admin can update portfolio_projects"
  on portfolio_projects for update
  to authenticated
  using (true);

create policy "Admin can delete portfolio_projects"
  on portfolio_projects for delete
  to authenticated
  using (true);

-- experience
create policy "Public can read experience"
  on experience for select
  to anon, authenticated
  using (true);

create policy "Admin can insert experience"
  on experience for insert
  to authenticated
  with check (true);

create policy "Admin can update experience"
  on experience for update
  to authenticated
  using (true);

create policy "Admin can delete experience"
  on experience for delete
  to authenticated
  using (true);

-- testimonial
create policy "Public can read testimonial"
  on testimonial for select
  to anon, authenticated
  using (true);

create policy "Admin can insert testimonial"
  on testimonial for insert
  to authenticated
  with check (true);

create policy "Admin can update testimonial"
  on testimonial for update
  to authenticated
  using (true);

create policy "Admin can delete testimonial"
  on testimonial for delete
  to authenticated
  using (true);

-- contact_info
create policy "Public can read contact_info"
  on contact_info for select
  to anon, authenticated
  using (true);

create policy "Admin can insert contact_info"
  on contact_info for insert
  to authenticated
  with check (true);

create policy "Admin can update contact_info"
  on contact_info for update
  to authenticated
  using (true);

create policy "Admin can delete contact_info"
  on contact_info for delete
  to authenticated
  using (true);

-- ─────────────────────────────────────────────────────────────
-- CONTACT MESSAGES — public INSERT, authenticated full access
-- ─────────────────────────────────────────────────────────────
create policy "Public can insert contact_messages"
  on contact_messages for insert
  to anon, authenticated
  with check (true);

create policy "Admin can read contact_messages"
  on contact_messages for select
  to authenticated
  using (true);

create policy "Admin can update contact_messages"
  on contact_messages for update
  to authenticated
  using (true);

create policy "Admin can delete contact_messages"
  on contact_messages for delete
  to authenticated
  using (true);
