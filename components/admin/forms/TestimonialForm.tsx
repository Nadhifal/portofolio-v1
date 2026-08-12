"use client";

import { useActionState } from "react";
import { upsertTestimonial, type ActionState } from "@/app/admin/actions";
import { Textarea, Input, Button } from "@/components/ui";
import { FormFeedback } from "@/components/admin/AdminUI";
import type { Testimonial } from "@/lib/types";

interface Props { data: Testimonial | null }
const initial: ActionState = {};

export default function TestimonialForm({ data }: Props) {
  const [state, formAction, isPending] = useActionState(upsertTestimonial, initial);

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {data?.id && <input type="hidden" name="id" value={data.id} />}

      <Textarea
        label="Quote"
        id="testimonial-quote"
        name="quote"
        rows={5}
        defaultValue={data?.quote ?? ""}
        required
        hint="The featured quote shown on the public page (large italic serif)"
        disabled={isPending}
      />
      <Input
        label="Attribution / Cite"
        id="testimonial-cite"
        name="cite"
        defaultValue={data?.cite ?? ""}
        hint="e.g. — Nadhif Alfasya  or  — Client Name, Company"
        disabled={isPending}
      />

      <FormFeedback success={state.success} error={state.error} />
      <Button type="submit" id="testimonial-save" isLoading={isPending}>Save Testimonial</Button>
    </form>
  );
}
