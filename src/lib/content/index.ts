/**
 * Content loader – reads JSON files from content/, validates with Zod, and
 * throws descriptive build-time errors when validation fails.
 *
 * All exported functions are safe to call from Next.js server components and
 * generateStaticParams – they are never bundled into the client.
 */
import fs from "fs";
import path from "path";
import type { ZodType } from "zod";
import {
  ProfileSchema,
  SkillsSchema,
  ExperienceSchema,
  EducationSchema,
  ProjectSchema,
  type Profile,
  type Skills,
  type Experience,
  type Education,
  type Project,
} from "./schemas";

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

// ─── Generic helpers ─────────────────────────────────────────────────────────

function readJson(filePath: string): unknown {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`[content] Failed to read file: ${filePath}\n${String(err)}`);
  }
}

/**
 * Parse with Zod and throw a detailed error on failure,
 * naming the file and every invalid field.
 */
function parseOrThrow<T>(
  schema: ZodType<T>,
  data: unknown,
  filePath: string
): T {
  const result = schema.safeParse(data);
  if (result.success) return result.data;

  const issues = result.error.issues
    .map((i) => `  • ${i.path.map(String).join(".")} — ${i.message}`)
    .join("\n");

  throw new Error(
    `[content] Schema validation failed for: ${filePath}\n${issues}`
  );
}

// ─── Public loaders ──────────────────────────────────────────────────────────

export function loadProfile(): Profile {
  const filePath = path.join(CONTENT_DIR, "profile.json");
  return parseOrThrow(ProfileSchema, readJson(filePath), filePath);
}

export function loadSkills(): Skills {
  const filePath = path.join(CONTENT_DIR, "skills.json");
  return parseOrThrow(SkillsSchema, readJson(filePath), filePath);
}

export function loadExperience(): Experience {
  const filePath = path.join(CONTENT_DIR, "experience.json");
  return parseOrThrow(ExperienceSchema, readJson(filePath), filePath);
}

export function loadEducation(): Education {
  const filePath = path.join(CONTENT_DIR, "education.json");
  return parseOrThrow(EducationSchema, readJson(filePath), filePath);
}

/**
 * Load all projects from content/projects/*.json.
 * Applies content rules:
 *  - published:false projects are excluded
 *  - featured:true requires published:true (enforced in schema)
 *  - slugs must be unique across all files
 */
export function loadProjects(): Project[] {
  const projectsDir = path.join(CONTENT_DIR, "projects");
  const files = fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const projects: Project[] = [];
  const seenSlugs = new Map<string, string>();

  for (const file of files) {
    const filePath = path.join(projectsDir, file);
    const raw = readJson(filePath);
    const project = parseOrThrow(ProjectSchema, raw, filePath);

    // Enforce unique slugs
    if (seenSlugs.has(project.slug)) {
      throw new Error(
        `[content] Duplicate slug "${project.slug}" in ${filePath}. ` +
          `Already used by ${seenSlugs.get(project.slug)}`
      );
    }
    seenSlugs.set(project.slug, filePath);

    // Exclude drafts
    if (!project.published) continue;

    projects.push(project);
  }

  return projects;
}

/**
 * Load a single published project by slug.
 * Returns undefined when not found (caller should render 404).
 */
export function loadProjectBySlug(slug: string): Project | undefined {
  const projects = loadProjects();
  return projects.find((p) => p.slug === slug);
}

/**
 * Return slugs of all published projects – used by generateStaticParams.
 */
export function loadPublishedSlugs(): string[] {
  return loadProjects().map((p) => p.slug);
}

/**
 * Featured projects for the homepage (max 3, published only).
 */
export function loadFeaturedProjects(): Project[] {
  return loadProjects()
    .filter((p) => p.featured)
    .slice(0, 3);
}
