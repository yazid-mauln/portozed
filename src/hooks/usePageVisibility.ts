"use client";

import { useState, useEffect } from "react";

/**
 * Returns true when the document tab is visible.
 * Used to pause Three.js rendering when the user switches tabs.
 */
export function usePageVisibility(): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handler = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  return visible;
}
