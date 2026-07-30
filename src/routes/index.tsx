import { createFileRoute } from "@tanstack/react-router";
import { HomeComponent } from "@/components/site/HomeComponent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flash Renewable Energy Solutions | Solar EPC across India" },
      {
        name: "description",
        content:
          "Innovative, sustainable and reliable end-to-end renewable energy solutions for homes, businesses and industries. 500+ projects delivered.",
      },
      { property: "og:title", content: "Flash Renewable Energy Solutions" },
      {
        property: "og:description",
        content: "End-to-end solar EPC — rooftop, ground-mounted, industrial and utility-scale.",
      },
    ],
  }),
  component: HomeComponent,
});
