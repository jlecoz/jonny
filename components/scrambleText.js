const CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

function scrambleAt(i, tick) {
  const x = Math.sin(i * 12.9898 + tick * 0.019) * 43758.5453;
  const f = x - Math.floor(x);
  return CHARSET[Math.floor(f * CHARSET.length) % CHARSET.length];
}

/** Scrambled glyphs for indices ≥ cutoff; spaces stay visible. */
export function buildSegment(text, globalStart, cutoff, tick) {
  let out = "";
  for (let j = 0; j < text.length; j++) {
    const i = globalStart + j;
    const c = text[j];
    if (i < cutoff) {
      out += c;
    } else if (/\s/.test(c)) {
      out += c;
    } else {
      out += scrambleAt(i, tick);
    }
  }
  return out;
}
