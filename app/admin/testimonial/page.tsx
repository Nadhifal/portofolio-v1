import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader, AdminFormCard } from "@/components/admin/AdminUI";
import TestimonialForm from "@/components/admin/forms/TestimonialForm";

export default async function AdminTestimonialPage() {
  let data = null;
  try {
    const supabase = await createClient();
    const { data: row } = await supabase.from("testimonial").select("*").single();
    if (row) data = row;
  } catch { /* no row yet */ }

  return (
    <>
      <AdminPageHeader title="Testimonial" description="Featured quote shown in the testimonial section of the public page." />
      <AdminFormCard>
        <TestimonialForm data={data} />
      </AdminFormCard>
    </>
  );
}
