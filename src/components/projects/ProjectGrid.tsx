import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/lib/content/schemas";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div
        role="status"
        aria-label="No projects"
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <p className="text-lg font-medium text-muted-foreground">
          No projects yet.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Check back soon — content is coming.
        </p>
      </div>
    );
  }

  return (
    <ul
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 list-none p-0"
      role="list"
      aria-label="All projects"
    >
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
