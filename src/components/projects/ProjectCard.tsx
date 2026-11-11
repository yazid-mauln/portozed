import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { ProjectCardSpotlight } from "./ProjectCardSpotlight";
import type { Project } from "@/lib/content/schemas";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <ProjectCardSpotlight className="h-full rounded-xl">
      <Card className="flex h-full flex-col overflow-hidden border-0 bg-transparent shadow-none transition-shadow hover:shadow-md">
      {/* Cover image or placeholder */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={`Cover image for ${project.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div
            className="flex h-full items-center justify-center text-xs text-muted-foreground"
            aria-label="No cover image"
          >
            <span className="px-4 text-center">No preview available</span>
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="mb-2 flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">
            {project.category}
          </Badge>
          {project.featured && (
            <Badge className="text-xs">Featured</Badge>
          )}
        </div>
        <CardTitle className="line-clamp-2 text-base">{project.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-2">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {project.summary}
        </p>

        <ul
          className="mt-3 flex flex-wrap gap-1 list-none p-0"
          role="list"
          aria-label="Technologies used"
        >
          {project.technologies.slice(0, 3).map((tech) => (
            <li key={tech}>
              <Badge variant="secondary" className="text-xs font-normal">
                {tech}
              </Badge>
            </li>
          ))}
          {project.technologies.length > 3 && (
            <li>
              <Badge variant="secondary" className="text-xs font-normal">
                +{project.technologies.length - 3} more
              </Badge>
            </li>
          )}
        </ul>
      </CardContent>

      <CardFooter>
        <LinkButton
          href={`/projects/${project.slug}`}
          variant="outline"
          size="sm"
          className="w-full justify-center"
        >
          View Details
          <ArrowRightIcon className="ml-1 size-3" aria-hidden="true" />
        </LinkButton>
      </CardFooter>
      </Card>
    </ProjectCardSpotlight>
  );
}
