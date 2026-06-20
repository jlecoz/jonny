import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const videoPath = process.argv[2];
if (!videoPath) {
  console.error("Usage: node scripts/extract-video-frames.mjs <path-to-mp4>");
  process.exit(1);
}

const outDir = path.resolve(process.cwd(), ".tmp_video_frames");
fs.mkdirSync(outDir, { recursive: true });

const videoUrl = `file:///${videoPath.replace(/\\/g, "/").replace(":", "%3A")}`;
const htmlPath = path.resolve(outDir, "view.html");

fs.writeFileSync(
  htmlPath,
  `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      html, body { margin: 0; background: #000; height: 100%; }
      video { width: 100vw; height: 100vh; object-fit: contain; }
    </style>
  </head>
  <body>
    <video id="v" src="${videoUrl}" muted></video>
  </body>
</html>`,
);

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
await page.goto(`file:///${htmlPath.replace(/\\/g, "/").replace(":", "%3A")}`);
await page.waitForSelector("#v");

const times = [0.5, 2.5, 5, 7.5, 10, 12.5, 15, 17.5];
for (let i = 0; i < times.length; i++) {
  const t = times[i];
  await page.evaluate(async (t) => {
    const v = document.querySelector("#v");
    try {
      await v.play();
    } catch {
      // ignore autoplay restrictions in headless
    }
    v.pause();
    v.currentTime = t;
    await new Promise((res) => {
      const on = () => {
        v.removeEventListener("seeked", on);
        res();
      };
      v.addEventListener("seeked", on);
    });
  }, t);

  const filePath = path.resolve(outDir, `frame_${String(i + 1).padStart(2, "0")}.png`);
  await page.screenshot({ path: filePath });
}

await browser.close();
console.log(outDir);

