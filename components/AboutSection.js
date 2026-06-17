"use client";

import ExperienceHeadlineDecrypt from "@/components/ExperienceHeadlineDecrypt";
import PitchPresenceImage from "@/components/PitchPresenceImage";

export default function AboutSection() {
  return (
    <section className="section cv-pitch-section" id="about">
      <div className="section-services-inner">
        <div className="about-hero-intro">
          <ExperienceHeadlineDecrypt
            as="p"
            className="section-label"
            text="ABOUT"
            decrypt
          />
          <h1 className="cv-pitch-headline">
            I make complex things{" "}
            <span className="gold">feel obvious.</span>
          </h1>
          <p className="section-intro">
            Twenty years of design across four countries — building the products, the teams, and the
            systems that let an idea survive contact with a real organisation. I design. And I build.
            Knowing both is what lets me tell a real constraint from an imagined one.
          </p>
        </div>

        <div className="cv-pitch-card is-pitch-copy-revealed">
          <div className="cv-pitch-copy-body">
            <div className="cv-pitch-avatar-target is-settled" aria-hidden="true">
              <PitchPresenceImage
                src="/img/pitch-jonathan-harvest.webp"
                alt=""
                width={1024}
                height={576}
              />
            </div>
            <div className="cv-pitch-copy-content">
              <p className="cv-pitch-copy-label">What I actually do</p>
              <h2 className="cv-pitch-copy-headline">
                I don&apos;t ship deliverables. I change how organisations{" "}
                <span className="gold">decide.</span>
              </h2>
              <p className="cv-pitch-copy">
                Anyone can produce a screen. The harder, rarer work is the part nobody photographs:
                negotiating the contracts, rewriting the governance, bringing in the tooling, and shifting
                a culture from <strong>opinions to evidence</strong> so good decisions outlive whoever was
                in the room that day.
              </p>
              <p className="cv-pitch-copy">
                I&apos;ve done that inside a marketplace, a fintech, and one of the most heavily-regulated
                industries there is. The constraints change. The method doesn&apos;t: understand the human
                deeply enough to make a better decision — then build the system that makes that decision
                repeatable.
              </p>
              <blockquote className="cv-pitch-copy-quote">
                <p>
                  Twenty years across four countries taught me the job isn&apos;t applying design
                  principles. It&apos;s interrogating assumptions —{" "}
                  <span className="gold">starting with my own.</span>
                </p>
              </blockquote>
            </div>
          </div>
        </div>

        <h2 className="section-headline section-headline-outside">
          Most design leadership gets told as a victory lap. This is the other
          version —{" "}
          <span className="gold">
            what it takes to put humans at the centre of a business that
            wasn&apos;t built for them.
          </span>
        </h2>
      </div>
    </section>
  );
}

