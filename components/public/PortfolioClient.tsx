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
          justifyContent: "center",
          gap: "36px",
          borderBottom: "1px solid var(--line)",
          marginBottom: "48px",
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
                padding: "12px 0 14px",
                background: "none",
                border: "none",
                borderBottom: `1px solid ${isActive ? "var(--gold)" : "transparent"}`,
                fontFamily: "var(--font-eb-garamond), serif",
                fontSize: "16px",
                fontVariant: "small-caps",
                letterSpacing: "0.04em",
                color: isActive ? "var(--gold)" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.25s ease",
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
            padding: "60px 20px",
            fontSize: "16px",
          }}
        >
          No projects in this category yet.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px",
            maxWidth: "900px",
            margin: "0 auto",
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
      className="plate-card"
      style={{
        flex: "1 1 280px",
        maxWidth: "420px",
        border: "1px solid var(--line)",
        padding: 0,
        background: "var(--bg-0)",
      }}
    >
      {/* Plate Image / Banner */}
      <div
        style={{
          aspectRatio: "16/10",
          background: "linear-gradient(135deg, var(--bg-2), var(--bg-0))",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid var(--line)",
        }}
      >
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
            }}
            className="project-image"
          />
        ) : (
          <Icon
            size={32}
            style={{ color: "var(--gold)", opacity: 0.55 }}
          />
        )}
        <div style={{ position: "absolute", inset: 0, border: "1px solid var(--line)", pointerEvents: "none" }} />
      </div>

      {/* Plate Caption */}
      <div style={{ padding: "22px 26px 30px" }}>
        {project.plate_label && (
          <span
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontStyle: "italic",
              fontSize: "14px",
              letterSpacing: "0.08em",
              color: "var(--gold-dim)",
              display: "block",
            }}
          >
            {project.plate_label}
          </span>
        )}

        <h3
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "24px",
            fontWeight: 500,
            color: "var(--text-primary)",
            margin: "8px 0 6px",
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>

        {project.description && (
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "15px",
              fontFamily: "var(--font-eb-garamond), serif",
              lineHeight: 1.6,
              marginBottom: "14px",
            }}
          >
            {project.description}
          </p>
        )}

        {/* Tech tags */}
        {project.tech && project.tech.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
            {project.tech.slice(0, 4).map((t) => (
              <TechTag key={t} tech={t} />
            ))}
          </div>
        )}

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontVariant: "small-caps",
            letterSpacing: "0.06em",
            color: "var(--gold)",
            fontFamily: "var(--font-eb-garamond), serif",
          }}
        >
          Read Details →
        </span>
      </div>
    </Link>
  );
}
