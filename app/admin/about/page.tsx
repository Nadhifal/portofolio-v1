import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader, AdminFormCard } from "@/components/admin/AdminUI";
import AboutForm from "@/components/admin/forms/AboutForm";

export const metadata = { title: "Admin - About" };

export default async function AdminAboutPage() {
  let data = null;
  try {
    const supabase = await createClient();
    const { data: row } = await supabase.from("about_content").select("*").single();
    if (row) data = row;
  } catch { /* no row yet */ }

  return (
    <>
      <AdminPageHeader title="About Section" description="Photo, lead paragraph, education card, and signature." />
      <AdminFormCard>
        <AboutForm data={data} />
      </AdminFormCard>
    </>
  );
}
