import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin — Nadhif Alfasya",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not authenticated (login page) — render without sidebar
  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg-0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {children}
      </div>
    );
  }

  // Authenticated — render admin shell with sidebar
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        background: "var(--bg-0)",
      }}
      className="admin-shell"
    >
      <AdminSidebar email={user.email ?? "Admin"} />
      <main
        style={{
          minHeight: "100vh",
          borderLeft: "1px solid var(--line)",
          overflowY: "auto",
        }}
      >
        {children}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-shell {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
