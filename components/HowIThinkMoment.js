import Link from "next/link";
import ExperienceHeadlineDecrypt from "@/components/ExperienceHeadlineDecrypt";
import ScrollReveal from "@/components/ScrollReveal";
import { thinkingEssays } from "@/config/thinkingEssays";

const featuredEssay = thinkingEssays[0];

export default function HowIThinkMoment() {
  return (
    <section className="section section-how-i-think" id="how-i-think">
      <div className="section-services-inner">
        <ScrollReveal>
          <ExperienceHeadlineDecrypt as="p" className="section-label" text="WRITING" decrypt />
          <h2 className="section-headline">
            How I think <span className="gold">about design.</span>
          </h2>
          <p className="section-intro">
            Not case studies. Not process walkthroughs. These are the things I&apos;ve had to work out for
            myself — about what design leadership actually costs, and what twenty years of working across
            cultures teaches you about your own assumptions.
          </p>
        </ScrollReveal>

        <ScrollReveal className="reveal-down">
          <Link href={`/thinking#${featuredEssay.id}`} className="how-i-think-feature">
            <div>
              <div className="how-i-think-feature-meta">
                <span>{featuredEssay.category}</span>
                <span className="how-i-think-feature-dot" aria-hidden="true" />
                <span>{featuredEssay.year}</span>
              </div>
              <h3 className="how-i-think-feature-title">{featuredEssay.title}</h3>
              <p className="how-i-think-feature-excerpt">{featuredEssay.excerpt}</p>
            </div>
            <span className="how-i-think-feature-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
