import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import type { Profile } from "@/lib/content/schemas";
import type { Skills } from "@/lib/content/schemas";
import type { Experience } from "@/lib/content/schemas";
import type { Education } from "@/lib/content/schemas";

interface ResumeContentProps {
  profile: Profile;
  skills: Skills;
  experience: Experience;
  education: Education;
}

export function ResumeContent({
  profile,
  skills,
  experience,
  education,
}: ResumeContentProps) {
  return (
    <article className="space-y-10" aria-label="Resume">
      {/* Header */}
      <header className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">{profile.name}</h2>
        <p className="text-base text-primary font-medium">{profile.headline}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <a
            href={`mailto:${profile.email}`}
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </header>

      <Separator />

      {/* Summary */}
      <section aria-labelledby="summary-heading">
        <h3 id="summary-heading" className="mb-3 text-lg font-semibold">
          Summary
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {profile.description}
        </p>
        {profile.careerFocus && (
          <p className="mt-2 text-sm italic text-muted-foreground">
            {profile.careerFocus}
          </p>
        )}
      </section>

      <Separator />

      {/* Education */}
      <section aria-labelledby="education-heading">
        <h3 id="education-heading" className="mb-4 text-lg font-semibold">
          Education
        </h3>
        <div className="space-y-4">
          {education.items.map((item, i) => (
            <div key={i}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{item.institution}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.degree} — {item.field}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground shrink-0">
                  {item.period}
                </span>
              </div>
              {item.gpa && (
                <p className="mt-1 text-sm text-muted-foreground">
                  GPA: {item.gpa}
                </p>
              )}
              {item.notes.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {item.notes.map((note, ni) => (
                    <li key={ni} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
                      {note}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Experience */}
      {experience.items.length > 0 && (
        <section aria-labelledby="experience-heading">
          <h3 id="experience-heading" className="mb-4 text-lg font-semibold">
            Experience
          </h3>
          <div className="space-y-6">
            {experience.items.map((item, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{item.organization}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.role}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground shrink-0">
                    {item.period}
                  </span>
                </div>
                {item.responsibilities.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {item.responsibilities.map((r, ri) => (
                      <li key={ri} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground" aria-hidden="true" />
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
                {item.achievements.length > 0 && (
                  <ul className="mt-2 space-y-1.5">
                    {item.achievements.map((a, ai) => (
                      <li key={ai} className="flex items-start gap-2 text-sm font-medium text-foreground">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        {a}
                      </li>
                    ))}
                  </ul>
                )}
                {item.technologies.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.technologies.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs font-normal">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <Separator />

      {/* Skills */}
      <section aria-labelledby="skills-heading">
        <h3 id="skills-heading" className="mb-4 text-lg font-semibold">
          Skills
        </h3>
        <dl className="space-y-3">
          {skills.groups.map((group) => (
            <div key={group.category} className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <dt className="w-36 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.category}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5 list-none p-0" role="list">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <Badge variant="secondary" className="text-xs font-normal">
                        {item.name}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
