import { siteConfig } from "@/config/siteConfig";
import { worksProjects } from "@/config/worksProjects";

export default function sitemap() {
  const base = siteConfig.siteUrl;
  const now = new Date();

  const workUrls = worksProjects.map((w) => `${base}/works/${w.slug}`);

  const urls = [
    base,
    ...workUrls,
    `${base}/education`,
    `${base}/writing`,
    `${base}/skills`,
    `${base}/#recommendations`,
  ];

  return urls.map((url, i) => ({
    url,
    lastModified: now,
    changeFrequency: "monthly",
    priority: i === 0 ? 1 : 0.7,
  }));
}
