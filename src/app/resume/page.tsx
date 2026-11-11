import path from "path";
import type { Metadata } from "next";
import { fileExists } from "@/lib/server-utils";
import {
  loadProfile,
  loadSkills,
  loadExperience,
  loadEducation,
} from "@/lib/content";
import { ResumeContent } from "@/components/resume/ResumeContent";
import { DownloadButton } from "@/components/resume/DownloadButton";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Yazid Maulana Rizky — Full Stack Developer.",
};

export default function ResumePage() {
  const [profile, skills, experience, education] = [
    loadProfile(),
    loadSkills(),
    loadExperience(),
    loadEducation(),
  ];

  const hasPdf = fileExists(
    path.join(process.cwd(), "public", "cv", "resume.pdf")
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      {/* Page header with download button */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Read online or download the PDF version.
          </p>
        </div>
        <DownloadButton hasPdf={hasPdf} />
      </div>

      {/* Resume content in a scrollable region for accessibility */}
      <ScrollArea className="rounded-xl border border-border bg-card p-6 sm:p-8">
        <ResumeContent
          profile={profile}
          skills={skills}
          experience={experience}
          education={education}
        />
      </ScrollArea>

      {/* Repeat download button at the bottom */}
      {hasPdf && (
        <div className="mt-6 flex justify-center">
          <DownloadButton hasPdf={hasPdf} />
        </div>
      )}
    </div>
  );
}
