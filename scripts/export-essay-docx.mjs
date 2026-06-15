import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sizeOf from "image-size";
import {
  AlignmentType,
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { thinkingEssays } from "../config/thinkingEssays.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const publicDir = path.join(rootDir, "public");

const essayId = process.argv[2] || "essay3";
const essay = thinkingEssays.find((item) => item.id === essayId);

if (!essay) {
  console.error(`Essay not found: ${essayId}`);
  process.exit(1);
}

const slug = essay.title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");
const desktopDir = path.join(process.env.USERPROFILE || rootDir, "Desktop");
const outputBase = path.join(desktopDir, slug);
const maxImageWidth = 520;

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function imageType(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  if (ext === ".png") return "png";
  if (ext === ".gif") return "gif";
  if (ext === ".bmp") return "bmp";
  return "jpg";
}

function imageDimensions(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  const dimensions = sizeOf(imageBuffer);
  const width = Math.min(maxImageWidth, dimensions.width || maxImageWidth);
  const ratio = width / (dimensions.width || width);
  const height = Math.max(120, Math.round((dimensions.height || width * 0.75) * ratio));
  return { imageBuffer, width, height };
}

function imageParagraph(image, htmlParts) {
  const imagePath = path.join(publicDir, image.src.replace(/^\//, ""));
  if (!fs.existsSync(imagePath)) {
    const missing = `[Image missing: ${image.alt}]`;
    htmlParts.push(`<p><em>${escapeHtml(missing)}</em></p>`);
    return [
      new Paragraph({
        children: [new TextRun({ text: missing, italics: true })],
        spacing: { after: 240 },
      }),
    ];
  }

  const { imageBuffer, width, height } = imageDimensions(imagePath);
  const mime = imageType(imagePath) === "png" ? "image/png" : "image/jpeg";
  const dataUri = `data:${mime};base64,${imageBuffer.toString("base64")}`;
  htmlParts.push(
    `<figure><img src="${dataUri}" alt="${escapeHtml(image.alt)}" width="${width}" /><figcaption>${escapeHtml(image.alt)}</figcaption></figure>`,
  );

  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new ImageRun({
          type: imageType(imagePath),
          data: imageBuffer,
          transformation: { width, height },
        }),
      ],
      spacing: { before: 200, after: 120 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: image.alt, italics: true, size: 20 })],
      spacing: { after: 280 },
    }),
  ];
}

function bodyParagraph(text, htmlParts) {
  htmlParts.push(`<p>${escapeHtml(text)}</p>`);
  return new Paragraph({
    children: [new TextRun({ text, size: 24 })],
    spacing: { after: 240 },
  });
}

function sectionHeading(text, htmlParts) {
  htmlParts.push(`<h2>${escapeHtml(text)}</h2>`);
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 320, after: 200 },
    children: [new TextRun({ text, bold: true, size: 28 })],
  });
}

const children = [];
const htmlParts = [];

const ledeParagraphs = Array.isArray(essay.lede) ? essay.lede : [essay.lede];

htmlParts.push("<!DOCTYPE html>");
htmlParts.push('<html lang="en"><head><meta charset="utf-8" />');
htmlParts.push(`<title>${escapeHtml(essay.title)}</title>`);
htmlParts.push(
  "<style>body{font-family:Georgia,serif;max-width:680px;margin:2rem auto;line-height:1.6;color:#222}h1{font-size:2rem;margin-bottom:.25rem}h2{margin-top:2rem;font-size:1.25rem}p.lede{font-size:1.1rem}p.subtitle{font-style:italic;color:#555}figure{margin:1.5rem 0}img{max-width:100%;height:auto;display:block;margin:0 auto}figcaption{font-size:.85rem;color:#666;text-align:center;margin-top:.5rem}.closing{font-weight:700;font-style:italic;text-align:center;margin-top:2rem}.byline{margin-top:2.5rem;padding-top:1rem;border-top:1px solid #ccc;font-size:.8rem;color:#888;text-transform:uppercase}</style>",
);
htmlParts.push("</head><body>");
htmlParts.push(`<p class="eyebrow">${escapeHtml(`${essay.category} · ${essay.year}`)}</p>`);
htmlParts.push(`<h1>${escapeHtml(essay.title)}</h1>`);

children.push(
  new Paragraph({
    children: [
      new TextRun({
        text: `${essay.category} · ${essay.year}`,
        size: 20,
        color: "666666",
      }),
    ],
    spacing: { after: 160 },
  }),
);

children.push(
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text: essay.title, bold: true, size: 48 })],
    spacing: { after: 200 },
  }),
);

ledeParagraphs.forEach((paragraph, index) => {
  const className = index === 0 ? "lede" : "subtitle";
  htmlParts.push(`<p class="${className}">${escapeHtml(paragraph)}</p>`);
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: paragraph,
          size: index === 0 ? 26 : 24,
          italics: index > 0,
        }),
      ],
      spacing: { after: 240 },
    }),
  );
});

for (const block of essay.paragraphs) {
  if (typeof block === "string") {
    children.push(bodyParagraph(block, htmlParts));
    continue;
  }

  if (block.images) {
    for (const image of block.images) {
      children.push(...imageParagraph(image, htmlParts));
    }
    continue;
  }

  if (block.parts) {
    const text = block.parts
      .map((part) => (typeof part === "string" ? part : part.strong))
      .join("");

    const isSectionHeading =
      block.parts.length === 1 &&
      typeof block.parts[0] !== "string" &&
      block.parts[0].strong?.includes("version:");

    const isClosing =
      block.parts.length === 1 &&
      typeof block.parts[0] !== "string" &&
      block.parts[0].strong?.startsWith("The critique is not");

    if (isSectionHeading) {
      children.push(sectionHeading(block.parts[0].strong, htmlParts));
      continue;
    }

    if (isClosing) {
      htmlParts.push(`<p class="closing">${escapeHtml(text)}</p>`);
      children.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 360, after: 240 },
          children: [new TextRun({ text, bold: true, italics: true, size: 28 })],
        }),
      );
      continue;
    }

    htmlParts.push(`<p><strong>${escapeHtml(text)}</strong></p>`);
    children.push(
      new Paragraph({
        children: block.parts.map((part) =>
          typeof part === "string"
            ? new TextRun({ text: part, size: 24 })
            : new TextRun({ text: part.strong, bold: true, size: 24 }),
        ),
        spacing: { after: 240 },
      }),
    );
  }
}

htmlParts.push('<p class="byline">Jonathan Le Coz · Experiential Designer · 2026</p>');
htmlParts.push("</body></html>");

children.push(
  new Paragraph({
    spacing: { before: 400, after: 120 },
    children: [
      new TextRun({
        text: "Jonathan Le Coz · Experiential Designer · 2026",
        size: 20,
        color: "666666",
      }),
    ],
  }),
);

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
        },
      },
      children,
    },
  ],
});

const docxPath = `${outputBase}.docx`;
const htmlPath = `${outputBase}.html`;
const buffer = await Packer.toBuffer(doc);

fs.writeFileSync(docxPath, buffer);
fs.writeFileSync(htmlPath, htmlParts.join("\n"), "utf8");

console.log(`Wrote ${docxPath}`);
console.log(`Wrote ${htmlPath}`);
