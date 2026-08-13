import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminUI";
import PortfolioManager from "@/components/admin/PortfolioManager";

export const metadata = { title: "Admin - Portfolio" };

export default async function AdminPortfolioPage() {
  let categories: any[] = [];
  let projects: any[] = [];
  try {
    const supabase = await createClient();
    const [cat, proj] = await Promise.all([
      supabase.from("portfolio_categories").select("*").order("sort_order"),
      supabase.from("portfolio_projects").select("*").order("sort_order"),
    ]);
    if (cat.data) categories = cat.data;
    if (proj.data) projects = proj.data;
  } catch { /* fallback */ }

  return (
    <>
      <AdminPageHeader
        title="Portfolio"
        description="Manage categories and projects. Tech stack: comma-separated values."
      />
      <PortfolioManager categories={categories} projects={projects} />
    </>
  );
}
