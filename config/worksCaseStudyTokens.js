import { siteConfig } from "./siteConfig.js";

const t = siteConfig.theme;

/** CSS custom properties for layout + /works/[slug] case study pages. */
export const worksCaseStudyThemeVars = {
  "--color-bg": t.background,
  "--color-fg": t.foreground,
  "--color-accent": t.accent,
  "--color-accent-hover": t.accentAlt,
  "--color-surface": t.surface,
  "--color-surface-2": t.fog,
  "--color-border": t.surfaceBorder,
  "--color-border-soft": "color-mix(in srgb, var(--color-border), transparent 45%)",
  "--color-grey": t.grey,
  "--color-grey-mid": t.greyMid,
  "--color-navy": t.navy,
  "--color-gold-light": t.goldLight,
  "--color-core-teal": t.coreTeal,
  "--color-pixel-blue": t.pixelBlue,
  "--color-void": t.void,
  "--color-deep-teal": t.deepTeal,
  "--color-bright-teal": t.brightTeal,
  "--color-cyan-strike": t.cyanStrike,
  "--color-cyan-light": t.cyanLight,
  "--color-steel": t.steel,
  "--color-fog": t.fog,
  "--color-white": t.white,
  "--color-off-white": t.offWhite,
  "--color-light-gray": t.lightGray,
};

/** Shared :root stylesheet for static HTML case studies + globals.css import. */
export function buildWorksCaseStudyTokensCss() {
  return `/* ═══════════════════════════════════════════════════════
   Works case study token base — sourced from config/siteConfig.js
   Used by: globals.css, breeze-ds-case-study.html, autotrader-digital-retailing-case-study.html
   Regenerate: npm run tokens:works
   ═══════════════════════════════════════════════════════ */
:root {
  color-scheme: light;

  /* Colour — siteConfig.theme */
  --color-bg: ${t.background};
  --color-fg: ${t.foreground};
  --color-accent: ${t.accent};
  --color-accent-hover: ${t.accentAlt};
  --color-surface: ${t.surface};
  --color-surface-2: ${t.fog};
  --color-border: ${t.surfaceBorder};
  --color-border-soft: color-mix(in srgb, var(--color-border), transparent 45%);
  --color-grey: ${t.grey};
  --color-grey-mid: ${t.greyMid};
  --color-navy: ${t.navy};
  --color-gold-light: ${t.goldLight};
  --color-core-teal: ${t.coreTeal};
  --color-pixel-blue: ${t.pixelBlue};
  --color-void: ${t.void};
  --color-deep-teal: ${t.deepTeal};
  --color-bright-teal: ${t.brightTeal};
  --color-cyan-strike: ${t.cyanStrike};
  --color-cyan-light: ${t.cyanLight};
  --color-steel: ${t.steel};
  --color-fog: ${t.fog};
  --color-white: ${t.white};
  --color-off-white: ${t.offWhite};
  --color-light-gray: ${t.lightGray};

  /* Typography — matches app/globals.css */
  --font-display: "nexa", "Nexa", "termina", "neue-haas-grotesk-display", "Helvetica Neue", system-ui, sans-serif;
  --font-heading: "nexa", "Nexa", "termina", "neue-haas-grotesk-text", "Helvetica Neue", system-ui, sans-serif;
  --font-body: "nexa-text", "nexa", "Nexa", "neue-haas-grotesk-text", "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif;
  --font-label: "nexa-text", "nexa", "Nexa", "neue-haas-grotesk-text", "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", "SF Mono", monospace;

  /* Motion */
  --ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --duration-fast: 400ms;
  --duration-mid: 600ms;
  --duration-slow: 800ms;
  --reveal-duration: 0.5s;
  --reveal-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  --reveal-stagger-step: 80ms;
  --reveal-distance: 20px;

  /* Sizing — 8pt scale */
  --size-0: 0px;
  --size-50: 4px;
  --size-100: 8px;
  --size-150: 12px;
  --size-200: 16px;
  --size-300: 24px;
  --size-400: 32px;
  --size-500: 40px;
  --size-600: 48px;
  --size-700: 56px;
  --size-800: 64px;
  --size-900: 72px;
  --size-1000: 80px;
  --size-1100: 88px;
  --size-1200: 96px;

  /* Static HTML case study aliases (autotrader-digital-retailing-case-study.html) */
  --void: var(--color-bg);
  --void-2: var(--color-surface);
  --surface: var(--color-surface);
  --surface-2: var(--color-surface-2);
  --line: var(--color-border);
  --teal: var(--color-core-teal);
  --teal-deep: var(--color-deep-teal);
  --cyan: var(--color-cyan-strike);
  --cyan-soft: var(--color-cyan-light);
  --text: var(--color-fg);
  --muted: var(--color-grey);
  --muted-2: var(--color-grey-mid);
  --warn: #f0a35e;
  --warn-deep: #b86a3a;
}
`;
}
