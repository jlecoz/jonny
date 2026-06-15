import fs from "fs";

const x = fs.readFileSync("scripts/_docx-inspect/word/document.xml", "utf8");
const i = x.indexOf("<w:drawing");
console.log("w:drawing at", i);
if (i >= 0) console.log(x.slice(i, i + 1500));
else {
  console.log("no w:drawing");
  console.log("has pict", x.includes("w:pict"));
  console.log("has blip", x.includes("a:blip"));
}
