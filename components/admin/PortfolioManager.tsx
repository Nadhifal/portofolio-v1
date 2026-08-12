"use client";

import { useActionState, useState } from "react";
import {
  createProject,
  updateProject,
  deleteProject,
  createCategory,
  deleteCategory,
  type ActionState,
} from "@/app/admin/actions";
import { Input, Textarea, Select, Button } from "@/components/ui";
import { FormFeedback } from "@/components/admin/AdminUI";
import { getIconOptions } from "@/lib/icons";
import { createClient } from "@/lib/supabase/client";
import type { PortfolioCategory, PortfolioProject } from "@/lib/types";

interface Props {
  categories: PortfolioCategory[];
  projects: PortfolioProject[];
}

const initial: ActionState = {};

export default function PortfolioManager({ categories, projects }: Props) {
  const [projState, projAction, projPending] = useActionState(createProject, initial);
  const [catState, catAction, catPending] = useActionState(createCategory, initial);
  
  // State untuk Edit mode
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  
  // State untuk update action
  const updateProjectWithId = editingProject ? updateProject.bind(null, editingProject.id) : createProject;
  const [editState, editAction, editPending] = useActionState(updateProjectWithId, initial);

  // State untuk upload image project
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const catOptions = categories.map((c) => ({ value: c.id, label: c.label }));

  const handleEditClick = (project: PortfolioProject) => {
    setEditingProject(project);
    setImageUrl(project.image_url ?? "");
    
    // Scroll to form
    const formSection = document.getElementById("project-form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setImageUrl("");
    setUploadError("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Format file harus berupa gambar.");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setUploadError("Ukuran gambar maksimal 3MB.");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `project-${Date.now()}.${fileExt}`;

      const { error: uploadErr } = await supabase.storage
        .from("portfolio")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadErr) throw new Error(uploadErr.message);

      const { data: { publicUrl } } = supabase.storage
        .from("portfolio")
        .getPublicUrl(fileName);

      setImageUrl(publicUrl);
    } catch (err: any) {
      setUploadError(err.message || "Gagal mengunggah gambar.");
    } finally {
      setIsUploading(false);
    }
  };

  const activeFormAction = editingProject ? editAction : projAction;
  const isFormPending = editingProject ? editPending : projPending;
  const activeFeedback = editingProject ? editState : projState;

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
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt=""
                    style={{ width: "40px", height: "40px", objectFit: "cover", border: "1px solid var(--line-strong)" }}
                  />
                )}
                <span style={{ flex: 1 }}>
                  <span style={{ fontFamily: "var(--font-eb-garamond), serif", fontSize: "15px", color: "var(--text-primary)", display: "block" }}>
                    {p.title}
                  </span>
                  <span style={{ fontFamily: "var(--font-eb-garamond), serif", fontSize: "12px", color: "var(--text-muted)" }}>
                    /{p.slug} · {p.role}
                  </span>
                </span>
                
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    type="button"
                    onClick={() => handleEditClick(p)}
                    style={{
                      background: "none",
                      border: "1px solid var(--gold-dim)",
                      color: "var(--gold)",
                      fontFamily: "var(--font-eb-garamond), serif",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <DeleteProjectButton id={p.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add / Edit Project Form */}
      <section id="project-form-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "20px", color: "var(--text-primary)", margin: 0 }}>
            {editingProject ? `Edit Project: ${editingProject.title}` : "Add New Project"}
          </p>
          {editingProject && (
            <button
              type="button"
              onClick={handleCancelEdit}
              style={{
                background: "none",
                border: "1px solid var(--line-strong)",
                color: "var(--text-muted)",
                fontFamily: "var(--font-eb-garamond), serif",
                fontSize: "12px",
                padding: "4px 12px",
                cursor: "pointer",
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div style={{ border: "1px solid var(--line)", padding: "24px", background: "var(--bg-1)" }}>
          <form action={activeFormAction} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <Input
                label="Title"
                id="proj-title"
                name="title"
                key={editingProject ? `title-${editingProject.id}` : "title-new"}
                defaultValue={editingProject?.title ?? ""}
                required
                disabled={isFormPending}
              />
              <Input
                label="Slug (URL)"
                id="proj-slug"
                name="slug"
                key={editingProject ? `slug-${editingProject.id}` : "slug-new"}
                defaultValue={editingProject?.slug ?? ""}
                required
                placeholder="my-project"
                disabled={isFormPending}
              />
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
              <Select
                label="Category"
                id="proj-category"
                name="category_id"
                key={editingProject ? `cat-${editingProject.id}` : "cat-new"}
                defaultValue={editingProject?.category_id ?? ""}
                options={catOptions}
                placeholder="Select category"
                disabled={isFormPending}
              />
              <Select
                label="Icon"
                id="proj-icon"
                name="icon"
                key={editingProject ? `icon-${editingProject.id}` : "icon-new"}
                defaultValue={editingProject?.icon ?? "ti-code"}
                options={getIconOptions()}
                disabled={isFormPending}
              />
              <Input
                label="Plate Label"
                id="proj-plate"
                name="plate_label"
                key={editingProject ? `plate-${editingProject.id}` : "plate-new"}
                defaultValue={editingProject?.plate_label ?? ""}
                placeholder="Plate I"
                disabled={isFormPending}
              />
            </div>

            <Textarea
              label="Description (short)"
              id="proj-desc"
              name="description"
              key={editingProject ? `desc-${editingProject.id}` : "desc-new"}
              defaultValue={editingProject?.description ?? ""}
              rows={2}
              disabled={isFormPending}
            />
            
            <Input
              label="Role"
              id="proj-role"
              name="role"
              key={editingProject ? `role-${editingProject.id}` : "role-new"}
              defaultValue={editingProject?.role ?? ""}
              placeholder="Lead Developer · LIDM 2026"
              disabled={isFormPending}
            />

            <Textarea
              label="Content (case study)"
              id="proj-content"
              name="content"
              key={editingProject ? `content-${editingProject.id}` : "content-new"}
              defaultValue={editingProject?.content ?? ""}
              rows={5}
              disabled={isFormPending}
            />

            <Input
              label="Tech Stack (comma-separated)"
              id="proj-tech"
              name="tech"
              key={editingProject ? `tech-${editingProject.id}` : "tech-new"}
              defaultValue={editingProject?.tech ? editingProject.tech.join(", ") : ""}
              placeholder="Next.js, React, Tailwind CSS"
              hint="Separate each technology with a comma"
              disabled={isFormPending}
            />

            {/* Project Image Upload */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", margin: "10px 0" }}>
              <label
                style={{
                  fontFamily: "var(--font-eb-garamond), serif",
                  fontSize: "13px",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                }}
              >
                Project Image / Banner (Supabase Storage)
              </label>

              {imageUrl && (
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "10px" }}>
                  <img
                    src={imageUrl}
                    alt=""
                    style={{
                      width: "160px",
                      height: "100px",
                      objectFit: "cover",
                      border: "1px solid var(--line-strong)",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
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
                    Remove Image
                  </button>
                </div>
              )}

              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading || isFormPending}
                  style={{
                    fontFamily: "var(--font-eb-garamond), serif",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                  }}
                />
                {isUploading && (
                  <span style={{ fontFamily: "var(--font-eb-garamond), serif", fontSize: "13px", color: "var(--gold)" }}>
                    Uploading...
                  </span>
                )}
              </div>

              {uploadError && (
                <span style={{ fontFamily: "var(--font-eb-garamond), serif", fontSize: "13px", color: "#c96b5c" }}>
                  {uploadError}
                </span>
              )}

              <input type="hidden" name="image_url" value={imageUrl} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
              <Input
                label="Live URL"
                id="proj-live"
                name="live_url"
                key={editingProject ? `live-${editingProject.id}` : "live-new"}
                defaultValue={editingProject?.live_url ?? ""}
                type="url"
                disabled={isFormPending}
              />
              <Input
                label="Repo URL"
                id="proj-repo"
                name="repo_url"
                key={editingProject ? `repo-${editingProject.id}` : "repo-new"}
                defaultValue={editingProject?.repo_url ?? ""}
                type="url"
                disabled={isFormPending}
              />
              <Input
                label="Sort Order"
                id="proj-sort"
                name="sort_order"
                key={editingProject ? `sort-${editingProject.id}` : "sort-new"}
                defaultValue={editingProject?.sort_order ?? 0}
                type="number"
                disabled={isFormPending}
              />
            </div>

            <FormFeedback success={activeFeedback.success} error={activeFeedback.error} />
            
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Button type="submit" id="proj-save" isLoading={isFormPending} style={{ flex: 1 }}>
                {editingProject ? "Update Project" : "Add Project"}
              </Button>
              {editingProject && (
                <Button type="button" variant="ghost" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
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
