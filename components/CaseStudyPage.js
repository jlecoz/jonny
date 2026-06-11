import Link from "next/link";

function SectionBody({ body }) {
  const paras = Array.isArray(body) ? body : [body];
  return (
    <div className="case-study-section-body">
      {paras.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function ProcessDiagram({ steps }) {
  return (
    <div className="case-study-process" aria-label="Process stages">
      {steps.map((s, i) => (
        <div key={s.name} className="case-study-process-step-wrap">
          {i > 0 ? <span className="case-study-process-line" aria-hidden="true" /> : null}
          <div className="case-study-process-step">
            <span className="case-study-process-dot" style={{ background: s.tint }} />
            <span className="case-study-process-name">{s.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function PaletteRow({ colors }) {
  return (
    <ul className="case-study-palette">
      {colors.map((hex) => (
        <li key={hex}>
          <span className="case-study-palette-swatch" style={{ backgroundColor: hex }} />
          <span className="case-study-palette-hex">{hex}</span>
        </li>
      ))}
    </ul>
  );
}

function CaseStudySection({ section }) {
  const { label, title, body, type, quote, attribution, steps, palette } = section;

  return (
    <section className="case-study-section" id={section.id}>
      <p className="case-study-kicker">{label}</p>
      {title ? <h3 className="case-study-section-heading">{title}</h3> : null}

      {type === "process" && steps ? <ProcessDiagram steps={steps} /> : null}

      {type === "quote" && quote ? (
        <blockquote className="case-study-quote">
          <p>{quote}</p>
          {attribution ? <cite>{attribution}</cite> : null}
        </blockquote>
      ) : null}

      {type === "palette" && palette?.length ? <PaletteRow colors={palette} /> : null}

      {body && type !== "quote" && type !== "process" ? <SectionBody body={body} /> : null}
    </section>
  );
}

/** Long-form project narrative — editorial layout inspired by portfolio case studies */
export default function CaseStudyPage({ project }) {
  const cs = project.caseStudy;

  return (
    <article className="case-study-page">
      <nav className="case-study-back" aria-label="Section">
        <Link href="/#works" className="case-study-back-link">
          ← Works
        </Link>
      </nav>

      <header className="case-study-hero">
        <p className="case-study-client">{project.client}</p>
        <h1>{project.title}</h1>
        <p className="case-study-dek">{cs.heroDek}</p>
        {project.coverImage ? (
          <div className="case-study-hero-visual">
            <img src={project.coverImage} alt={project.coverAlt || ""} width={920} height={560} loading="eager" />
          </div>
        ) : null}
      </header>

      <div className="case-study-inner">
        {cs.sections.map((section) => (
          <CaseStudySection key={section.id} section={section} />
        ))}
      </div>

      <footer className="case-study-footer">
        {project.documentationHref ? (
          <Link href={project.documentationHref} className="button button-secondary">
            Documentation
          </Link>
        ) : null}
        <Link href={project.href} className="button button-secondary" target="_blank" rel="noopener noreferrer">
          Visit client site
        </Link>
      </footer>
    </article>
  );
}
