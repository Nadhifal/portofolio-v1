import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader, AdminFormCard } from "@/components/admin/AdminUI";
import HeroForm from "@/components/admin/forms/HeroForm";

export default async function AdminHeroPage() {
  let data = null;
  try {
    const supabase = await createClient();
    const { data: row } = await supabase.from("hero_content").select("*").single();
    if (row) data = row;
  } catch { /* no row yet */ }

  return (
    <>
      <AdminPageHeader
        title="Hero Section"
        description="The first thing visitors see — eyebrow, title, description, and CTA button."
      />
      <AdminFormCard>
        <HeroForm data={data} />
      </AdminFormCard>
    </>
  );
}
