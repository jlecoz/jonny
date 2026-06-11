import "./globals.css";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { siteConfig } from "@/config/siteConfig";

const defaultDescription =
  "Experiential Designer with 20+ years across creative arts, brand design and web technology.";

const title = {
  default: "Jonathan Le Coz — Experiential Designer",
  template: "%s | Jonathan Le Coz",
};

export async function generateMetadata() {
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title,
    description: defaultDescription,
    robots: { index: true, follow: true },
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: "/",
      siteName: siteConfig.brand.logoText,
      title: title.default,
      description: defaultDescription,
      images: [{ url: "/img/digital_ronin.svg", alt: siteConfig.brand.logoText }],
    },
    twitter: {
      card: "summary_large_image",
      title: title.default,
      description: defaultDescription,
      images: ["/img/digital_ronin.svg"],
    },
  };
}

function jsonLdForSite() {
  const sameAs = Object.values(siteConfig.social).filter(
    (href) => typeof href === "string" && href.startsWith("http")
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jonathan Le Coz",
    url: siteConfig.siteUrl,
    description: defaultDescription,
    email: siteConfig.contactEmail,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export default function RootLayout({ children }) {
  const t = siteConfig.theme;
  const typekitKitIds = siteConfig.adobeFontsKitIds ?? ["ejw0fwc"];

  const themeVars = {
    "--color-bg": t.background,
    "--color-fg": t.foreground,
    "--color-accent": t.accent,
    "--color-accent-hover": t.accentAlt,
    "--color-surface": t.surface,
    "--color-border": t.surfaceBorder,
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

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/img/favicon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/img/favicon-180.png" />
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        {typekitKitIds.map((kitId) => (
          <link key={kitId} rel="stylesheet" href={`https://use.typekit.net/${kitId}.css`} />
        ))}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=JetBrains+Mono:wght@400&family=Space+Grotesk:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={themeVars}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdForSite()) }}
        />
        <div className="parallax-container">
          <div className="parallax-bg" aria-hidden="true" />
          <div className="parallax-content">
            <div className="page-shell">
              <SiteHeader />
              <main>{children}</main>
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-services-inner">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/img/digital_ronin.svg" alt="Jonathan Le Coz" className="footer-logo" />
            <strong>{siteConfig.brand.logoText}</strong>
            <p className="footer-tagline">{siteConfig.brand.tagline}</p>
            {siteConfig.contact?.location || siteConfig.contactEmail || siteConfig.contact?.phoneLabel ? (
              <p className="footer-contact">
                {siteConfig.contact?.location ? (
                  <>
                    {siteConfig.contact.location} <span aria-hidden="true">&bull;</span>{" "}
                  </>
                ) : null}
                {siteConfig.contact?.phoneLabel ? (
                  <a href={siteConfig.contact?.phoneHref || "#"}>{siteConfig.contact.phoneLabel}</a>
                ) : null}
              </p>
            ) : null}
            <p className="footer-legal">
              &copy; {new Date().getFullYear()} Jonathan Le Coz. All rights reserved.
            </p>
          </div>

          <nav className="footer-nav">
            <span className="footer-col-title">Navigation</span>
            {siteConfig.nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="footer-social">
            <span className="footer-col-title">Social</span>
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={siteConfig.social.x} target="_blank" rel="noopener noreferrer">
              X
            </a>
            <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
          </div>
        </div>
      </div>

      <p className="footer-copy">
        JONATHAN LE COZ &bull; Experiential Designer
      </p>
    </footer>
  );
}
