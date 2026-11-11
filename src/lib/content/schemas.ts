/**
 * Zod schemas for all content types.
 * Schema validation runs at build time; failures name the file and field.
 */
import { z } from "zod";

// ─── Shared helpers ──────────────────────────────────────────────────────────

const allowedUrlProtocols = ["https://", "http://", "mailto:"];

const externalUrl = z
  .string()
  .refine(
    (val) => allowedUrlProtocols.some((p) => val.startsWith(p)),
    { message: "URL must start with https://, http://, or mailto:" }
  );

const optionalUrl = z
  .string()
  .nullable()
  .optional()
  .refine(
    (val) => val == null || val === "" || allowedUrlProtocols.some((p) => val.startsWith(p)),
    { message: "URL must start with https://, http://, or mailto:" }
  );

const localAssetPath = z
  .string()
  .nullable()
  .optional()
  .refine(
    (val) => val == null || val === "" || val.startsWith("/"),
    { message: "Local asset paths must start with /" }
  );

// ─── Profile ─────────────────────────────────────────────────────────────────

export const ProfileSchema = z.object({
  name: z.string().min(1),
  headline: z.string().min(1),
  description: z.string().min(1),
  careerFocus: z.string().optional(),
  email: z.string().email(),
  github: externalUrl,
  linkedin: externalUrl,
  avatar: localAssetPath,
});

export type Profile = z.infer<typeof ProfileSchema>;

// ─── Skills ──────────────────────────────────────────────────────────────────

const SkillItemSchema = z.object({
  name: z.string().min(1),
  level: z
    .enum(["familiar", "used in projects", "proficient", "experienced"])
    .optional(),
});

const SkillCategorySchema = z.object({
  category: z.string().min(1),
  items: z.array(SkillItemSchema).min(1),
});

export const SkillsSchema = z.object({
  groups: z.array(SkillCategorySchema).min(1),
});

export type Skills = z.infer<typeof SkillsSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;

// ─── Experience ──────────────────────────────────────────────────────────────

const ExperienceItemSchema = z.object({
  organization: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  responsibilities: z.array(z.string()).default([]),
  achievements: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
});

export const ExperienceSchema = z.object({
  items: z.array(ExperienceItemSchema),
});

export type Experience = z.infer<typeof ExperienceSchema>;
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;

// ─── Education ───────────────────────────────────────────────────────────────

const EducationItemSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  field: z.string().min(1),
  period: z.string().min(1),
  gpa: z.string().optional(),
  notes: z.array(z.string()).default([]),
});

export const EducationSchema = z.object({
  items: z.array(EducationItemSchema),
});

export type Education = z.infer<typeof EducationSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;

// ─── Project ─────────────────────────────────────────────────────────────────

export const ProjectSchema = z
  .object({
    slug: z
      .string()
      .min(1)
      .regex(/^[a-z0-9-]+$/, {
        message: "Slug must be lowercase letters, numbers, and hyphens only",
      }),
    title: z.string().min(1),
    summary: z.string().min(1),
    category: z.string().min(1),
    technologies: z.array(z.string()).min(1),
    featured: z.boolean().default(false),
    published: z.boolean().default(false),
    role: z.string().nullable().optional(),
    period: z.string().nullable().optional(),
    problem: z.string().nullable().optional(),
    solution: z.string().nullable().optional(),
    highlights: z.array(z.string()).default([]),
    challenges: z.array(z.string()).default([]),
    results: z.array(z.string()).default([]),
    coverImage: localAssetPath,
    gallery: z.array(localAssetPath).default([]),
    model3d: localAssetPath,
    demoUrl: optionalUrl,
    repositoryUrl: optionalUrl,
    videoUrl: optionalUrl,
  })
  .refine(
    (data) => !(data.featured && !data.published),
    { message: "featured:true requires published:true", path: ["featured"] }
  )
  // For published projects, enforce required narrative fields
  .refine(
    (data) =>
      !data.published ||
      (data.role != null && data.role.length > 0 &&
       data.problem != null && data.problem.length > 0 &&
       data.solution != null && data.solution.length > 0),
    {
      message:
        "Published projects must include role, problem, and solution",
      path: ["published"],
    }
  );

export type Project = z.infer<typeof ProjectSchema>;
