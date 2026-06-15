import fs from "fs";
import path from "path";

const htmlPath = "c:/Users/DESKTOP/Desktop/critique-culture.html";
const outDir = "public/img/thinking";
const html = fs.readFileSync(htmlPath, "utf8");

function stripTags(s) {
  return s
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/);
if (!articleMatch) throw new Error("No article found");

const article = articleMatch[1];
const title = stripTags(article.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]);
const subtitle = stripTags(
  article.match(/<p class="subtitle">([\s\S]*?)<\/p>/)[1],
);
const lede = stripTags(article.match(/<p class="lede">([\s\S]*?)<\/p>/)[1]);

let imgIndex = 0;

function extractPhotoImages(fragment) {
  const images = [];
  const re =
    /<div class="photo">\s*<img[^>]+src="data:image\/([^;]+);base64,([^"]+)"[^>]*>\s*<p class="photo-cap">([\s\S]*?)<\/p>\s*<\/div>/g;
  let m;
  while ((m = re.exec(fragment)) !== null) {
    imgIndex += 1;
    const ext = m[1] === "jpeg" ? "jpg" : m[1];
    const filename = `essay3-critique-${String(imgIndex).padStart(2, "0")}.${ext}`;
    const outPath = path.join(outDir, filename);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outPath, Buffer.from(m[2], "base64"));
    images.push({
      src: `/img/thinking/${filename}`,
      alt: stripTags(m[3]),
    });
  }
  return images;
}

function extractPlainParagraphs(fragment) {
  const texts = [];
  const re = /<p>(?![^>]*class)([\s\S]*?)<\/p>/g;
  let m;
  while ((m = re.exec(fragment)) !== null) {
    const text = stripTags(m[1]);
    if (text) texts.push(text);
  }
  return texts;
}

function parseSectionBody(body) {
  const items = [];
  let cursor = 0;
  const h2End = body.indexOf("</h2>");
  if (h2End !== -1) cursor = h2End + 5;

  while (cursor < body.length) {
    const photosAt = body.indexOf('<div class="photos">', cursor);
    const paragraphAt = body.indexOf("<p>", cursor);

    if (photosAt !== -1 && (paragraphAt === -1 || photosAt < paragraphAt)) {
      items.push(...extractPlainParagraphs(body.slice(cursor, photosAt)));

      const photosMatch = body
        .slice(photosAt)
        .match(
          /^<div class="photos">((?:\s*<div class="photo">[\s\S]*?<\/div>)+)\s*<\/div>/,
        );
      if (!photosMatch) break;

      const images = extractPhotoImages(photosMatch[1]);
      if (images.length) items.push({ images });
      cursor = photosAt + photosMatch[0].length;
      continue;
    }

    if (paragraphAt !== -1) {
      const pMatch = body.slice(paragraphAt).match(/^<p>([\s\S]*?)<\/p>/);
      if (!pMatch) break;
      const text = stripTags(pMatch[1]);
      if (text) items.push(text);
      cursor = paragraphAt + pMatch[0].length;
      continue;
    }

    break;
  }

  return items;
}

const paragraphs = [];

const introMatch = article.match(
  /<p class="lede">[\s\S]*?<\/p>\s*<p>([\s\S]*?)<\/p>\s*<section/,
);
if (introMatch) {
  paragraphs.push(stripTags(introMatch[1]));
}

const sections = [
  ...article.matchAll(/<section class="s-([^"]+)"[^>]*>([\s\S]*?)<\/section>/g),
];
for (const [, , body] of sections) {
  const h2 = stripTags(body.match(/<h2>([\s\S]*?)<\/h2>/)[1]);
  paragraphs.push({ parts: [{ strong: h2 }] });
  paragraphs.push(...parseSectionBody(body));
}

const closingMatch = article.match(/<div class="closing">([\s\S]*?)<\/div>/);
if (closingMatch) {
  for (const text of extractPlainParagraphs(closingMatch[1])) {
    paragraphs.push({ parts: [{ strong: text }] });
  }
}

const essay = {
  id: "essay3",
  category: "Design Leadership",
  year: "2026",
  title,
  excerpt: lede,
  lede: [lede, subtitle],
  paragraphs,
};

console.log(
  JSON.stringify(
    {
      title,
      sections: sections.length,
      paragraphCount: paragraphs.length,
      imgIndex,
    },
    null,
    2,
  ),
);
fs.writeFileSync("scripts/essay3-import.json", JSON.stringify(essay, null, 2));
console.log("Wrote scripts/essay3-import.json and", imgIndex, "images");
