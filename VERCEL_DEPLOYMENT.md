# 🚀 Panduan Deployment Vercel — Portofolio v1

Dokumen ini berisi panduan untuk mendeploy website portofolio Anda ke **Vercel** dan menyambungkannya dengan production database **Supabase**.

---

## Langkah 1: Push ke GitHub/GitLab/Bitbucket

Pastikan seluruh kode terbaru sudah di-commit dan di-push ke repository Git Anda:

```bash
git add .
git commit -m "feat: complete portfolio app with admin CMS and Supabase connection"
git push origin main
```

---

## Langkah 2: Import Project ke Vercel

1. Buka [Vercel Dashboard](https://vercel.com/dashboard).
2. Klik tombol **Add New...** → **Project**.
3. Hubungkan akun Git Anda dan cari repository **portofolio-v1**.
4. Klik **Import**.

---

## Langkah 3: Konfigurasi Environment Variables

Pada bagian **Environment Variables** di Vercel, masukkan variabel dari `.env.local` berikut ini:

| Key | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | *URL Supabase Anda* |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *Anon Key Supabase Anda* |
| `SUPABASE_SERVICE_ROLE_KEY` | *Service Role Key Supabase Anda* |

> 💡 **Penting:** Pastikan tidak ada spasi di awal atau di akhir nilai yang dimasukkan.

---

## Langkah 4: Deploy!

1. Klik tombol **Deploy**.
2. Tunggu proses build selesai (biasanya sekitar 1–2 menit).
3. Setelah selesai, website Anda sudah aktif dan live!

---

## Langkah 5: Pengujian End-to-End di Production URL

Setelah dideploy, silakan lakukan tes ini pada URL Vercel Anda:

1. **Akses Landing Page:** Buka domain vercel Anda (misal: `https://my-portfolio.vercel.app/`). Pastikan data terload sempurna dari database Supabase Anda.
2. **Kirim Pesan:** Coba kirim pesan lewat form kontak di bagian bawah. Pastikan muncul notifikasi sukses.
3. **Login Admin:** Masuk ke `/admin/login` menggunakan kredensial email & password yang sudah Anda buat di dashboard Supabase Auth.
4. **Periksa Pesan Masuk:** Buka menu **Messages** di admin panel untuk memastikan pesan yang Anda kirim pada Langkah 2 sudah masuk.
5. **Ubah Konten:** Coba ubah teks di bagian **Hero** atau **About** lalu simpan.
6. **Verifikasi Perubahan:** Buka kembali halaman utama `/` (publik), refresh, dan pastikan datanya sudah berubah seketika (menguji `revalidatePath` di server actions).
