#!/usr/bin/env node
/**
 * check-placeholders.ts
 *
 * Scans content/ JSON files and reports any values that contain
 * "[EXAMPLE - REPLACE]", which indicates the owner has not yet filled in
 * real content.
 *
 * Exit codes:
 *   0 — no placeholders found (or running in dev mode)
 *   1 — placeholders found AND CI=true (fails the production build pipeline)
 *
 * Usage:
 *   npx tsx scripts/check-placeholders.ts
 */
import fs from "fs";
import path from "path";

const MARKER = "[EXAMPLE - REPLACE]";
const CONTENT_DIR = path.join(process.cwd(), "src", "content");
const isCI = process.env.CI === "true";

interface Finding {
  file: string;
  path: string;
  value: string;
}

function scan(
  value: unknown,
  currentPath: string,
  filePath: string,
  findings: Finding[]
): void {
  if (typeof value === "string" && value.includes(MARKER)) {
    findings.push({ file: filePath, path: currentPath, value });
  } else if (Array.isArray(value)) {
    value.forEach((item, i) =>
      scan(item, `${currentPath}[${i}]`, filePath, findings)
    );
  } else if (value !== null && typeof value === "object") {
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      scan(val, currentPath ? `${currentPath}.${key}` : key, filePath, findings);
    }
  }
}

function walk(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    if (entry.name.endsWith(".json")) return [fullPath];
    return [];
  });
}

const files = walk(CONTENT_DIR);
const allFindings: Finding[] = [];

for (const file of files) {
  try {
    const raw = JSON.parse(fs.readFileSync(file, "utf-8"));
    scan(raw, "", file, allFindings);
  } catch (err) {
    console.error(`[check-placeholders] Could not parse ${file}: ${String(err)}`);
  }
}

if (allFindings.length === 0) {
  console.log("[check-placeholders] ✓ No placeholders found.");
  process.exit(0);
}

const label = isCI ? "ERROR" : "WARNING";
console.log(
  `\n[check-placeholders] ${label}: ${allFindings.length} placeholder(s) found:\n`
);

// Group by file
const byFile = new Map<string, Finding[]>();
for (const f of allFindings) {
  const rel = path.relative(process.cwd(), f.file);
  if (!byFile.has(rel)) byFile.set(rel, []);
  byFile.get(rel)!.push(f);
}

for (const [file, findings] of byFile) {
  console.log(`  ${file}`);
  for (const f of findings.slice(0, 5)) {
    const truncated =
      f.value.length > 80 ? f.value.slice(0, 80) + "…" : f.value;
    console.log(`    • ${f.path || "(root)"}: ${truncated}`);
  }
  if (findings.length > 5) {
    console.log(`    … and ${findings.length - 5} more`);
  }
}

if (isCI) {
  console.error(
    "\n[check-placeholders] Build failed: replace all [EXAMPLE - REPLACE] values before deploying."
  );
  process.exit(1);
} else {
  console.warn(
    "\n[check-placeholders] Replace these placeholders before deploying.\n"
  );
  process.exit(0);
}
