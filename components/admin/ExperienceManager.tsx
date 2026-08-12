"use client";

import { useActionState } from "react";
import { createExperience, deleteExperience, type ActionState } from "@/app/admin/actions";
import { Input, Textarea, Button } from "@/components/ui";
import { FormFeedback } from "@/components/admin/AdminUI";
import type { Experience } from "@/lib/types";

interface Props { items: Experience[] }
const initial: ActionState = {};

export default function ExperienceManager({ items }: Props) {
  const [state, formAction, isPending] = useActionState(createExperience, initial);

  return (
    <div style={{ padding: "32px" }}>
      {/* Existing items */}
      <div style={{ marginBottom: "40px" }}>
        <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "20px", color: "var(--text-primary)", marginBottom: "16px" }}>
          Timeline Items ({items.length})
        </p>

        {items.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontStyle: "italic", fontFamily: "var(--font-eb-garamond), serif" }}>No items yet.</p>
        ) : (
          <div style={{ border: "1px solid var(--line)", overflow: "hidden" }}>
            {items.map((item, i) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "14px 16px",
                  borderBottom: i < items.length - 1 ? "1px solid var(--line)" : "none",
                  background: "var(--bg-1)",
                }}
              >
                <span style={{ minWidth: "140px", fontFamily: "var(--font-eb-garamond), serif", fontSize: "12px", color: "var(--text-muted)" }}>
                  {item.year_label}
                </span>
                <span style={{ flex: 1 }}>
                  <span style={{ fontFamily: "var(--font-eb-garamond), serif", fontSize: "15px", color: "var(--text-primary)", display: "block" }}>
                    {item.title}
                  </span>
                  {item.description && (
                    <span style={{ fontFamily: "var(--font-eb-garamond), serif", fontSize: "13px", color: "var(--text-muted)" }}>
                      {item.description}
                    </span>
                  )}
                </span>
                <DeleteExperienceButton id={item.id} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add new */}
      <div style={{ border: "1px solid var(--line)", padding: "24px", background: "var(--bg-1)" }}>
        <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "18px", color: "var(--text-primary)", marginBottom: "18px" }}>
          Add New Item
        </p>

        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <Input label="Year / Period" id="exp-year" name="year_label" required placeholder="April 2026 — Present" disabled={isPending} />
            <Input label="Sort Order" id="exp-sort" name="sort_order" type="number" defaultValue="0" disabled={isPending} />
          </div>
          <Input label="Title" id="exp-title" name="title" required placeholder="Staff, AI Division — Untirta Digital Creative" disabled={isPending} />
          <Textarea label="Description" id="exp-desc" name="description" rows={3} disabled={isPending} />

          <FormFeedback success={state.success} error={state.error} />
          <Button type="submit" id="exp-add" size="sm" isLoading={isPending}>Add Item</Button>
        </form>
      </div>
    </div>
  );
}

function DeleteExperienceButton({ id }: { id: string }) {
  const deleteBound = deleteExperience.bind(null, id);
  return (
    <form action={deleteBound}>
      <button
        type="submit"
        id={`exp-delete-${id}`}
        style={{ background: "none", border: "1px solid #4a2a24", color: "#c96b5c", fontFamily: "var(--font-eb-garamond), serif", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", cursor: "pointer" }}
        onClick={(e) => { if (!confirm("Hapus item ini?")) e.preventDefault(); }}
      >
        Delete
      </button>
    </form>
  );
}
