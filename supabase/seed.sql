-- ============================================================
-- Seed Data — Portofolio v1
-- Data awal berdasarkan DEFAULT_DATA di admin.html prototype
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- SITE SETTINGS
-- ─────────────────────────────────────────────────────────────
insert into site_settings (site_name)
values ('Nadhif Alfasya');

-- ─────────────────────────────────────────────────────────────
-- HERO CONTENT
-- ─────────────────────────────────────────────────────────────
insert into hero_content (eyebrow, title_plain, title_highlight, description, button_text)
values (
  'Informatics Student & Full-Stack Developer',
  'Building products that',
  'work end to end',
  '5th-semester Informatics student at Universitas Sultan Ageng Tirtayasa, building full-stack web applications with React, Next.js, Node.js, and Laravel.',
  'View Projects'
);

-- ─────────────────────────────────────────────────────────────
-- ABOUT CONTENT
-- ─────────────────────────────────────────────────────────────
insert into about_content (eyebrow, name, lead, edu_meta, paragraph, signature, photo_url)
values (
  'About Me',
  'Nadhif Alfasya',
  'I am an Informatics student (GPA 3.54/4.00) with hands-on experience as a full-stack web developer, comfortable building end-to-end applications with React, Next.js, Node.js, and Laravel. I have led teams in academic projects and national competitions including LIDM and P2MW.',
  'B.S. Informatics, Universitas Sultan Ageng Tirtayasa — 2024 – Present · GPA 3.54 / 4.00',
  'Based in Serang, Banten, currently seeking an MBKM internship / SKS conversion opportunity in Software & Web Development.',
  '— Nadhif',
  ''
);

-- ─────────────────────────────────────────────────────────────
-- SKILLS
-- ─────────────────────────────────────────────────────────────
insert into skills (icon, label, level, percent, sort_order) values
  ('ti-brand-react', 'Front-End (React / Next.js)', 'Advanced', 90, 1),
  ('ti-server-2', 'Back-End (Node.js / Laravel)', 'Advanced', 85, 2),
  ('ti-database', 'Database (MySQL / SQL)', 'Intermediate', 75, 3),
  ('ti-brain', 'AI & Data Analysis (Python)', 'Intermediate', 70, 4);

-- ─────────────────────────────────────────────────────────────
-- PORTFOLIO CATEGORIES
-- ─────────────────────────────────────────────────────────────
insert into portfolio_categories (slug, label, sort_order) values
  ('website', 'Website', 1),
  ('mobile', 'Mobile App', 2),
  ('ml', 'Machine Learning', 3);

-- ─────────────────────────────────────────────────────────────
-- PORTFOLIO PROJECTS
-- (category_id diambil via subquery berdasarkan slug kategori)
-- ─────────────────────────────────────────────────────────────
insert into portfolio_projects (category_id, icon, plate_label, title, description, slug, role, content, tech, live_url, repo_url, image_url, sort_order)
values
  (
    (select id from portfolio_categories where slug = 'website'),
    'ti-code',
    'Plate I',
    'IMPACT.ID — AI & Blockchain Education Platform',
    'Lead Developer for LIDM 2026; Next.js frontend with an AI Challenge Engine and AI Mentor powered by the Gemini API.',
    'impact-id',
    'Lead Developer · LIDM 2026',
    'IMPACT.ID adalah platform edukasi berbasis AI dan blockchain yang dikembangkan untuk LIDM 2026. Saya memimpin pengembangan frontend Next.js, termasuk AI Challenge Engine dan AI Mentor berbasis Gemini API.',
    ARRAY['Next.js', 'React', 'Gemini API', 'Tailwind CSS'],
    '',
    '',
    '',
    1
  ),
  (
    (select id from portfolio_categories where slug = 'website'),
    'ti-shopping-cart',
    'Plate II',
    'Klambie — Design Marketplace',
    'Full-stack Laravel marketplace platform built for the P2MW business proposal competition.',
    'klambie',
    'Full-Stack Developer · P2MW',
    'Klambie adalah marketplace jasa desain yang dibangun untuk kompetisi proposal bisnis P2MW, menghubungkan desainer independen dengan klien.',
    ARRAY['Laravel', 'MySQL', 'Bootstrap'],
    '',
    '',
    '',
    2
  ),
  (
    (select id from portfolio_categories where slug = 'website'),
    'ti-building-community',
    'Plate III',
    'Untirta Digital Creative — UKM Profile Site',
    'Laravel backend and React frontend showcasing activities, programs, and member portfolios.',
    'undc',
    'Full-Stack Developer',
    'Situs profil resmi UKM Untirta Digital Creative untuk menampilkan kegiatan, program kerja, dan portofolio anggota.',
    ARRAY['Laravel', 'React', 'MySQL'],
    '',
    '',
    '',
    3
  ),
  (
    (select id from portfolio_categories where slug = 'ml'),
    'ti-chart-bar',
    'Plate I',
    'Seabank Review Sentiment Analysis',
    'Multinomial Naive Bayes + TF-IDF model classifying 4,664+ reviews at 85.74% accuracy.',
    'seabank-sentiment',
    'Data Analyst',
    'Analisis sentimen lebih dari 4.664 ulasan pengguna aplikasi Seabank menggunakan Multinomial Naive Bayes + TF-IDF, mencapai akurasi 85.74%.',
    ARRAY['Python', 'Scikit-learn', 'Pandas', 'TF-IDF'],
    '',
    '',
    '',
    1
  );

-- ─────────────────────────────────────────────────────────────
-- EXPERIENCE
-- ─────────────────────────────────────────────────────────────
insert into experience (year_label, title, description, sort_order) values
  (
    'April 2026 — Present',
    'Staff, AI Division — UKM Untirta Digital Creative',
    'Contributing to AI-based projects including AI agents and automation; involved in internal committees, working meetings, and workshops.',
    1
  ),
  (
    'June 2026',
    'Data Science Essentials with Python — Cisco Networking Academy',
    'Certification completed through Faculty of Engineering, Untirta.',
    2
  ),
  (
    'August 2025',
    'English Certificate of Achievement — NSP International',
    'Conversation Level 1, Survival English.',
    3
  );

-- ─────────────────────────────────────────────────────────────
-- TESTIMONIAL
-- ─────────────────────────────────────────────────────────────
insert into testimonial (quote, cite)
values (
  'I believe great products live at the intersection of clean code and thoughtful design — built end to end, one feature at a time.',
  '— Nadhif Alfasya'
);

-- ─────────────────────────────────────────────────────────────
-- CONTACT INFO
-- ─────────────────────────────────────────────────────────────
insert into contact_info (email, phone, location, linkedin_url, github_url)
values (
  'naddhfal@gmail.com',
  '0852-8784-9912',
  'Serang, Banten',
  '#',
  '#'
);
