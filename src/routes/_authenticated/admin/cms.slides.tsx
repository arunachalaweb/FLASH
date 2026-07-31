import { createFileRoute } from "@tanstack/react-router";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/cms/slides")({
  head: () => ({ meta: [{ title: "Hero Banner Sliders | Flash Admin" }] }),
  component: () => (
    <AdminCrud
      table="hero_slides"
      title="Hero Banner Sliders"
      description="Manage background banner images and overlay text for main page hero sections."
      searchColumn="title"
      orderBy={{ column: "sort_order", ascending: true }}
      displayColumns={[
        { key: "page_slug", label: "Page" },
        { key: "title", label: "Title" },
        {
          key: "image_url",
          label: "Image",
          render: (row: any) => {
            const isDev = import.meta.env.DEV;
            const BACKEND_URL = isDev ? "http://localhost:4000" : "";
            const src = row.image_url ? (row.image_url.startsWith("/") ? `${BACKEND_URL}${row.image_url}` : row.image_url) : "";
            return src ? (
              <img src={src} className="w-16 h-10 object-cover rounded" alt="Slide" />
            ) : null;
          }
        },
        { key: "sort_order", label: "Order" },
      ]}
      fields={[
        {
          key: "page_slug",
          label: "Page slug",
          type: "text",
          required: true,
          placeholder: "home, services...",
        },
        { key: "title", label: "Title", type: "text", colSpan: 2 },
        { key: "subtitle", label: "Subtitle/Description", type: "textarea", colSpan: 2 },
        { key: "image_url", label: "Slide Image", type: "image", required: true, colSpan: 2 },
        { key: "button_text", label: "Button Label", type: "text" },
        { key: "button_link", label: "Button Redirection Link", type: "text" },
        { key: "sort_order", label: "Display Order", type: "number", required: true },
      ]}
    />
  ),
});
