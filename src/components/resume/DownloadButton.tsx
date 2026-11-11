"use client";

import { DownloadIcon } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";

interface DownloadButtonProps {
  hasPdf: boolean;
}

export function DownloadButton({ hasPdf }: DownloadButtonProps) {
  if (!hasPdf) return null;

  return (
    <LinkButton
      href="/cv/resume.pdf"
      external
      download="Yazid-Maulana-Rizky-CV.pdf"
      size="sm"
      aria-label="Download resume as PDF"
    >
      <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
      Download PDF
    </LinkButton>
  );
}
