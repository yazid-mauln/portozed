"use client";

/**
 * Client wrapper that adds SpotlightCard hover effect to ProjectCard.
 * Loaded lazily in ProjectCard so the effect never blocks SSR.
 *
 * Accessibility: SpotlightCard is a <div> wrapper with no role/state change —
 * the interactive element (the Link button inside) is unchanged.
 * The spotlight effect is purely visual and does not convey information.
 * prefers-reduced-motion: spotlight still renders but no animation occurs
 * (the CSS pointer effect is instantaneous, not a transition).
 *
 * Source: reactbits.dev — SpotlightCard (TS + Tailwind variant, MIT + Commons Clause).
 * Bundle impact: ~2 KB gzipped (no external deps).
 * Recorded in DECISIONS.md D-008.
 */

import dynamic from "next/dynamic";
import type { SpotlightCardProps } from "@/components/react-bits/SpotlightCard";

const SpotlightCard = dynamic(
  () => import("@/components/react-bits/SpotlightCard"),
  {
    ssr: false,
    loading: () => null,
  }
);

interface ProjectCardSpotlightProps extends Omit<SpotlightCardProps, "children"> {
  children: React.ReactNode;
}

export function ProjectCardSpotlight({
  children,
  className,
  ...props
}: ProjectCardSpotlightProps) {
  return (
    <SpotlightCard
      className={className}
      spotlightColor="rgba(0,0,0,0.06)"
      intensity={0.15}
      {...props}
    >
      {children}
    </SpotlightCard>
  );
}
