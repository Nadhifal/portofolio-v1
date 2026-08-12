import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader, AdminFormCard } from "@/components/admin/AdminUI";
import ContactInfoForm from "@/components/admin/forms/ContactInfoForm";

export default async function AdminContactPage() {
  let data = null;
  try {
    const supabase = await createClient();
    const { data: row } = await supabase.from("contact_info").select("*").single();
    if (row) data = row;
  } catch { /* no row yet */ }

  return (
    <>
      <AdminPageHeader title="Contact Info" description="Email, phone, location, and social media links shown in the Contact section." />
      <AdminFormCard>
        <ContactInfoForm data={data} />
      </AdminFormCard>
    </>
  );
}
