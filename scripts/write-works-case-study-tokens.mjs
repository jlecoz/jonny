import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildWorksCaseStudyTokensCss } from "../config/worksCaseStudyTokens.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const css = `${buildWorksCaseStudyTokensCss()}\n`;

for (const rel of ["public/works-case-study-tokens.css", "app/works-case-study-tokens.css"]) {
  const outPath = join(root, rel);
  writeFileSync(outPath, css, "utf8");
  console.log(`Wrote ${outPath}`);
}
