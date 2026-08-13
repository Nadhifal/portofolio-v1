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
        className="flex justify-start md:justify-center gap-[40px] border-b border-[var(--line)] mx-auto mb-[50px] max-w-[800px] px-6 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
              className={`bg-none border-none pt-3 pb-4 text-[16px] lowercase style-small-caps tracking-[0.04em] cursor-pointer mb-[-1px] transition-colors duration-250 ease-in whitespace-nowrap border-b ${
                isActive
                  ? "text-[var(--gold)] border-[var(--gold)]"
                  : "text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]"
              }`}
              style={{ fontVariant: "small-caps" }}
            >
              {cat.label}
            </button>
          );
        })}
      </nav>

      {/* Project grid */}
      {filtered.length === 0 ? (
        <p className="font-serif text-[var(--text-muted)] text-center py-[60px] px-5 text-[16px]">
          No projects in this category yet.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 max-w-[900px] mx-auto">
          {filtered.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const Icon = getIcon(project.icon ?? "ti-code");
  const ArrowRight = getIcon("ti-arrow-right");

  // Roman numeral conversion for 'Plate I', 'Plate II'
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  const numStr = `Plate ${romanNumerals[index - 1] || index}`;

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      id={`project-${project.slug}`}
      className="flex flex-col flex-[1_1_300px] max-w-[420px] border border-[var(--line)] bg-[var(--bg-0)] no-underline group cursor-pointer transition-all duration-250 hover:border-[var(--gold-dim)] hover:-translate-y-[3px] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--gold)] focus-visible:outline-offset-2"
    >
      {/* Plate Image */}
      <div className="relative aspect-[16/10] bg-[linear-gradient(135deg,var(--bg-2),var(--bg-0))] overflow-hidden flex items-center justify-center after:content-[''] after:absolute after:inset-0 after:border after:border-[var(--line)]">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover grayscale transition-all duration-400 group-hover:grayscale-0 group-hover:scale-105"
          />
        ) : (
          <Icon size={32} className="text-[var(--gold)] opacity-55" />
        )}
      </div>

      {/* Plate Caption */}
      <div className="pt-[22px] px-[26px] pb-[30px]">
        {/* We can use project.plate_label if exists, otherwise fallback to numStr */}
        <div className="font-serif italic text-[var(--gold-dim)] text-[14px] tracking-[0.08em]">
          {project.plate_label || numStr}
        </div>
        <h3 className="text-[24px] font-serif text-[var(--text-primary)] mt-[8px] mb-[6px] leading-tight">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-[var(--text-secondary)] text-[15px] font-serif leading-[1.6]">
            {project.description}
          </p>
        )}
        
        <span className="inline-flex items-center gap-[6px] mt-[14px] text-[13px] tracking-[0.06em] text-[var(--gold)]" style={{ fontVariant: "small-caps" }}>
          Lihat detail <ArrowRight size={14} className="transition-transform duration-250 group-hover:translate-x-[3px]" />
        </span>
      </div>
    </Link>
  );
}
