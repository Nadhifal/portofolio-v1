"use client";

import { useActionState } from "react";
import { upsertHero, type ActionState } from "@/app/admin/actions";
import { Input, Textarea, Button } from "@/components/ui";
import { FormFeedback } from "@/components/admin/AdminUI";
import type { HeroContent } from "@/lib/types";

interface Props {
  data: HeroContent | null;
}

const initial: ActionState = {};

export default function HeroForm({ data }: Props) {
  const [state, formAction, isPending] = useActionState(upsertHero, initial);

  return (
    <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {data?.id && <input type="hidden" name="id" value={data.id} />}

      <Input
        label="Eyebrow"
        id="hero-eyebrow"
        name="eyebrow"
        defaultValue={data?.eyebrow ?? ""}
        required
        hint="Small text above the title, e.g. 'Informatics Student & Full-Stack Developer'"
        disabled={isPending}
      />
      <Input
        label="Title — Plain Part"
        id="hero-title-plain"
        name="title_plain"
        defaultValue={data?.title_plain ?? ""}
        required
        hint="e.g. 'Building products that'"
        disabled={isPending}
      />
      <Input
        label="Title — Highlighted Part (italic gold)"
        id="hero-title-highlight"
        name="title_highlight"
        defaultValue={data?.title_highlight ?? ""}
        required
        hint="e.g. 'work end to end'"
        disabled={isPending}
      />
      <Textarea
        label="Description"
        id="hero-description"
        name="description"
        defaultValue={data?.description ?? ""}
        rows={3}
        required
        disabled={isPending}
      />
      <Input
        label="Button Text"
        id="hero-button-text"
        name="button_text"
        defaultValue={data?.button_text ?? "View Projects"}
        required
        disabled={isPending}
      />

      <FormFeedback success={state.success} error={state.error} />

      <Button type="submit" id="hero-save" isLoading={isPending}>
        Save Hero Content
      </Button>
    </form>
  );
}
