"use client";

import { useActionState } from "react";
import { upsertContactInfo, type ActionState } from "@/app/admin/actions";
import { Input, Button } from "@/components/ui";
import { FormFeedback } from "@/components/admin/AdminUI";
import type { ContactInfo } from "@/lib/types";

interface Props { data: ContactInfo | null }
const initial: ActionState = {};

export default function ContactInfoForm({ data }: Props) {
  const [state, formAction, isPending] = useActionState(upsertContactInfo, initial);

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {data?.id && <input type="hidden" name="id" value={data.id} />}

      <Input label="Email" id="ci-email" name="email" type="email" defaultValue={data?.email ?? ""} disabled={isPending} />
      <Input label="Phone" id="ci-phone" name="phone" defaultValue={data?.phone ?? ""} hint="e.g. 0852-8784-9912" disabled={isPending} />
      <Input label="Location" id="ci-location" name="location" defaultValue={data?.location ?? ""} hint="e.g. Serang, Banten" disabled={isPending} />
      <Input label="LinkedIn URL" id="ci-linkedin" name="linkedin_url" type="url" defaultValue={data?.linkedin_url ?? ""} disabled={isPending} />
      <Input label="GitHub URL" id="ci-github" name="github_url" type="url" defaultValue={data?.github_url ?? ""} disabled={isPending} />

      <FormFeedback success={state.success} error={state.error} />
      <Button type="submit" id="ci-save" isLoading={isPending}>Save Contact Info</Button>
    </form>
  );
}
