import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminUI";
import SkillsManager from "@/components/admin/SkillsManager";

export default async function AdminSkillsPage() {
  let skills: any[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("skills").select("*").order("sort_order");
    if (data) skills = data;
  } catch { /* fallback to empty */ }

  return (
    <>
      <AdminPageHeader title="Skills" description="Technical proficiency with progress bars. Sorted by sort_order." />
      <SkillsManager skills={skills} />
    </>
  );
}
