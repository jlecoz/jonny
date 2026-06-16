import { siteConfig } from "@/config/siteConfig";

const description = "Get in touch with Jonathan Le Coz.";
const title = "Contact";

export async function generateMetadata() {
  return {
    title,
    description,
    openGraph: { title, description, url: "/contact" },
    alternates: { canonical: "/contact" },
  };
}

export default function ContactPage() {
  return (
    <section className="section">
      <p className="section-label">Contact</p>
      <h1 className="section-headline">
        Let&rsquo;s connect <span className="gold">directly.</span>
      </h1>
      <p className="section-intro" style={{ marginBottom: "2rem" }}>
        Email is best. Include a short note on what you&rsquo;re building and what you need.
      </p>

      <div className="content-card">
        <form className="contact-form" action={`mailto:${siteConfig.contactEmail}`}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="6" required />

          <button type="submit" className="button button-gold" style={{ marginTop: "0.5rem" }}>
            Send Message
          </button>
        </form>

        <p className="contact-alt">
          Prefer email? Reach me at{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
          .
        </p>
        <p className="contact-alt" style={{ marginTop: "0.7rem" }}>
          Connect on{" "}
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          .
        </p>
      </div>
    </section>
  );
}
