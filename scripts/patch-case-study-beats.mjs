import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const CS_LINK =
  '<link rel="stylesheet" href="/works-case-study-cs.css">\n';

const AT_PROBLEM = `
  <!-- ============ BEAT 1 · PROBLEM + CONSTRAINTS ============ -->
  <section class="problem-sec" aria-labelledby="at-problem-heading">
    <div class="dr-wrap">
      <div class="cs">
        <div class="cs-problem">
          <div>
            <p class="cs-eyebrow">The problem</p>
            <h2 id="at-problem-heading">Buyers were ready to transact online. The journey stopped at the forecourt.</h2>
            <p>Auto Trader already owned the audience and the attention. The gap wasn't demand — it was a missing, trusted way to finish the deal online without asking buyers to "buy blind".</p>
          </div>
          <aside class="cs-constraints" aria-label="Project constraints">
            <h3>Constraints</h3>
            <ul>
              <li>Marketplace model — retailers, not Auto Trader, own the stock and the sale</li>
              <li>Trust, not technology, was the real bottleneck</li>
              <li>Mid-pandemic: behaviour shifting fast, evidence still forming</li>
              <li>Forecourt had to stay the trust anchor, not be replaced</li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ BEAT 2 · DESIGN TENSION ============ -->
  <section class="cs-tension-sec" aria-labelledby="at-tension-heading">
    <div class="dr-wrap">
      <div class="cs">
        <div class="cs-tension">
          <p class="cs-eyebrow" id="at-tension-heading">The design tension</p>
          <p class="cs-vs">Bring the journey <em>online</em> — without taking it <em>off the forecourt.</em></p>
        </div>
      </div>
    </div>
  </section>
`;

const AT_REJECTED = `
  <div class="cs">
    <div class="cs-rejected" role="note" aria-labelledby="at-rejected-heading">
      <h3 id="at-rejected-heading">What we rejected — and why</h3>
      <p>The "buy blind" model (Cazoo) removed friction by removing the forecourt — and with it, the trust anchor. We rejected asset-light full-online purchase as the wrong bet for this audience. Cazoo's later collapse retroactively validated the call.</p>
    </div>
  </div>
`;

const AT_OUTCOMES = `
  <!-- ============ BEAT 4 · OUTCOMES ============ -->
  <section aria-labelledby="at-outcomes-heading">
    <div class="cs">
      <p class="cs-eyebrow" id="at-outcomes-heading">Outcomes</p>
      <div class="cs-metrics" role="list">
        <div class="cs-metric" role="listitem">
          <div class="cs-fig">61%→72%</div>
          <div class="cs-lbl">Appeal of digital car-buying, pre- to mid-lockdown</div>
          <div class="cs-src">Consumer research · 5,000 respondents</div>
        </div>
        <div class="cs-metric" role="listitem">
          <div class="cs-fig">~15.5m</div>
          <div class="cs-lbl">Record weekly cross-platform visits</div>
          <div class="cs-src">First-party · FY2021</div>
        </div>
        <div class="cs-metric" role="listitem">
          <div class="cs-fig">+60%</div>
          <div class="cs-lbl">Leads vs 2019, mid-lockdown</div>
          <div class="cs-src">First-party · FY2021</div>
        </div>
        <div class="cs-metric" role="listitem">
          <div class="cs-fig">8.75/10</div>
          <div class="cs-lbl">Buyer confidence index, Lockdown 3</div>
          <div class="cs-src">Consumer research</div>
        </div>
      </div>
    </div>
  </section>
`;

