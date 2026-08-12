import { createClient } from "@/lib/supabase/server";
import { SectionHeading } from "@/components/ui";
import { getIcon } from "@/lib/icons";
import ContactForm from "@/components/public/ContactForm";
import type { ContactInfo } from "@/lib/types";

const FALLBACK: ContactInfo = {
  id: "fallback",
  email: "naddhfal@gmail.com",
  phone: "0852-8784-9912",
  location: "Serang, Banten",
  linkedin_url: "#",
  github_url: "#",
};

export default async function Contact() {
  let info: ContactInfo = FALLBACK;

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("contact_info").select("*").single();
    if (data) info = data;
  } catch {
    // Use fallback silently
  }

  const IconMail = getIcon("ti-mail");
  const IconPhone = getIcon("ti-phone");
  const IconMapPin = getIcon("ti-map-pin");
  const IconLinkedin = getIcon("ti-brand-linkedin");
  const IconGithub = getIcon("ti-brand-github");

  return (
    <section
      id="contact"
      aria-label="Contact"
      style={{
        padding: "96px 0",
        background: "var(--bg-1)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="wrap">
        <SectionHeading eyebrow="Get In Touch" title="Contact" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
          className="contact-grid"
        >
          {/* Contact info column */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "24px",
                fontWeight: 500,
                color: "var(--text-primary)",
                marginBottom: "28px",
              }}
            >
              Let&apos;s talk
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "36px" }}>
              {info.email && (
                <ContactItem icon={<IconMail size={16} />} label={info.email} href={`mailto:${info.email}`} />
              )}
              {info.phone && (
                <ContactItem icon={<IconPhone size={16} />} label={info.phone} href={`tel:${info.phone.replace(/\D/g, "")}`} />
              )}
              {info.location && (
                <ContactItem icon={<IconMapPin size={16} />} label={info.location} />
              )}
            </div>

            {/* Social links */}
            <div
              style={{
                borderTop: "1px solid var(--line)",
                paddingTop: "24px",
                display: "flex",
                gap: "16px",
              }}
            >
              {info.linkedin_url && info.linkedin_url !== "#" && (
                <a
                  href={info.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-linkedin"
                  aria-label="LinkedIn"
                  className="link-social"
                >
                  <IconLinkedin size={16} />
                  LinkedIn
                </a>
              )}
              {info.github_url && info.github_url !== "#" && (
                <a
                  href={info.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-github"
                  aria-label="GitHub"
                  className="link-social"
                >
                  <IconGithub size={16} />
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* Form column */}
          <ContactForm />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  const inner = (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span style={{ color: "var(--gold-dim)", flexShrink: 0 }}>{icon}</span>
      <span
        style={{
          fontFamily: "var(--font-eb-garamond), serif",
          fontSize: "16px",
          color: "var(--text-secondary)",
        }}
      >
        {label}
      </span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="link-contact">
        {inner}
      </a>
    );
  }
  return <div>{inner}</div>;
}
