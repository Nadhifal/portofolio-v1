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