const BREEZE_PROBLEM = `
<!-- ============ BEAT 1 · PROBLEM + CONSTRAINTS ============ -->
<section class="problem-sec" aria-labelledby="bz-problem-heading">
  <div class="page-shell">
    <div class="cs">
      <div class="cs-problem">
        <div>
          <p class="cs-eyebrow">The problem</p>
          <h2 id="bz-problem-heading">Four brands, four codebases, zero shared infrastructure.</h2>
          <p>NGP Digital was shipping across blu, Pulze, Trade App, and Zone — each with its own Figma files, its own component logic, and no whitelabel layer. Every market launch meant rebuilding from scratch. What existed was a UI kit masquerading as a design system.</p>
        </div>
        <aside class="cs-constraints" aria-label="Project constraints">
          <h3>Constraints</h3>
          <ul>
            <li>One system had to serve four distinct brand identities</li>
            <li>Regulated category — consistency and auditability non-negotiable</li>
            <li>Global markets — token pipeline must scale without per-market forks</li>
            <li>Engineering and design naming had to lock before any component work</li>
          </ul>
        </aside>
      </div>
    </div>
  </div>
</section>

<!-- ============ BEAT 2 · DESIGN TENSION ============ -->
<section class="cs-tension-sec" aria-labelledby="bz-tension-heading">
  <div class="page-shell">
    <div class="cs">
      <div class="cs-tension">
        <p class="cs-eyebrow" id="bz-tension-heading">The design tension</p>
        <p class="cs-vs">Unify the <em>structure</em> — without flattening <em>brand identity.</em></p>
      </div>
    </div>
  </div>
</section>
`;

const BREEZE_REJECTED = `
    <div class="cs">
      <div class="cs-rejected" role="note" aria-labelledby="bz-rejected-heading">
        <h3 id="bz-rejected-heading">What we rejected — and why</h3>
        <p>Per-brand Figma libraries and per-market component forks — the default when squads move fast without governance. It looked like speed; it guaranteed drift, duplicated engineering, and a rebuild on every new brand. We rejected siloed UI files in favour of a House of Brands model: one structural library, brand identity resolved at the token layer.</p>
      </div>
    </div>
`;

const BREEZE_OUTCOMES = `
    <div class="cs" style="margin-bottom:2.5rem;">
      <p class="cs-eyebrow" id="bz-outcomes-metrics">Outcomes</p>
      <div class="cs-metrics" role="list" aria-labelledby="bz-outcomes-metrics">
        <div class="cs-metric" role="listitem">
          <div class="cs-fig">3→1</div>
          <div class="cs-lbl">Consumer brands served from one master library (NGP · blu · Pulze)</div>
          <div class="cs-src">System architecture · PoC validation</div>
        </div>
        <div class="cs-metric" role="listitem">
          <div class="cs-fig">0</div>
          <div class="cs-lbl">Custom overrides required at brand switch (button PoC gate)</div>
          <div class="cs-src">Token Studio · Q1 2025 PoC</div>
        </div>
        <div class="cs-metric" role="listitem">
          <div class="cs-fig">40%</div>
          <div class="cs-lbl">Faster dev velocity from a unified component library (projected)</div>
          <div class="cs-src">Industry benchmark · cited in case study</div>
        </div>
        <div class="cs-metric" role="listitem">
          <div class="cs-fig">80%</div>
          <div class="cs-lbl">Cost reduction per new brand instantiation (projected)</div>
          <div class="cs-src">Industry benchmark · whitelabel DS comparables</div>
        </div>
      </div>
    </div>
`;

function ensureCssLink(html) {
  if (html.includes("works-case-study-cs.css")) return html;
  return html.replace(
    '<link rel="stylesheet" href="/works-case-study-tokens.css">',
    `<link rel="stylesheet" href="/works-case-study-tokens.css">\n${CS_LINK}`
  );
}

