"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/siteConfig";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Link href="/" className="logo-link" aria-label={`${siteConfig.brand.canonicalTitle}, home`}>
        <img src="/img/digital_ronin.svg" alt="" className="logo-mark" aria-hidden="true" />
        <div className="logo-text">
          <strong className="logo-text-shimmer">{siteConfig.brand.logoText}</strong>
        </div>
      </Link>

      <button
        className="menu-toggle"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        className={`main-nav ${menuOpen ? "open" : ""}`}
        aria-label="Main navigation"
      >
        {siteConfig.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
