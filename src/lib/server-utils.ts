/**
 * Server-only utilities. Import only from server components / route handlers.
 * This file uses Node.js APIs that must never be bundled into the client.
 */
import fs from "fs";

/**
 * Check whether a file exists at the given absolute path.
 * Server-side only — do not import this from client components.
 */
export function fileExists(absolutePath: string): boolean {
  try {
    return fs.existsSync(absolutePath);
  } catch {
    return false;
  }
}
