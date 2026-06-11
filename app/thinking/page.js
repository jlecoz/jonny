import ContactCTA from "@/components/ContactCTA";
import ThinkingEssays from "@/components/ThinkingEssays";
import { siteConfig } from "@/config/siteConfig";

export const metadata = {
  title: "Thinking",
  description:
    "Writing and perspective on design leadership, cross-cultural design, and what twenty years of practice teaches you about your own assumptions.",
  alternates: { canonical: "/thinking" },
  openGraph: {
    title: "Thinking",
    description:
      "Writing and perspective on design leadership, cross-cultural design, and what twenty years of practice teaches you about your own assumptions.",
    url: "/thinking",
    siteName: siteConfig.brand.logoText,
  },
};

export default function ThinkingPage() {
  return (
    <div className="thinking-page">
      <section className="thinking-section" id="thinking">
        <header className="thinking-page-header">
          <p className="thinking-page-eyebrow">Writing &amp; perspective</p>
          <h1 className="thinking-page-title">
            How I think
            <br />
            about design.
          </h1>
          <p className="thinking-page-intro">
            Not case studies. Not process walkthroughs. These are the things I&apos;ve had to work out for myself —
            about what design leadership actually costs, and what twenty years of working across cultures teaches you
            about your own assumptions.
          </p>
        </header>

        <ThinkingEssays />
      </section>

      <ContactCTA />
    </div>
  );
}
