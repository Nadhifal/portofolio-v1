import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminUI";
import ExperienceManager from "@/components/admin/ExperienceManager";

export const metadata = { title: "Admin - Experience" };

export default async function AdminExperiencePage() {
  let items: any[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("experience").select("*").order("sort_order");
    if (data) items = data;
  } catch { /* fallback */ }

  return (
    <>
      <AdminPageHeader title="Experience" description="Timeline items shown on the public page. Sorted by sort_order." />
      <ExperienceManager items={items} />
    </>
  );
}
