-- ============================================================
-- Migration: 0002_storage_bucket.sql
-- Create storage bucket for images and set up access policies
-- ============================================================

-- Create the public bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

-- ─────────────────────────────────────────────────────────────
-- STORAGE POLICIES
-- ─────────────────────────────────────────────────────────────

-- 1. Public can view all images in the portfolio bucket
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'portfolio' );

-- 2. Authenticated admins can upload images
create policy "Auth Insert"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'portfolio' );

-- 3. Authenticated admins can update images
create policy "Auth Update"
on storage.objects for update
to authenticated
using ( bucket_id = 'portfolio' );

-- 4. Authenticated admins can delete images
create policy "Auth Delete"
on storage.objects for delete
to authenticated
using ( bucket_id = 'portfolio' );
