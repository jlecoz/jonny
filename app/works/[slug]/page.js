import { notFound } from "next/navigation";
import { getWorkBySlug, worksProjects } from "@/config/worksProjects";
import CaseStudyPage from "@/components/CaseStudyPage";
import ContactCTA from "@/components/ContactCTA";

export async function generateStaticParams() {
  return worksProjects.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) {
    return { title: "Not found" };
  }

  const title = `${project.title} — Case study`;

  return {
    title,
    description: project.caseStudy.heroDek,
    openGraph: {
      title,
      description: project.caseStudy.heroDek,
      url: `/works/${slug}`,
      ...(project.coverImage ? { images: [{ url: project.coverImage, alt: project.coverAlt || project.title }] } : {}),
    },
    alternates: { canonical: `/works/${slug}` },
  };
}

export default async function WorkCaseStudyRoute({ params }) {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <CaseStudyPage project={project} />
      <ContactCTA />
    </>
  );
}
