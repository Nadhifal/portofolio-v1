"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ─── Auth ──────────────────────────────────────────────────────────────────

export type ActionState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function signIn(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) return { error: "Email dan password wajib diisi." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  redirect("/admin/hero");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ─── Hero ──────────────────────────────────────────────────────────────────

const HeroSchema = z.object({
  id: z.string().optional(),
  eyebrow: z.string().min(1),
  title_plain: z.string().min(1),
  title_highlight: z.string().min(1),
  description: z.string().min(1),
  button_text: z.string().min(1),
});

export async function upsertHero(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = HeroSchema.safeParse(raw);
  if (!parsed.success) return { error: "Validasi gagal. Periksa semua field." };

  const supabase = await createClient();
  const { id, ...data } = parsed.data;
  const { error } = id
    ? await supabase.from("hero_content").update(data).eq("id", id)
    : await supabase.from("hero_content").insert(data);

  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ─── About ─────────────────────────────────────────────────────────────────

export async function upsertAbout(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = formData.get("id") as string | null;
  const data = {
    eyebrow: formData.get("eyebrow") as string,
    name: formData.get("name") as string,
    lead: formData.get("lead") as string,
    edu_meta: formData.get("edu_meta") as string,
    paragraph: formData.get("paragraph") as string,
    signature: formData.get("signature") as string,
    photo_url: formData.get("photo_url") as string || null,
  };

  const supabase = await createClient();
  const { error } = id
    ? await supabase.from("about_content").update(data).eq("id", id)
    : await supabase.from("about_content").insert(data);

  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ─── Skills ────────────────────────────────────────────────────────────────

const SkillSchema = z.object({
  icon: z.string().min(1),
  label: z.string().min(1),
  level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
  percent: z.coerce.number().min(0).max(100),
  sort_order: z.coerce.number().default(0),
});

export async function createSkill(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = SkillSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: "Validasi gagal." };

  const supabase = await createClient();
  const { error } = await supabase.from("skills").insert(parsed.data);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}

export async function updateSkill(
  id: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = SkillSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: "Validasi gagal." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("skills")
    .update(parsed.data)
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}

export async function deleteSkill(id: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("skills").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

// ─── Portfolio Categories ──────────────────────────────────────────────────

export async function createCategory(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const label = formData.get("label") as string;
  const slug = label.toLowerCase().replace(/\s+/g, "-");
  const sort_order = Number(formData.get("sort_order") ?? 0);
  if (!label) return { error: "Label wajib diisi." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("portfolio_categories")
    .insert({ label, slug, sort_order });
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
  return { success: true };
}

export async function deleteCategory(id: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("portfolio_categories").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
}

// ─── Portfolio Projects ────────────────────────────────────────────────────

const ProjectSchema = z.object({
  category_id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  role: z.string().optional(),
  content: z.string().optional(),
  icon: z.string().default("ti-code"),
  plate_label: z.string().optional(),
  live_url: z.string().url().optional().or(z.literal("")),
  repo_url: z.string().url().optional().or(z.literal("")),
  image_url: z.string().url().optional().or(z.literal("")),
  sort_order: z.coerce.number().default(0),
});

export async function createProject(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const techRaw = formData.get("tech") as string;
  const tech = techRaw
    ? techRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const parsed = ProjectSchema.safeParse(raw);
  if (!parsed.success) return { error: "Validasi gagal. Periksa semua field." };

  const data = {
    ...parsed.data,
    tech,
    live_url: parsed.data.live_url || null,
    repo_url: parsed.data.repo_url || null,
    image_url: parsed.data.image_url || null,
  };

  const supabase = await createClient();
  const { error } = await supabase.from("portfolio_projects").insert(data);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
  return { success: true };
}

export async function updateProject(
  id: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const techRaw = formData.get("tech") as string;
  const tech = techRaw
    ? techRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const parsed = ProjectSchema.safeParse(raw);
  if (!parsed.success) return { error: "Validasi gagal." };

  const data = {
    ...parsed.data,
    tech,
    live_url: parsed.data.live_url || null,
    repo_url: parsed.data.repo_url || null,
    image_url: parsed.data.image_url || null,
  };

  const supabase = await createClient();
  const { error } = await supabase
    .from("portfolio_projects")
    .update(data)
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
  return { success: true };
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("portfolio_projects").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
}

// ─── Experience ────────────────────────────────────────────────────────────

const ExperienceSchema = z.object({
  year_label: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  sort_order: z.coerce.number().default(0),
});

export async function createExperience(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = ExperienceSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!parsed.success) return { error: "Validasi gagal." };

  const supabase = await createClient();
  const { error } = await supabase.from("experience").insert(parsed.data);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/experience");
  return { success: true };
}

export async function updateExperience(
  id: string,
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = ExperienceSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!parsed.success) return { error: "Validasi gagal." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("experience")
    .update(parsed.data)
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/experience");
  return { success: true };
}

export async function deleteExperience(id: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("experience").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin/experience");
}

// ─── Testimonial ───────────────────────────────────────────────────────────

export async function upsertTestimonial(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = formData.get("id") as string | null;
  const data = {
    quote: formData.get("quote") as string,
    cite: formData.get("cite") as string,
  };

  const supabase = await createClient();
  const { error } = id
    ? await supabase.from("testimonial").update(data).eq("id", id)
    : await supabase.from("testimonial").insert(data);

  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ─── Contact Info ──────────────────────────────────────────────────────────

export async function upsertContactInfo(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = formData.get("id") as string | null;
  const data = {
    email: formData.get("email") as string || null,
    phone: formData.get("phone") as string || null,
    location: formData.get("location") as string || null,
    linkedin_url: formData.get("linkedin_url") as string || null,
    github_url: formData.get("github_url") as string || null,
  };

  const supabase = await createClient();
  const { error } = id
    ? await supabase.from("contact_info").update(data).eq("id", id)
    : await supabase.from("contact_info").insert(data);

  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

// ─── Messages ──────────────────────────────────────────────────────────────

export async function markMessageRead(id: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from("contact_messages").delete().eq("id", id);
  revalidatePath("/admin/messages");
}
