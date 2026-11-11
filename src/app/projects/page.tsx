import type { Metadata } from "next";
import { loadProjects } from "@/lib/content";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of full-stack, cloud, and engineering projects by Yazid Maulana Rizky.",
};

export default function ProjectsPage() {
  const projects = loadProjects();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Projects
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Things I&apos;ve built — each one represents a real problem I helped
          solve.
        </p>
      </header>

      <ProjectGrid projects={projects} />
    </div>
  );
}