function patchAutoTrader(html) {
  if (html.includes("at-problem-heading")) {
    console.log("Auto Trader: already patched, skipping");
    return html;
  }

  html = ensureCssLink(html);

  const beforeDiscovery =
    "  <!-- ============ 01 · WHY NOW ============ -->";
  if (!html.includes(beforeDiscovery)) {
    throw new Error("Auto Trader: anchor for problem insert not found");
  }
  html = html.replace(beforeDiscovery, AT_PROBLEM + "\n" + beforeDiscovery);

  const designLead =
    '  <p class="lead reveal">Trust had to be made <em>felt</em> at the three moments confidence collapses:';
  if (!html.includes(designLead)) {
    throw new Error("Auto Trader: anchor for rejected insert not found");
  }
  html = html.replace(designLead, AT_REJECTED + "\n" + designLead);

  const closeBlock = "  <!-- ============ CLOSE ============ -->";
  if (!html.includes(closeBlock)) {
    throw new Error("Auto Trader: anchor for outcomes insert not found");
  }
  html = html.replace(closeBlock, AT_OUTCOMES + "\n\n" + closeBlock);

  return html;
}

function patchBreeze(html) {
  if (html.includes("bz-problem-heading")) {
    console.log("Breeze: already patched, skipping");
    return html;
  }

  html = ensureCssLink(html);

  const afterHero =
    "</div>\n\n\n<!-- ══════════════════════════════════════════\n     SECTION 01 — THE BRIEF";
  if (!html.includes(afterHero)) {
    throw new Error("Breeze: anchor for problem insert not found");
  }
  html = html.replace(afterHero, "</div>\n\n" + BREEZE_PROBLEM + "\n\n<!-- ══════════════════════════════════════════\n     SECTION 01 — THE BRIEF");

  const processIntro =
    '      <p class="section-intro">The Breeze system was not inherited — it was built from a deliberate strategy, with the right team assembled specifically for the work, and a governance model designed to scale beyond the core team.</p>\n    </div>\n\n    <div class="card-grid-3"';
  if (!html.includes(processIntro)) {
    throw new Error("Breeze: anchor for rejected insert not found");
  }
  html = html.replace(
    processIntro,
    `      <p class="section-intro">The Breeze system was not inherited — it was built from a deliberate strategy, with the right team assembled specifically for the work, and a governance model designed to scale beyond the core team.</p>\n    </div>\n\n${BREEZE_REJECTED}\n\n    <div class="card-grid-3"`
  );

  const outcomesHead =
    '      <p class="section-intro">The business case for Breeze is not theoretical — it maps directly to documented industry outcomes for organisations that have committed to whitelabel design systems at this scale.</p>\n    </div>\n\n    <div class="stat-strip"';
  if (!html.includes(outcomesHead)) {
    throw new Error("Breeze: anchor for outcomes insert not found");
  }
  html = html.replace(
    outcomesHead,
    `      <p class="section-intro">The business case for Breeze is not theoretical — it maps directly to documented industry outcomes for organisations that have committed to whitelabel design systems at this scale.</p>\n    </div>\n\n${BREEZE_OUTCOMES}`
  );

  // Remove legacy stat-strip (superseded by .cs-metrics band) if still present
  html = html.replace(
    /\n style="grid-template-columns:repeat\(4,1fr\); margin-bottom:2\.5rem;">[\s\S]*?<\/div>\n\n    <div class="card-grid-3">/,
    "\n\n    <div class=\"card-grid-3\">"
  );
  html = html.replace(
    /\n    <div class="stat-strip" style="grid-template-columns:repeat\(4,1fr\); margin-bottom:2\.5rem;">[\s\S]*?<\/div>\n\n    <div class="card-grid-3">/,
    "\n\n    <div class=\"card-grid-3\">"
  );

  return html;
}

const atPath = path.join(root, "public/autotrader-digital-retailing-case-study.html");
const bzPath = path.join(root, "public/breeze-ds-case-study.html");

let atHtml = fs.readFileSync(atPath, "utf8");
let bzHtml = fs.readFileSync(bzPath, "utf8");

atHtml = patchAutoTrader(atHtml);
bzHtml = patchBreeze(bzHtml);

fs.writeFileSync(atPath, atHtml);
fs.writeFileSync(bzPath, bzHtml);

console.log("Patched autotrader-digital-retailing-case-study.html");
console.log("Patched breeze-ds-case-study.html");
