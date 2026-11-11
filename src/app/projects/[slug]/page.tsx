import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLinkIcon, ArrowLeftIcon } from "lucide-react";
import { loadProjectBySlug, loadPublishedSlugs } from "@/lib/content";
import { GitHubIcon } from "@/components/icons/BrandIcons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { Separator } from "@/components/ui/separator";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = loadPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = loadProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = loadProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/">Home</Link>} />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/projects">Projects</Link>} />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{project.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8 space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{project.category}</Badge>
          {project.featured && <Badge>Featured</Badge>}
          {project.period && (
            <Badge variant="secondary">{project.period}</Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground">{project.summary}</p>

        {/* Action buttons — hidden when URL is empty */}
        {(project.demoUrl || project.repositoryUrl) && (
          <div className="flex flex-wrap gap-3 pt-2">
            {project.demoUrl && (
              <LinkButton href={project.demoUrl} size="sm" external>
                <ExternalLinkIcon className="mr-1.5 size-4" aria-hidden="true" />
                Live Demo
              </LinkButton>
            )}
            {project.repositoryUrl && (
              <LinkButton href={project.repositoryUrl} variant="outline" size="sm" external>
                <GitHubIcon className="mr-1.5 size-4" />
                View Code
              </LinkButton>
            )}
          </div>
        )}
      </header>

      {/* Cover image */}
      {project.coverImage && (
        <div className="mb-8 overflow-hidden rounded-xl bg-muted">
          <div className="relative aspect-video w-full">
            <Image
              src={project.coverImage}
              alt={`Cover image for ${project.title}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>
      )}

      <Separator className="mb-8" />

      {/* Role */}
      {project.role && (
        <section className="mb-6" aria-labelledby="role-heading">
          <h2
            id="role-heading"
            className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            My Role
          </h2>
          <p className="text-base font-medium">{project.role}</p>
        </section>
      )}

      {/* Technologies */}
      <section className="mb-8" aria-labelledby="tech-heading">
        <h2
          id="tech-heading"
          className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          Technologies
        </h2>
        <ul className="flex flex-wrap gap-2 list-none p-0" role="list">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <Badge variant="secondary">{tech}</Badge>
            </li>
          ))}
        </ul>
      </section>

      <Separator className="mb-8" />

      {/* Problem */}
      {project.problem && (
        <section className="mb-8" aria-labelledby="problem-heading">
          <h2 id="problem-heading" className="mb-3 text-xl font-bold">
            The Problem
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {project.problem}
          </p>
        </section>
      )}

      {/* Solution */}
      {project.solution && (
        <section className="mb-8" aria-labelledby="solution-heading">
          <h2 id="solution-heading" className="mb-3 text-xl font-bold">
            The Solution
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {project.solution}
          </p>
        </section>
      )}

      {/* Highlights */}
      {project.highlights.length > 0 && (
        <section className="mb-8" aria-labelledby="highlights-heading">
          <h2 id="highlights-heading" className="mb-3 text-xl font-bold">
            Highlights
          </h2>
          <ul className="space-y-2">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-base text-muted-foreground"
              >
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
                {h}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Challenges */}
      {project.challenges.length > 0 && (
        <section className="mb-8" aria-labelledby="challenges-heading">
          <h2 id="challenges-heading" className="mb-3 text-xl font-bold">
            Challenges
          </h2>
          <ul className="space-y-2">
            {project.challenges.map((c, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-base text-muted-foreground"
              >
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground"
                  aria-hidden="true"
                />
                {c}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Results */}
      {project.results.length > 0 && (
        <section className="mb-8" aria-labelledby="results-heading">
          <h2 id="results-heading" className="mb-3 text-xl font-bold">
            Results
          </h2>
          <ul className="space-y-2">
            {project.results.map((r, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-base text-muted-foreground"
              >
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden="true"
                />
                {r}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="mb-8" aria-labelledby="gallery-heading">
          <h2 id="gallery-heading" className="mb-4 text-xl font-bold">
            Gallery
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.gallery.map((src, i) =>
              src ? (
                <div
                  key={i}
                  className="relative aspect-video overflow-hidden rounded-lg bg-muted"
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ) : null
            )}
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="mt-12">
        <LinkButton href="/projects" variant="ghost" size="sm">
          <ArrowLeftIcon className="mr-1.5 size-4" aria-hidden="true" />
          Back to Projects
        </LinkButton>
      </div>
    </div>
  );
}
