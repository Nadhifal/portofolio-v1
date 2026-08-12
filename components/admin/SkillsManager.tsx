"use client";

import { useActionState } from "react";
import { createSkill, deleteSkill, type ActionState } from "@/app/admin/actions";
import { Input, Select, Button } from "@/components/ui";
import { FormFeedback } from "@/components/admin/AdminUI";
import { getIcon, getIconOptions } from "@/lib/icons";
import type { Skill } from "@/lib/types";

interface Props { skills: Skill[] }
const initial: ActionState = {};

const LEVEL_OPTIONS = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
  { value: "Expert", label: "Expert" },
];

export default function SkillsManager({ skills }: Props) {
  const [addState, addAction, isPending] = useActionState(createSkill, initial);

  return (
    <div style={{ padding: "32px" }}>
      {/* Existing skills list */}
      <div style={{ marginBottom: "40px" }}>
        <p
          style={{
            fontFamily: "var(--font-eb-garamond), serif",
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: "14px",
          }}
        >
          Current Skills ({skills.length})
        </p>

        {skills.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontStyle: "italic", fontFamily: "var(--font-eb-garamond), serif" }}>
            No skills yet. Add one below.
          </p>
        ) : (
          <div style={{ border: "1px solid var(--line)", overflow: "hidden" }}>
            {skills.map((skill, i) => {
              const Icon = getIcon(skill.icon);
              return (
                <div
                  key={skill.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    borderBottom: i < skills.length - 1 ? "1px solid var(--line)" : "none",
                    background: "var(--bg-1)",
                  }}
                >
                  <Icon size={16} style={{ color: "var(--gold-dim)", flexShrink: 0 }} />
                  <span style={{ flex: 1, fontFamily: "var(--font-eb-garamond), serif", fontSize: "15px", color: "var(--text-primary)" }}>
                    {skill.label}
                  </span>
                  <span style={{ fontFamily: "var(--font-eb-garamond), serif", fontSize: "13px", color: "var(--text-muted)" }}>
                    {skill.level} · {skill.percent}%
                  </span>
                  <DeleteSkillButton id={skill.id} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add new skill */}
      <div style={{ border: "1px solid var(--line)", padding: "24px", background: "var(--bg-1)" }}>
        <p
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "18px",
            color: "var(--text-primary)",
            marginBottom: "20px",
          }}
        >
          Add New Skill
        </p>

        <form action={addAction} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <Input label="Label" id="skill-label" name="label" required placeholder="React / Next.js" disabled={isPending} />
            <Select
              label="Icon"
              id="skill-icon"
              name="icon"
              options={getIconOptions()}
              disabled={isPending}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
            <Select
              label="Level"
              id="skill-level"
              name="level"
              options={LEVEL_OPTIONS}
              disabled={isPending}
            />
            <Input label="Percent (0–100)" id="skill-percent" name="percent" type="number" min="0" max="100" defaultValue="80" required disabled={isPending} />
            <Input label="Sort Order" id="skill-sort" name="sort_order" type="number" defaultValue="0" disabled={isPending} />
          </div>

          <FormFeedback success={addState.success} error={addState.error} />
          <Button type="submit" id="skill-add" size="sm" isLoading={isPending}>Add Skill</Button>
        </form>
      </div>
    </div>
  );
}

function DeleteSkillButton({ id }: { id: string }) {
  const deleteBound = deleteSkill.bind(null, id);

  return (
    <form action={deleteBound}>
      <button
        type="submit"
        id={`skill-delete-${id}`}
        style={{
          background: "none",
          border: "1px solid #4a2a24",
          color: "#c96b5c",
          fontFamily: "var(--font-eb-garamond), serif",
          fontSize: "11px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "4px 10px",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onClick={(e) => {
          if (!confirm("Hapus skill ini?")) e.preventDefault();
        }}
      >
        Delete
      </button>
    </form>
  );
}
