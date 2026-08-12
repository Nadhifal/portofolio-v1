"use client";

import { useActionState, useState } from "react";
import { upsertAbout, type ActionState } from "@/app/admin/actions";
import { Input, Textarea, Button } from "@/components/ui";
import { FormFeedback } from "@/components/admin/AdminUI";
import { createClient } from "@/lib/supabase/client";
import type { AboutContent } from "@/lib/types";

interface Props {
  data: AboutContent | null;
}

const initial: ActionState = {};

export default function AboutForm({ data }: Props) {
  const [state, formAction, isPending] = useActionState(upsertAbout, initial);
  const [photoUrl, setPhotoUrl] = useState<string>(data?.photo_url ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      setUploadError("Format file harus berupa gambar.");
      return;
    }

    // Validasi ukuran (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Ukuran gambar maksimal 2MB.");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const supabase = createClient();
      
      // Buat nama file unik
      const fileExt = file.name.split(".").pop();
      const fileName = `profile-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      // Upload ke bucket "portfolio"
      const { error: uploadErrorData, data: uploadData } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadErrorData) {
        throw new Error(uploadErrorData.message);
      }

      // Dapatkan URL Publik
      const { data: { publicUrl } } = supabase.storage
        .from("portfolio")
        .getPublicUrl(filePath);

      setPhotoUrl(publicUrl);
    } catch (err: any) {
      setUploadError(err.message || "Gagal mengunggah gambar.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {data?.id && <input type="hidden" name="id" value={data.id} />}

      <Input label="Eyebrow" id="about-eyebrow" name="eyebrow" defaultValue={data?.eyebrow ?? ""} disabled={isPending} />
      <Input label="Name" id="about-name" name="name" defaultValue={data?.name ?? ""} required disabled={isPending} />
      <Textarea label="Lead Paragraph (with drop-cap)" id="about-lead" name="lead" rows={4} defaultValue={data?.lead ?? ""} disabled={isPending} />
      <Input label="Education Meta" id="about-edu" name="edu_meta" defaultValue={data?.edu_meta ?? ""} hint="e.g. B.S. Informatics, Untirta — 2024 · GPA 3.54/4.00" disabled={isPending} />
      <Textarea label="Body Paragraph" id="about-paragraph" name="paragraph" rows={3} defaultValue={data?.paragraph ?? ""} disabled={isPending} />
      <Input label="Signature" id="about-signature" name="signature" defaultValue={data?.signature ?? ""} hint="e.g. — Nadhif" disabled={isPending} />
      
      {/* Photo Upload Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <label
          style={{
            fontFamily: "var(--font-eb-garamond), serif",
            fontSize: "13px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}
        >
          Photo Profil
        </label>
        
        {/* Preview Area */}
        {photoUrl && (
          <div style={{ marginBottom: "12px", display: "flex", alignItems: "center", gap: "16px" }}>
            <img
              src={photoUrl}
              alt="Preview Profile"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                border: "1px solid var(--gold)",
                borderRadius: "50%",
              }}
            />
            <button
              type="button"
              onClick={() => setPhotoUrl("")}
              style={{
                background: "none",
                border: "1px solid #4a2a24",
                color: "#c96b5c",
                fontFamily: "var(--font-eb-garamond), serif",
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              Hapus Gambar
            </button>
          </div>
        )}

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading || isPending}
            style={{
              fontFamily: "var(--font-eb-garamond), serif",
              fontSize: "14px",
              color: "var(--text-secondary)",
            }}
          />
          {isUploading && (
            <span style={{ fontFamily: "var(--font-eb-garamond), serif", fontSize: "13px", color: "var(--gold)" }}>
              Mengunggah...
            </span>
          )}
        </div>
        
        {uploadError && (
          <span style={{ fontFamily: "var(--font-eb-garamond), serif", fontSize: "13px", color: "#c96b5c" }}>
            {uploadError}
          </span>
        )}

        {/* Hidden input to pass to the Server Action */}
        <input type="hidden" name="photo_url" value={photoUrl} />
      </div>

      <FormFeedback success={state.success} error={state.error} />
      <Button type="submit" id="about-save" isLoading={isPending}>Save About Content</Button>
    </form>
  );
}
