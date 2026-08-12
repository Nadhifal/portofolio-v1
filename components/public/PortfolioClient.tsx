"use client";

import { useState } from "react";
import Link from "next/link";
import { getIcon } from "@/lib/icons";
import { TechTag } from "@/components/ui";
import type { PortfolioCategory, PortfolioProject } from "@/lib/types";

interface Props {
  categories: PortfolioCategory[];
  projects: PortfolioProject[];
}

export default function PortfolioClient({ categories, projects }: Props) {
  const [activeTab, setActiveTab] = useState<string>(
    categories[0]?.id ?? ""
  );

  const filtered = projects.filter((p) => p.category_id === activeTab);

  return (
    <div>
      {/* Tab bar */}
      <nav
        aria-label="Portfolio categories"
        style={{
          display: "flex",
          borderBottom: "1px solid var(--line)",
          marginBottom: "48px",
          gap: 0,
          overflowX: "auto",
        }}
      >
        {categories.map((cat) => {
          const isActive = cat.id === activeTab;
          return (
            <button
              key={cat.id}
              id={`tab-${cat.slug}`}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(cat.id)}
              style={{
                padding: "12px 24px",
                background: "none",
                border: "none",
                borderBottom: `2px solid ${isActive ? "var(--gold)" : "transparent"}`,
                fontFamily: "var(--font-eb-garamond), serif",
                fontSize: "15px",
                fontVariant: "small-caps",
                letterSpacing: "0.08em",
                color: isActive ? "var(--gold)" : "var(--text-muted)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                marginBottom: "-1px",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </nav>

      {/* Project grid */}
      {filtered.length === 0 ? (
        <p
          style={{
            fontFamily: "var(--font-eb-garamond), serif",
            color: "var(--text-muted)",
            textAlign: "center",
            padding: "48px 0",
            fontStyle: "italic",
          }}
        >
          No projects in this category yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1px",
            background: "var(--line)",
            border: "1px solid var(--line)",
          }}
        >
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const Icon = getIcon(project.icon ?? "ti-code");

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      id={`project-${project.slug}`}
      style={{
        display: "block",
        background: "var(--bg-0)",
        padding: "36px 32px",
        textDecoration: "none",
        transition: "background 0.2s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-0)";
      }}
    >
      {/* Plate label */}
      {project.plate_label && (
        <span
          style={{
            fontFamily: "var(--font-eb-garamond), serif",
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            display: "block",
            marginBottom: "20px",
          }}
        >
          {project.plate_label}
        </span>
      )}

      {/* Icon */}
      <Icon
        size={28}
        style={{ color: "var(--gold-dim)", marginBottom: "16px" }}
      />

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "22px",
          fontWeight: 500,
          color: "var(--text-primary)",
          marginBottom: "12px",
          lineHeight: 1.2,
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      {project.description && (
        <p
          style={{
            fontFamily: "var(--font-eb-garamond), serif",
            fontSize: "15px",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginBottom: "20px",
          }}
        >
          {project.description}
        </p>
      )}

      {/* Tech tags */}
      {project.tech && project.tech.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.tech.slice(0, 4).map((t) => (
            <TechTag key={t} tech={t} />
          ))}
        </div>
      )}

      {/* Gold arrow hint */}
      <div
        style={{
          position: "absolute",
          bottom: "24px",
          right: "28px",
          color: "var(--gold-dim)",
          fontSize: "18px",
          fontFamily: "var(--font-cormorant), serif",
        }}
      >
        →
      </div>
    </Link>
  );
}
