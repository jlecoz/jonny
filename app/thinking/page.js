import ExperienceHeadlineDecrypt from "@/components/ExperienceHeadlineDecrypt";
import ScrollReveal from "@/components/ScrollReveal";
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
    <>
      <section className="section section-services" id="thinking">
        <div className="section-services-inner">
          <ScrollReveal>
            <ExperienceHeadlineDecrypt
              as="p"
              className="section-label"
              text="WRITING & PERSPECTIVE"
              decrypt
            />
            <h1 className="section-headline">
              How I think <span className="gold">about design.</span>
            </h1>
            <p className="section-intro">
              Not case studies. Not process walkthroughs. These are the things I&apos;ve had to work out for
              myself — about what design leadership actually costs, and what twenty years of working across cultures
              teaches you about your own assumptions.
            </p>
          </ScrollReveal>

          <ThinkingEssays />
        </div>
      </section>
    </>
  );
}
