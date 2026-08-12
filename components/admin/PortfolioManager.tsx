"use client";

import { useActionState } from "react";
import {
  createProject,
  deleteProject,
  createCategory,
  deleteCategory,
  type ActionState,
} from "@/app/admin/actions";
import { Input, Textarea, Select, Button } from "@/components/ui";
import { FormFeedback } from "@/components/admin/AdminUI";
import { getIconOptions } from "@/lib/icons";
import type { PortfolioCategory, PortfolioProject } from "@/lib/types";

interface Props {
  categories: PortfolioCategory[];
  projects: PortfolioProject[];
}

const initial: ActionState = {};

export default function PortfolioManager({ categories, projects }: Props) {
  const [projState, projAction, projPending] = useActionState(createProject, initial);
  const [catState, catAction, catPending] = useActionState(createCategory, initial);

  const catOptions = categories.map((c) => ({ value: c.id, label: c.label }));

  return (
    <div style={{ padding: "32px" }}>
      {/* Categories */}
      <section style={{ marginBottom: "40px" }}>
        <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "20px", color: "var(--text-primary)", marginBottom: "16px" }}>
          Categories
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
          {categories.map((cat) => (
            <CategoryPill key={cat.id} category={cat} />
          ))}
        </div>

        <form action={catAction} style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
          <Input label="New Category" id="cat-label" name="label" placeholder="e.g. Mobile App" style={{ flex: 1 }} disabled={catPending} />
          <Input label="Sort Order" id="cat-sort" name="sort_order" type="number" defaultValue="0" style={{ width: "100px" }} disabled={catPending} />
          <Button type="submit" size="sm" id="cat-add" isLoading={catPending} style={{ whiteSpace: "nowrap" }}>Add</Button>
        </form>
        <FormFeedback success={catState.success} error={catState.error} />
      </section>

      {/* Projects list */}
      <section style={{ marginBottom: "40px" }}>
        <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "20px", color: "var(--text-primary)", marginBottom: "16px" }}>
          Projects ({projects.length})
        </p>

        {projects.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontStyle: "italic", fontFamily: "var(--font-eb-garamond), serif" }}>No projects yet.</p>
        ) : (
          <div style={{ border: "1px solid var(--line)", overflow: "hidden" }}>
            {projects.map((p, i) => (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderBottom: i < projects.length - 1 ? "1px solid var(--line)" : "none",
                  background: "var(--bg-1)",
                }}
              >
                <span style={{ flex: 1 }}>
                  <span style={{ fontFamily: "var(--font-eb-garamond), serif", fontSize: "15px", color: "var(--text-primary)", display: "block" }}>
                    {p.title}
                  </span>
                  <span style={{ fontFamily: "var(--font-eb-garamond), serif", fontSize: "12px", color: "var(--text-muted)" }}>
                    /{p.slug} · {p.role}
                  </span>
                </span>
                <DeleteProjectButton id={p.id} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add new project */}
      <section>
        <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "20px", color: "var(--text-primary)", marginBottom: "20px" }}>
          Add New Project
        </p>

        <div style={{ border: "1px solid var(--line)", padding: "24px", background: "var(--bg-1)" }}>
          <form action={projAction} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <Input label="Title" id="proj-title" name="title" required disabled={projPending} />
              <Input label="Slug (URL)" id="proj-slug" name="slug" required placeholder="my-project" disabled={projPending} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
              <Select label="Category" id="proj-category" name="category_id" options={catOptions} placeholder="Select category" disabled={projPending} />
              <Select label="Icon" id="proj-icon" name="icon" options={getIconOptions()} disabled={projPending} />
              <Input label="Plate Label" id="proj-plate" name="plate_label" placeholder="Plate I" disabled={projPending} />
            </div>
            <Textarea label="Description (short)" id="proj-desc" name="description" rows={2} disabled={projPending} />
            <Input label="Role" id="proj-role" name="role" placeholder="Lead Developer · LIDM 2026" disabled={projPending} />
            <Textarea label="Content (case study)" id="proj-content" name="content" rows={5} disabled={projPending} />
            <Input
              label="Tech Stack (comma-separated)"
              id="proj-tech"
              name="tech"
              placeholder="Next.js, React, Tailwind CSS"
              hint="Separate each technology with a comma"
              disabled={projPending}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
              <Input label="Live URL" id="proj-live" name="live_url" type="url" disabled={projPending} />
              <Input label="Repo URL" id="proj-repo" name="repo_url" type="url" disabled={projPending} />
              <Input label="Sort Order" id="proj-sort" name="sort_order" type="number" defaultValue="0" disabled={projPending} />
            </div>

            <FormFeedback success={projState.success} error={projState.error} />
            <Button type="submit" id="proj-add" isLoading={projPending}>Add Project</Button>
          </form>
        </div>
      </section>
    </div>
  );
}

function CategoryPill({ category }: { category: PortfolioCategory }) {
  const deleteBound = deleteCategory.bind(null, category.id);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0", border: "1px solid var(--line-strong)" }}>
      <span style={{ padding: "4px 12px", fontFamily: "var(--font-eb-garamond), serif", fontSize: "13px", color: "var(--text-secondary)" }}>
        {category.label}
      </span>
      <form action={deleteBound}>
        <button
          type="submit"
          style={{ background: "none", border: "none", borderLeft: "1px solid var(--line-strong)", color: "#c96b5c", padding: "4px 8px", cursor: "pointer", fontSize: "12px" }}
          onClick={(e) => { if (!confirm(`Hapus kategori "${category.label}"?`)) e.preventDefault(); }}
        >
          ×
        </button>
      </form>
    </div>
  );
}

function DeleteProjectButton({ id }: { id: string }) {
  const deleteBound = deleteProject.bind(null, id);
  return (
    <form action={deleteBound}>
      <button
        type="submit"
        id={`proj-delete-${id}`}
        style={{ background: "none", border: "1px solid #4a2a24", color: "#c96b5c", fontFamily: "var(--font-eb-garamond), serif", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", cursor: "pointer" }}
        onClick={(e) => { if (!confirm("Hapus project ini?")) e.preventDefault(); }}
      >
        Delete
      </button>
    </form>
  );
}
