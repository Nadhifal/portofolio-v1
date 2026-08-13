import { createClient } from "@/lib/supabase/server";
import { getIcon } from "@/lib/icons";
import type { ContactInfo } from "@/lib/types";

const FALLBACK: ContactInfo = {
  id: "fallback",
  email: "naddhfal@gmail.com",
  phone: "0852-8784-9912",
  location: "Serang, Banten",
  linkedin_url: "#",
  github_url: "#",
};

export default async function Footer() {
  const year = new Date().getFullYear();
  let info: ContactInfo = FALLBACK;

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("contact_info").select("*").single();
    if (data) info = data;
  } catch {
    // Use fallback silently
  }

  const IconLinkedin = getIcon("ti-brand-linkedin");
  const IconGithub = getIcon("ti-brand-github");
  const IconMail = getIcon("ti-mail");

  return (
    <footer
      id="footer"
      style={{
        padding: "50px 32px 60px",
        textAlign: "center",
      }}
    >
      <div
        className="foot-icons"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginBottom: "22px",
          fontSize: "16px",
          fontVariant: "small-caps",
          letterSpacing: "0.04em",
          color: "var(--text-secondary)",
        }}
      >
        {info.linkedin_url && info.linkedin_url !== "#" && (
          <a
            href={info.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-gold-text"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", transition: "color .25s ease" }}
          >
            <IconLinkedin size={16} /> LinkedIn
          </a>
        )}
        {info.github_url && info.github_url !== "#" && (
          <a
            href={info.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-gold-text"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", transition: "color .25s ease" }}
          >
            <IconGithub size={16} /> GitHub
          </a>
        )}
        {info.email && (
          <a
            href={`mailto:${info.email}`}
            className="hover-gold-text"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", transition: "color .25s ease" }}
          >
            <IconMail size={16} /> Email
          </a>
        )}
      </div>

      <div
        className="fine"
        style={{
          fontSize: "13px",
          color: "var(--text-muted)",
        }}
      >
        © {year} Nadhif Alfasya. All rights reserved.
      </div>
    </footer>
  );
}
