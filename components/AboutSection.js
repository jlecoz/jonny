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
            I build teams that make
            <br />
            complex things feel simple.
          </h1>
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
              <p className="cv-pitch-copy">
                <strong>10 years leading UX</strong> across SaaS, ecommerce, and digital products - from{" "}
                <strong>pixels to strategy</strong>, from <strong>solo contributor to team builder</strong>.
              </p>
              <p className="cv-pitch-copy">
                During my current endeavor, I have{" "}
                <strong>built our Digital R&amp;D from the ground up.</strong> Taking a team of two ad-hoc
                designers into a <strong>full-blown in-house design agency</strong> with 3 Product
                Designers, 3 UX Researchers, 1 Systems Design Lead and 3 Front-end engineers.
              </p>
              <p className="cv-pitch-copy">
                My team, located in Amsterdam, worked{" "}
                <strong>hand in hand with two large external digital partners</strong> located in London,
                Publicis Sapient and Live &amp; Breathe. Together, we{" "}
                <strong>defined, shaped, tested, delivered and measured the experiences</strong> for
                blu.com and pulze.com under Imperial Brands PLC.
              </p>
              <p className="cv-pitch-copy">
                The organisation was lacking in tools and processes to{" "}
                <strong>make design process efficient, consistent and robust</strong>. Negotiating the
                contracts, working with leadership and stakeholders across departments, and putting in
                place the requests and governance models. I brought UserTesting.com, Figma, and Hotjar
                to Imperial to <strong>evolve their old legacy design workflows and systems</strong>,
                drastically <strong>improving file structure and visibility</strong> and injecting
                human-centric consumer culture to the core of the business&apos; digital pathways and
                channels.
              </p>
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

