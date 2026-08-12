# Development Log — Portofolio v1

Dokumentasi langkah kerja pembangunan website portofolio + admin CMS (Next.js + Supabase).

---

## Step 1: Inisialisasi Proyek Next.js & Install Dependencies

**Tanggal:** 2026-08-13

### Apa yang Dikerjakan

1. Inisialisasi proyek Next.js 16.3.0 dengan konfigurasi:
   - TypeScript
   - App Router
   - Tailwind CSS v4
   - ESLint
2. Install dependency tambahan:
   - `@supabase/supabase-js` — Supabase client library
   - `@supabase/ssr` — Supabase SSR helper (cookies-based auth)
   - `react-hook-form` — Form handling library
   - `@hookform/resolvers` — Resolver untuk integrasi Zod + React Hook Form
   - `zod` — Schema validation
   - `@tabler/icons-react` — Icon library (Tabler Icons sebagai React components)
3. Konfigurasi path alias `@/*` mengarah ke root (`./`) bukan `src/`.
4. Setup file environment variables (`.env.local` dan `.env.example`).
5. Update `.gitignore` agar `.env.example` bisa di-commit.
6. Verifikasi build berhasil (`npm run build` ✅).

### File yang Dibuat

| File | Keterangan |
|---|---|
| `package.json` | Manifest proyek, dependencies, scripts |
| `package-lock.json` | Lock file npm |
| `tsconfig.json` | TypeScript config, path alias `@/*` → `./*` |
| `next.config.ts` | Next.js configuration |
| `postcss.config.mjs` | PostCSS config untuk Tailwind CSS |
| `eslint.config.mjs` | ESLint configuration |
| `next-env.d.ts` | Next.js TypeScript declarations |
| `.env.local` | Environment variables (kosong, gitignored) |
| `.env.example` | Template environment variables (committed) |
| `AGENTS.md` | Next.js agent rules (auto-generated) |
| `CLAUDE.md` | Claude rules (auto-generated) |
| `app/layout.tsx` | Root layout (default Next.js) |
| `app/page.tsx` | Homepage (default Next.js, akan di-replace nanti) |
| `app/globals.css` | Global CSS (default Tailwind, akan di-replace nanti) |
| `app/favicon.ico` | Favicon default |
| `public/file.svg` | Default asset (akan di-replace nanti) |
| `public/globe.svg` | Default asset (akan di-replace nanti) |
| `public/next.svg` | Default asset (akan di-replace nanti) |
| `public/vercel.svg` | Default asset (akan di-replace nanti) |
| `public/window.svg` | Default asset (akan di-replace nanti) |

### File yang Diubah

| File | Perubahan |
|---|---|
| `.gitignore` | Diupdate dari Next.js default; `.env*` → `.env*.local` agar `.env.example` bisa di-commit |

### Struktur Proyek Saat Ini

```
portofolio-v1/
├── .docs/                          # Dokumentasi & prototype (sudah ada sebelumnya)
│   ├── admin.html
│   ├── portfolio.html
│   ├── prompt-website-portofolio-nextjs-supabase.md
│   └── prompt-website-portofolio-nextjs-supabase-v1.md
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── .env.example
├── .env.local                      # gitignored
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── DEVLOG.md                       # ← file ini
```

### Langkah Selanjutnya

**Step 2:** Buat file SQL migration (`supabase/migrations/0001_init.sql`) dan seed data (`supabase/seed.sql`) sesuai skema database di prompt.

---

## Step 2: Database Migration SQL & RLS Policies

**Tanggal:** 2026-08-13

### Apa yang Dikerjakan

1. Buat file SQL migration `supabase/migrations/0001_init.sql` dengan 11 tabel:
   - `profiles` — Extends Supabase Auth users
   - `site_settings` — Singleton: nama situs
   - `hero_content` — Singleton: konten hero section
   - `about_content` — Singleton: konten about section + foto
   - `skills` — List: keahlian dengan icon, level, percent
   - `portfolio_categories` — List: kategori tab portfolio (slug unik)
   - `portfolio_projects` — List: proyek portfolio dengan slug, role, content (case study), tech (array), live_url, repo_url
   - `experience` — List: timeline pengalaman
   - `testimonial` — Singleton: kutipan testimonial
   - `contact_info` — Singleton: info kontak & media sosial
   - `contact_messages` — List: pesan masuk dari form kontak publik

2. Implementasi Row Level Security (RLS) pada semua tabel:
   - **Tabel konten** (9 tabel): `SELECT` untuk `anon` + `authenticated`, `INSERT/UPDATE/DELETE` hanya `authenticated`
   - **`contact_messages`**: `INSERT` untuk `anon` + `authenticated` (agar visitor bisa kirim pesan), `SELECT/UPDATE/DELETE` hanya `authenticated`
   - **`profiles`**: Hanya bisa akses profil sendiri (by `auth.uid()`)

3. Buat file seed data `supabase/seed.sql` berdasarkan `DEFAULT_DATA` di `admin.html`:
   - Hero: "Building products that *work end to end*"
   - About: Nadhif Alfasya, GPA 3.54, Untirta
   - 4 Skills: Front-End 90%, Back-End 85%, Database 75%, AI 70%
   - 3 Kategori: Website, Mobile App, Machine Learning
   - 4 Proyek: IMPACT.ID, Klambie, UNDC, Seabank Sentiment (lengkap slug/role/content/tech)
   - 3 Experience: UKM UNDC, Cisco cert, NSP cert
   - 1 Testimonial
   - Contact info: email, phone, lokasi, LinkedIn, GitHub

### File yang Dibuat

| File | Keterangan |
|---|---|
| `supabase/migrations/0001_init.sql` | DDL 11 tabel + RLS policies (310 baris) |
| `supabase/seed.sql` | Data awal semua tabel (150 baris) |

### Cara Menjalankan

1. Buat project Supabase di [supabase.com](https://supabase.com)
2. Buka **SQL Editor** di dashboard Supabase
3. Jalankan isi `supabase/migrations/0001_init.sql` terlebih dahulu
4. Lalu jalankan isi `supabase/seed.sql`
5. Salin URL, anon key, dan service role key ke `.env.local`

### Langkah Selanjutnya

**Step 3:** Setup Supabase client (server & browser) serta middleware proteksi route `/admin/*`.
