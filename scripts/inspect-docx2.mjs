import fs from "fs";

const x = fs.readFileSync("scripts/_docx-inspect/word/document.xml", "utf8");
const i = x.indexOf("drawing");
console.log("drawing at", i);
console.log(x.slice(i, i + 1200));
