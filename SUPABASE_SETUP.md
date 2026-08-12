# 🗄️ Panduan Setup Database Supabase

## Langkah 1: Buka SQL Editor

1. Login ke [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project **odpykmaeujoabvvyvpga**
3. Di sidebar kiri → klik **SQL Editor**
4. Klik tombol **New query** (atau **+**)

---

## Langkah 2: Jalankan Migration Schema

Salin-tempel seluruh isi file ini ke SQL Editor:

📄 **`supabase/migrations/0001_init.sql`**

Lalu klik **▶ Run** (Ctrl+Enter).

Hasil yang diharapkan:
```
Success. No rows returned.
```

---

## Langkah 3: Jalankan Seed Data

Buat query baru lagi, salin-tempel isi file:

📄 **`supabase/seed.sql`**

Lalu klik **▶ Run**.

---

## Langkah 4: Verifikasi

Jalankan perintah ini di terminal proyek:

```bash
node scripts/test-connection.mjs
```

Hasil yang diharapkan:
```
✅ site_settings          → 1 rows
✅ hero_content           → 1 rows
✅ about_content          → 1 rows
✅ skills                 → 4 rows
✅ portfolio_categories   → 3 rows
✅ portfolio_projects     → 3 rows
✅ experience             → 3 rows
✅ testimonial            → 1 rows
✅ contact_info           → 1 rows
✅ contact_messages       → 0 rows

✅ All tables OK!
```

---

## Langkah 5: Buat Admin User di Supabase Auth

1. Di Supabase Dashboard → **Authentication** → **Users**
2. Klik **Invite user** atau **Add user**
3. Masukkan email & password yang akan digunakan untuk login `/admin`
4. Klik **Create user**

---

## Langkah 6: Test Dev Server

```bash
npm run dev
```

Buka:
- `http://localhost:3000` → Landing page
- `http://localhost:3000/admin/login` → Login admin
- Masuk dengan email/password dari Langkah 5
- Cek semua halaman admin berfungsi

---

## ⚠️ Catatan

- File `.env.local` sudah terisi dengan credentials yang benar
- Jangan commit `.env.local` ke Git (sudah ada di `.gitignore`)
- `SUPABASE_SERVICE_ROLE_KEY` hanya untuk scripts server-side, jangan expose ke client

---

## Link Berguna

- [Supabase Dashboard](https://supabase.com/dashboard/project/odpykmaeujoabvvyvpga)
- [SQL Editor](https://supabase.com/dashboard/project/odpykmaeujoabvvyvpga/sql/new)
- [Auth Users](https://supabase.com/dashboard/project/odpykmaeujoabvvyvpga/auth/users)
- [Table Editor](https://supabase.com/dashboard/project/odpykmaeujoabvvyvpga/editor)
