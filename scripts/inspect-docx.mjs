import fs from "fs";

const x = fs.readFileSync("scripts/_docx-inspect/word/document.xml", "utf8");
console.log("NaN", x.includes("NaN"));
console.log("zero cx", (x.match(/wp:cx="0"/g) || []).length);
console.log("zero cy", (x.match(/wp:cy="0"/g) || []).length);
const cx = [...x.matchAll(/wp:cx="(\d+)"/g)].map((m) => Number(m[1]));
const cy = [...x.matchAll(/wp:cy="(\d+)"/g)].map((m) => Number(m[1]));
console.log("cx sample", cx.slice(0, 5));
console.log("cy sample", cy.slice(0, 5));
console.log("min cx", Math.min(...cx), "min cy", Math.min(...cy));
