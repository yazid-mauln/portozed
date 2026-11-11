"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function JakartaClock({ className }: { className?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };

    updateTime();

    const interval = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className={cn("flex flex-col items-center justify-center", className)}
      aria-label={`Current time in Jakarta: ${time || "loading"}`}
    >
      <div className="flex items-center gap-2">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#ff5a36] opacity-50" />
          <span className="relative inline-flex size-1.5 rounded-full bg-[#ff5a36]" />
        </span>

        <span className="font-mono text-sm font-medium tabular-nums tracking-wider text-foreground">
          {time || "--:--:--"}
        </span>
      </div>

      <span className="mt-0.5 text-[9px] font-medium tracking-[0.2em] text-muted-foreground">
        JAKARTA, WIB
      </span>
    </div>
  );
}
