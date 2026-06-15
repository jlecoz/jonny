import sharp from "sharp";

const src =
  "C:/Users/DESKTOP/.cursor/projects/c-Users-DESKTOP-Documents-GitHub-Tridium/assets/c__Users_DESKTOP_AppData_Roaming_Cursor_User_workspaceStorage_ec67c833f379aacedfef6dc26561cda0_images_logomark-wildcat-b085c3c9-2083-492b-a541-fe989c5c530c.png";
const out = "public/img/csu-chico-seal.png";

function isBackgroundWhite(r, g, b) {
  return r > 228 && g > 228 && b > 228;
}

const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const pixelCount = width * height;
const remove = new Uint8Array(pixelCount);
const queue = [];

const index = (x, y) => y * width + x;

for (let x = 0; x < width; x += 1) {
  for (const y of [0, height - 1]) {
    const i = index(x, y);
    const o = i * 4;
    if (isBackgroundWhite(data[o], data[o + 1], data[o + 2]) && !remove[i]) {
      remove[i] = 1;
      queue.push(i);
    }
  }
}

for (let y = 0; y < height; y += 1) {
  for (const x of [0, width - 1]) {
    const i = index(x, y);
    const o = i * 4;
    if (isBackgroundWhite(data[o], data[o + 1], data[o + 2]) && !remove[i]) {
      remove[i] = 1;
      queue.push(i);
    }
  }
}

while (queue.length) {
  const i = queue.pop();
  const x = i % width;
  const y = (i - x) / width;

  for (const [nx, ny] of [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ]) {
    if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
    const ni = index(nx, ny);
    if (remove[ni]) continue;
    const o = ni * 4;
    if (!isBackgroundWhite(data[o], data[o + 1], data[o + 2])) continue;
    remove[ni] = 1;
    queue.push(ni);
  }
}

let removed = 0;
let keptWhite = 0;
for (let i = 0; i < pixelCount; i += 1) {
  const o = i * 4;
  if (remove[i]) {
    data[o + 3] = 0;
    removed += 1;
  } else if (isBackgroundWhite(data[o], data[o + 1], data[o + 2])) {
    keptWhite += 1;
  }
}

await sharp(data, {
  raw: { width, height, channels: 4 },
})
  .png()
  .toFile(out);

console.log(`Wrote ${out} (${width}x${height})`);
console.log(`Removed ${removed} background pixels, kept ${keptWhite} interior white pixels`);
