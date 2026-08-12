"use client";

import { useActionState } from "react";
import { upsertAbout, type ActionState } from "@/app/admin/actions";
import { Input, Textarea, Button } from "@/components/ui";
import { FormFeedback } from "@/components/admin/AdminUI";
import type { AboutContent } from "@/lib/types";

interface Props { data: AboutContent | null }
const initial: ActionState = {};

export default function AboutForm({ data }: Props) {
  const [state, formAction, isPending] = useActionState(upsertAbout, initial);

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {data?.id && <input type="hidden" name="id" value={data.id} />}

      <Input label="Eyebrow" id="about-eyebrow" name="eyebrow" defaultValue={data?.eyebrow ?? ""} disabled={isPending} />
      <Input label="Name" id="about-name" name="name" defaultValue={data?.name ?? ""} required disabled={isPending} />
      <Textarea label="Lead Paragraph (with drop-cap)" id="about-lead" name="lead" rows={4} defaultValue={data?.lead ?? ""} disabled={isPending} />
      <Input label="Education Meta" id="about-edu" name="edu_meta" defaultValue={data?.edu_meta ?? ""} hint="e.g. B.S. Informatics, Untirta — 2024 · GPA 3.54/4.00" disabled={isPending} />
      <Textarea label="Body Paragraph" id="about-paragraph" name="paragraph" rows={3} defaultValue={data?.paragraph ?? ""} disabled={isPending} />
      <Input label="Signature" id="about-signature" name="signature" defaultValue={data?.signature ?? ""} hint="e.g. — Nadhif" disabled={isPending} />
      <Input label="Photo URL (Supabase Storage)" id="about-photo" name="photo_url" defaultValue={data?.photo_url ?? ""} disabled={isPending} />

      <FormFeedback success={state.success} error={state.error} />
      <Button type="submit" id="about-save" isLoading={isPending}>Save About Content</Button>
    </form>
  );
}
