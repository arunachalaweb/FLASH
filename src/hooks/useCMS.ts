import { useState, useEffect } from "react";

export type HeroSlide = {
  id: string;
  page_slug: string;
  title: string | null;
  subtitle: string | null;
  image_url: string;
  button_text: string | null;
  button_link: string | null;
  sort_order: number;
};

export type PageContent = {
  id: string;
  page_slug: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
};

export function useCMS(pageSlug: string) {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [content, setContent] = useState<Record<string, PageContent>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const isDev = import.meta.env.DEV;
    const BACKEND_URL = isDev ? "http://localhost:4000" : "";

    async function loadCMS() {
      try {
        const [slidesRes, contentRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/hero_slides`),
          fetch(`${BACKEND_URL}/api/page_content`),
        ]);

        if (!active) return;

        if (slidesRes.ok && contentRes.ok) {
          const slidesData: HeroSlide[] = await slidesRes.json();
          const contentData: PageContent[] = await contentRes.json();

          // Filter by pageSlug and sort slides
          const filteredSlides = slidesData
            .filter((s) => s.page_slug === pageSlug)
            .sort((a, b) => a.sort_order - b.sort_order);

          // Map page content by section_key
          const mappedContent: Record<string, PageContent> = {};
          contentData
            .filter((c) => c.page_slug === pageSlug)
            .forEach((c) => {
              mappedContent[c.section_key] = c;
            });

          setSlides(filteredSlides);
          setContent(mappedContent);
        }
      } catch (err) {
        console.error("Error loading CMS content:", err);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadCMS();
    return () => {
      active = false;
    };
  }, [pageSlug]);

  return { slides, content, loading };
}
