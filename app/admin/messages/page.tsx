import { createClient } from "@/lib/supabase/server";
import { AdminPageHeader } from "@/components/admin/AdminUI";
import { markMessageRead, deleteMessage } from "@/app/admin/actions";
import type { ContactMessage } from "@/lib/types";

export default async function AdminMessagesPage() {
  let messages: ContactMessage[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) messages = data;
  } catch { /* fallback */ }

  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <>
      <AdminPageHeader
        title={`Messages ${unread > 0 ? `(${unread} unread)` : ""}`}
        description="Contact form submissions from the public page."
      />

      <div style={{ padding: "32px" }}>
        {messages.length === 0 ? (
          <p style={{ fontFamily: "var(--font-eb-garamond), serif", color: "var(--text-muted)", fontStyle: "italic" }}>
            No messages yet.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--line)" }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  background: msg.is_read ? "var(--bg-1)" : "var(--bg-0)",
                  padding: "20px 24px",
                  borderLeft: `3px solid ${msg.is_read ? "transparent" : "var(--gold)"}`,
                }}
              >
                {/* Header row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <div>
                    <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "18px", color: "var(--text-primary)" }}>
                      {msg.name}
                    </span>
                    <span style={{ marginLeft: "12px", fontFamily: "var(--font-eb-garamond), serif", fontSize: "14px", color: "var(--text-muted)" }}>
                      <a href={`mailto:${msg.email}`} style={{ color: "inherit" }}>{msg.email}</a>
                    </span>
                    {!msg.is_read && (
                      <span style={{ marginLeft: "8px", fontFamily: "var(--font-eb-garamond), serif", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gold)", border: "1px solid var(--gold-dim)", padding: "1px 6px" }}>
                        New
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-eb-garamond), serif", fontSize: "12px", color: "var(--text-muted)" }}>
                      {new Date(msg.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>

                    {!msg.is_read && (
                      <form action={markMessageRead.bind(null, msg.id)}>
                        <button
                          type="submit"
                          id={`msg-read-${msg.id}`}
                          style={{ background: "none", border: "1px solid var(--line-strong)", color: "var(--text-muted)", fontFamily: "var(--font-eb-garamond), serif", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 10px", cursor: "pointer" }}
                        >
                          Mark Read
                        </button>
                      </form>
                    )}

                    <form action={deleteMessage.bind(null, msg.id)}>
                      <button
                        type="submit"
                        id={`msg-delete-${msg.id}`}
                        style={{ background: "none", border: "1px solid #4a2a24", color: "#c96b5c", fontFamily: "var(--font-eb-garamond), serif", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 10px", cursor: "pointer" }}
                        onClick={(e) => { if (!confirm("Hapus pesan ini?")) e.preventDefault(); }}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>

                {/* Message body */}
                <p style={{ fontFamily: "var(--font-eb-garamond), serif", fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap" }}>
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
