import Link from "next/link";
import ContactCtaBackground from "@/components/ContactCtaBackground";
import ScrollReveal from "@/components/ScrollReveal";
import { cv } from "@/config/cvData";

export default function ContactCTA() {
  return (
    <section className="section section-contact-cta">
      <ContactCtaBackground />
      <div className="section-services-inner section-contact-cta-inner">
        <ScrollReveal stagger>
          <h2 className="section-headline contact-cta-headline-shimmer reveal reveal-fade" data-reveal>
            Available for <span className="gold">product design leadership</span> and advisory work.
          </h2>
          <p className="section-intro reveal reveal-down" data-reveal>
            Reach out about product design leadership via email and I&rsquo;ll respond as soon as I can.
          </p>
          <div className="cta-row reveal reveal-down" style={{ justifyContent: "center" }} data-reveal>
            <Link className="button button-gold" href="/contact">
              Contact
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
