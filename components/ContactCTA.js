import Link from "next/link";
import ContactCtaBackground from "@/components/ContactCtaBackground";
import ScrollReveal from "@/components/ScrollReveal";
import { siteConfig } from "@/config/siteConfig";

export default function ContactCTA() {
  return (
    <section className="section section-contact-cta">
      <ContactCtaBackground />
      <div className="section-services-inner section-contact-cta-inner">
        <ScrollReveal stagger>
          <h2 className="section-headline contact-cta-headline-shimmer reveal reveal-fade" data-reveal>
            Available for <span className="gold">design leadership</span> across Benelux.
          </h2>
          <p className="section-intro reveal reveal-down" data-reveal>
            Reach out about Design Director and Head of Design roles in Belgium and the Netherlands
            &mdash; I&rsquo;ll respond as soon as I can.
          </p>
          <p className="hero-availability contact-availability reveal reveal-down" data-reveal>
            {siteConfig.availability}
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
