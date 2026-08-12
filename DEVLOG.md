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

---

## Step 3: Setup Supabase Client & Auth Middleware (Proxy)

**Tanggal:** 2026-08-13

### Apa yang Dikerjakan

1. Buat `lib/supabase/server.ts` — Supabase server client:
   - Menggunakan `createServerClient` dari `@supabase/ssr`
   - Membaca/menulis cookies via `next/headers` (async `cookies()`)
   - Dipakai di Server Components dan Server Actions untuk fetch data + mutasi

2. Buat `lib/supabase/client.ts` — Supabase browser client:
   - Menggunakan `createBrowserClient` dari `@supabase/ssr`
   - Dipakai di Client Components (admin dashboard) untuk mutasi real-time

3. Buat `proxy.ts` — Route protection (menggantikan `middleware.ts`):
   - **Catatan penting:** Di Next.js 16, `middleware.ts` sudah **deprecated** dan diganti `proxy.ts` dengan export function `proxy()` (bukan `middleware()`)
   - Memproteksi semua route `/admin/*` kecuali `/admin/login`
   - User belum login → redirect ke `/admin/login`
   - User sudah login mengakses `/admin/login` → redirect ke `/admin/hero`
   - Menggunakan `supabase.auth.getUser()` (bukan `getSession()`) untuk validasi JWT yang aman
   - Matcher hanya mencocokkan `/admin/:path*` (tidak mengganggu route publik)

### File yang Dibuat

| File | Keterangan |
|---|---|
| `lib/supabase/server.ts` | Server client (cookies-based, untuk Server Components/Actions) |
| `lib/supabase/client.ts` | Browser client (untuk Client Components) |
| `proxy.ts` | Route protection `/admin/*` (Next.js 16 proxy, bukan middleware) |

### Catatan Teknis

- **`middleware.ts` → `proxy.ts`**: Next.js 16 me-rename file convention ini. Export function harus bernama `proxy`, bukan `middleware`. Lihat [docs](node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md).
- **`getUser()` vs `getSession()`**: `getUser()` memvalidasi JWT di server, `getSession()` tidak. Selalu gunakan `getUser()` untuk auth check.

### Build Check

```
✓ Compiled successfully
ƒ Proxy (Middleware) ← proxy.ts terdeteksi
```

### Langkah Selanjutnya

**Step 4:** Bangun sistem desain dasar: konfigurasi warna, font, komponen UI reusable, dan `lib/icons.ts`.

---

## Step 4: Design System & Komponen UI Reusable

**Tanggal:** 2026-08-13

### Apa yang Dikerjakan

1. **`app/layout.tsx`** — Diganti dengan font Cormorant Garamond + EB Garamond via `next/font/google`, metadata portfolio dasar.

2. **`app/globals.css`** — Design system lengkap:
   - CSS variables palet editorial dark museum (`--bg-0/1/2`, `--line`, `--gold`, `--gold-dim`, `--text-primary/secondary/muted`)
   - Tailwind v4 `@theme inline` extension untuk akses warna via `text-gold`, `bg-bg-1`, dsb.
   - Base styles: `body` dengan font EB Garamond, `h1-h6` dengan Cormorant Garamond
   - Utility classes: `.eyebrow`, `.drop-cap`, `.skill-bar`, `.skill-bar-fill`, `.hairline`, `.wrap`
   - Keyframe animations untuk Toast (toast-in/toast-out)

3. **`lib/icons.ts`** — Icon mapping:
   - `iconMap` — 28 icon Tabler → komponen `@tabler/icons-react`
   - `getIcon(name)` — resolve string DB ke komponen, fallback ke `IconCode`
   - `getIconOptions()` — daftar opsi untuk dropdown admin

4. **Komponen UI** di `components/ui/`:

| Komponen | Deskripsi |
|---|---|
| `Button.tsx` | Primary/ghost/danger variants, sm/md/lg sizes, loading spinner |
| `Card.tsx` | Card + PlateLabel (museum plate style) |
| `SectionHeading.tsx` | Eyebrow + title + gold rule divider |
| `Badge.tsx` | Badge, LevelBadge (skill levels), TechTag (tech stack) |
| `Input.tsx` | Label + error + hint, gold focus border |
| `Textarea.tsx` | Sama seperti Input, resize vertical |
| `Select.tsx` | Dropdown dengan options array, styled dark |
| `Toast.tsx` | Success/error/info, auto-dismiss, `useToast` hook |
| `index.ts` | Barrel export semua komponen |

### File yang Dibuat/Diubah

| File | Status |
|---|---|
| `app/layout.tsx` | ✏️ Diubah — font & metadata |
| `app/globals.css` | ✏️ Diubah — design system penuh |
| `lib/icons.ts` | ✅ Baru |
| `components/ui/Button.tsx` | ✅ Baru |
| `components/ui/Card.tsx` | ✅ Baru |
| `components/ui/SectionHeading.tsx` | ✅ Baru |
| `components/ui/Badge.tsx` | ✅ Baru |
| `components/ui/Input.tsx` | ✅ Baru |
| `components/ui/Textarea.tsx` | ✅ Baru |
| `components/ui/Select.tsx` | ✅ Baru |
| `components/ui/Toast.tsx` | ✅ Baru |
| `components/ui/index.ts` | ✅ Baru (barrel export) |

### Build Check

```
✓ Compiled successfully
✓ TypeScript clean
ƒ Proxy (Middleware)
```

### Langkah Selanjutnya

**Step 5:** Bangun halaman publik `/` — komponen section self-contained (`Navbar`, `Hero`, `About`, `Skills`, `Portfolio`, `Experience`, `Testimonial`, `Contact`, `Footer`) + halaman detail proyek `/portfolio/[slug]`.
