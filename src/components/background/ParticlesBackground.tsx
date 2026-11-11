
"use client";

import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useEffect, useMemo, useRef, useState } from "react";

export function ParticlesBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateMotion = () => {
      setReducedMotion(mediaQuery.matches);
    };

    updateMotion();
    mediaQuery.addEventListener("change", updateMotion);

    return () => {
      mediaQuery.removeEventListener("change", updateMotion);
    };
  }, []);

  // Mouse-follow parallax effect
  useEffect(() => {
    if (reducedMotion) return;

    const element = backgroundRef.current;
    if (!element) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrame = 0;

    const handleMouseMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.045;
      currentY += (targetY - currentY) * 0.045;

      const moveX = currentX * 18;
      const moveY = currentY * 18;

      element.style.transform = `
        scale(1.06)
        translate3d(${moveX}px, ${moveY}px, 0)
      `;

      const stillMoving =
        Math.abs(targetX - currentX) > 0.001 ||
        Math.abs(targetY - currentY) > 0.001;

      if (stillMoving) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        animationFrame = 0;
      }
    };

    const startAnimation = () => {
      if (!animationFrame) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const onMove = (event: PointerEvent) => {
      handleMouseMove(event);
      startAnimation();
    };

    const onLeave = () => {
      handleMouseLeave();
      startAnimation();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);

    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("mouseleave", onLeave);

      cancelAnimationFrame(animationFrame);

      element.style.transform = "";
    };
  }, [reducedMotion]);

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: {
        enable: false,
      },

      background: {
        color: {
          value: "transparent",
        },
      },

      fpsLimit: 60,
      detectRetina: true,

      particles: {
        number: {
          value: 500,
          density: {
            enable: true,
          },
        },

        color: {
          value: "#000000",
        },

        shape: {
          type: "star",
        },

        opacity: {
          value: {
            min: 0.15,
            max: 0.45,
          },
        },

        size: {
          value: {
            min: 3,
            max: 5,
          },
        },

        links: {
          enable: true,
          distance: 150,
          color: "#ff5a36",
          opacity: 0.2,
          width: 1,
        },

        move: {
          enable: !reducedMotion,
          speed: 1,
          direction: "none",
          random: false,
          straight: false,
          outModes: {
            default: "out",
          },
        },
      },

      interactivity: {
        detectsOn: "window",

        events: {
          onHover: {
            enable: !reducedMotion,
            mode: "grab",
          },

          onClick: {
            enable: false,
          },
        },

        modes: {
          grab: {
            distance: 180,
            links: {
              opacity: 0.4,
            },
          },
        },
      },

      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
    }),
    [reducedMotion]
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        ref={backgroundRef}
        className="absolute -inset-[3%] h-[106%] w-[106%]"
        style={{
          willChange: reducedMotion ? "auto" : "transform",
          transform: "scale(1.06)",
        }}
      >
        <ParticlesProvider init={loadSlim}>
          <Particles
            id="portfolio-particles"
            options={options}
            className="h-full w-full"
          />
        </ParticlesProvider>
      </div>
    </div>
  );
}
