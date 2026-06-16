import AboutSection from "@/components/AboutSection";
import { siteConfig } from "@/config/siteConfig";

const title = "About";
const description =
  "About Jonathan Le Coz — design leadership across product strategy, systems, and delivery.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title,
    description,
    url: "/about",
    siteName: siteConfig.brand.logoText,
  },
};

export default function AboutPage() {
  return <AboutSection />;
}

