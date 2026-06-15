import fs from "fs";

const essay3 = JSON.parse(
  fs.readFileSync("scripts/essay3-import.json", "utf8"),
);
let src = fs.readFileSync("config/thinkingEssays.js", "utf8");
const essay3Js = JSON.stringify(essay3, null, 2)
  .split("\n")
  .map((line) => `  ${line}`)
  .join("\n");

if (src.includes('"id": "essay3"') || src.includes('id: "essay3"')) {
  throw new Error("essay3 already exists in thinkingEssays.js");
}

src = src.replace(/,\s*\n];\s*$/, `,\n${essay3Js}\n];\n`);
fs.writeFileSync("config/thinkingEssays.js", src);
console.log("Added essay3 to config/thinkingEssays.js");
