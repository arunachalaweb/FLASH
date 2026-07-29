import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero, FooterCTA } from "@/components/site/PageHero";
import { ProjectsGallery } from "@/components/site/ProjectsGallery";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects | Flash Renewable Energy Solutions" },
      {
        name: "description",
        content:
          "Explore Flash Renewable Energy's residential, commercial, industrial and utility-scale solar installations across India.",
      },
      { property: "og:title", content: "Our Projects — Flash Renewable Energy" },
      {
        property: "og:description",
        content: "Powering every sector — residential, commercial, industrial and utility-scale.",
      },
      { property: "og:url", content: "https://www.flashrenewable.com/projects" },
    ],
    links: [{ rel: "canonical", href: "https://www.flashrenewable.com/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Header overlay />
      <PageHero
        title="Our Projects"
        crumb="Projects"
        tagline="A curated look at recent installations. Tap any tile for full project details."
      />

      <section className="relative overflow-hidden bg-brand-navy-deep text-white py-20">
        <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand-gold/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <ProjectsGallery />
        </div>
      </section>

      <FooterCTA />
      <Footer />
    </div>
  );
}
