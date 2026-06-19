import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { thinkingEssays } from "@/config/thinkingEssays";
import { estimateReadTimeMinutes } from "@/lib/estimateReadTimeMinutes";

const featuredEssay = thinkingEssays[0];
const featuredReadTime = estimateReadTimeMinutes(featuredEssay);

export default function HowIThinkMoment() {
  return (
    <section className="section section-how-i-think" id="how-i-think">
      <div className="section-services-inner">
        <ScrollReveal className="reveal-down">
          <Link href={`/writing#${featuredEssay.id}`} className="how-i-think-feature">
            <div>
              <div className="how-i-think-feature-meta">
                <span>{featuredEssay.category}</span>
                <span className="how-i-think-feature-dot" aria-hidden="true" />
                <span>{featuredEssay.year}</span>
                <span className="how-i-think-feature-dot" aria-hidden="true" />
                <span>{featuredReadTime} min read</span>
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
