"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/actions";
import {
  IconLayoutDashboard,
  IconUser,
  IconBrain,
  IconCode,
  IconBriefcase,
  IconStar,
  IconMail,
  IconMessage,
  IconLogout,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

interface NavItem {
  href: string;
  label: string;
  Icon: React.ElementType;
}

const NAV: NavItem[] = [
  { href: "/admin/hero", label: "Hero", Icon: IconLayoutDashboard },
  { href: "/admin/about", label: "About", Icon: IconUser },
  { href: "/admin/skills", label: "Skills", Icon: IconBrain },
  { href: "/admin/portfolio", label: "Portfolio", Icon: IconCode },
  { href: "/admin/experience", label: "Experience", Icon: IconBriefcase },
  { href: "/admin/testimonial", label: "Testimonial", Icon: IconStar },
  { href: "/admin/contact", label: "Contact", Icon: IconMail },
  { href: "/admin/messages", label: "Messages", Icon: IconMessage },
];

interface Props {
  email: string;
}

export default function AdminSidebar({ email }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle bar */}
      <div
        className="md:hidden"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: "1px solid var(--line)",
          background: "var(--bg-1)",
          gridColumn: "1 / -1",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "18px",
            color: "var(--text-primary)",
          }}
        >
          N.<span style={{ color: "var(--gold)" }}>A</span>{" "}
          <span style={{ color: "var(--text-muted)", fontSize: "13px" }}>Admin</span>
        </span>
        <button
          onClick={() => setIsOpen((v) => !v)}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-secondary)",
            cursor: "pointer",
          }}
          aria-label="Toggle menu"
        >
          {isOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        style={{
          background: "var(--bg-1)",
          borderRight: "1px solid var(--line)",
          height: "100vh",
          position: "sticky",
          top: 0,
          display: "flex",
          flexDirection: "column",
        }}
        id="admin-sidebar"
      >
        {/* Logo */}
        <div
          style={{
            padding: "24px 20px",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <Link
            href="/admin/hero"
            style={{ textDecoration: "none" }}
          >
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "20px",
                color: "var(--text-primary)",
              }}
            >
              N.<span style={{ color: "var(--gold)" }}>A</span>
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-eb-garamond), serif",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginTop: "2px",
              }}
            >
              CMS Admin
            </span>
          </Link>
        </div>

        {/* Nav links */}
        <nav
          aria-label="Admin navigation"
          style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}
        >
          {NAV.map(({ href, label, Icon }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                id={`admin-nav-${label.toLowerCase()}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 20px",
                  fontFamily: "var(--font-eb-garamond), serif",
                  fontSize: "15px",
                  letterSpacing: "0.03em",
                  color: isActive ? "var(--gold)" : "var(--text-secondary)",
                  background: isActive
                    ? "rgba(201,163,92,0.07)"
                    : "transparent",
                  borderLeft: `2px solid ${isActive ? "var(--gold)" : "transparent"}`,
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User info + logout */}
        <div
          style={{
            borderTop: "1px solid var(--line)",
            padding: "16px 20px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-eb-garamond), serif",
              fontSize: "12px",
              color: "var(--text-muted)",
              marginBottom: "10px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {email}
          </p>
          <form action={signOut}>
            <button
              type="submit"
              id="admin-logout"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "none",
                border: "1px solid var(--line-strong)",
                color: "var(--text-muted)",
                fontFamily: "var(--font-eb-garamond), serif",
                fontSize: "12px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "7px 14px",
                cursor: "pointer",
                width: "100%",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              <IconLogout size={13} />
              Logout
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
