import { describe, it, expect } from "vitest";
import {
  ProfileSchema,
  SkillsSchema,
  ProjectSchema,
} from "@/lib/content/schemas";

// ─── ProfileSchema ────────────────────────────────────────────────────────────

describe("ProfileSchema", () => {
  const valid = {
    name: "Yazid Maulana Rizky",
    headline: "Full Stack Developer",
    description: "CS student at BINUS.",
    email: "yazid@example.com",
    github: "https://github.com/yazid",
    linkedin: "https://linkedin.com/in/yazid",
    avatar: null,
  };

  it("accepts a valid profile", () => {
    expect(ProfileSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects missing name", () => {
    const result = ProfileSchema.safeParse({ ...valid, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = ProfileSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects github URL without https", () => {
    const result = ProfileSchema.safeParse({ ...valid, github: "github.com/yazid" });
    expect(result.success).toBe(false);
  });
});

// ─── SkillsSchema ─────────────────────────────────────────────────────────────

describe("SkillsSchema", () => {
  const valid = {
    groups: [
      {
        category: "Programming Languages",
        items: [{ name: "TypeScript", level: "proficient" }],
      },
    ],
  };

  it("accepts valid skills", () => {
    expect(SkillsSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects empty groups array", () => {
    expect(SkillsSchema.safeParse({ groups: [] }).success).toBe(false);
  });

  it("rejects empty items array in a group", () => {
    const result = SkillsSchema.safeParse({
      groups: [{ category: "Frontend", items: [] }],
    });
    expect(result.success).toBe(false);
  });
});

// ─── ProjectSchema ────────────────────────────────────────────────────────────

describe("ProjectSchema", () => {
  const validPublished = {
    slug: "my-project",
    title: "My Project",
    summary: "A cool project",
    category: "Full Stack",
    technologies: ["React"],
    featured: false,
    published: true,
    role: "Full Stack Developer",
    period: "2026",
    problem: "A problem statement.",
    solution: "A solution.",
    highlights: [],
    challenges: [],
    results: [],
    coverImage: null,
    gallery: [],
    model3d: null,
    demoUrl: null,
    repositoryUrl: null,
    videoUrl: null,
  };

  it("accepts a valid published project", () => {
    expect(ProjectSchema.safeParse(validPublished).success).toBe(true);
  });

  it("accepts a valid draft project (no role/problem/solution required)", () => {
    const draft = {
      ...validPublished,
      published: false,
      featured: false,
      role: undefined,
      problem: undefined,
      solution: undefined,
    };
    expect(ProjectSchema.safeParse(draft).success).toBe(true);
  });

  it("rejects featured:true with published:false", () => {
    const result = ProjectSchema.safeParse({
      ...validPublished,
      published: false,
      featured: true,
    });
    expect(result.success).toBe(false);
  });

  it("rejects slug with uppercase letters", () => {
    const result = ProjectSchema.safeParse({
      ...validPublished,
      slug: "My-Project",
    });
    expect(result.success).toBe(false);
  });

  it("rejects slug with spaces", () => {
    const result = ProjectSchema.safeParse({
      ...validPublished,
      slug: "my project",
    });
    expect(result.success).toBe(false);
  });

  it("rejects published project missing role", () => {
    const result = ProjectSchema.safeParse({ ...validPublished, role: null });
    expect(result.success).toBe(false);
  });

  it("rejects published project missing problem", () => {
    const result = ProjectSchema.safeParse({ ...validPublished, problem: null });
    expect(result.success).toBe(false);
  });

  it("rejects demoUrl with invalid protocol", () => {
    const result = ProjectSchema.safeParse({
      ...validPublished,
      demoUrl: "ftp://example.com",
    });
    expect(result.success).toBe(false);
  });

  it("accepts demoUrl as null", () => {
    const result = ProjectSchema.safeParse({ ...validPublished, demoUrl: null });
    expect(result.success).toBe(true);
  });

  it("accepts empty string for optional URL fields (treated as absent)", () => {
    // Empty string is allowed — treated as no URL
    const result = ProjectSchema.safeParse({ ...validPublished, demoUrl: "" });
    expect(result.success).toBe(true);
  });
});

// ─── Loader integration: content files must match schemas ────────────────────

describe("Content files validation", () => {
  it("profile.json matches ProfileSchema", async () => {
    const { loadProfile } = await import("@/lib/content");
    expect(() => loadProfile()).not.toThrow();
  });

  it("skills.json matches SkillsSchema", async () => {
    const { loadSkills } = await import("@/lib/content");
    expect(() => loadSkills()).not.toThrow();
  });

  it("experience.json matches ExperienceSchema", async () => {
    const { loadExperience } = await import("@/lib/content");
    expect(() => loadExperience()).not.toThrow();
  });

  it("education.json matches EducationSchema", async () => {
    const { loadEducation } = await import("@/lib/content");
    expect(() => loadEducation()).not.toThrow();
  });

  it("loadProjects() loads only published projects", async () => {
    const { loadProjects } = await import("@/lib/content");
    const projects = loadProjects();
    expect(projects.every((p) => p.published)).toBe(true);
  });

  it("draft project does not appear in loadProjects()", async () => {
    const { loadProjects } = await import("@/lib/content");
    const projects = loadProjects();
    const draft = projects.find((p) => p.slug === "placeholder-draft-project");
    expect(draft).toBeUndefined();
  });

  it("all published projects have unique slugs", async () => {
    const { loadProjects } = await import("@/lib/content");
    const projects = loadProjects();
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
