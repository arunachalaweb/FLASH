import { createFileRoute } from "@tanstack/react-router";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/cms/pages")({
  head: () => ({ meta: [{ title: "Page Content | Flash Admin" }] }),
  component: () => (
    <AdminCrud
      table="page_content"
      title="Page Content"
      description="Edit headlines, descriptions and copy blocks."
      searchColumn="section_key"
      orderBy={{ column: "page_slug", ascending: true }}
      displayColumns={[
        { key: "page_slug", label: "Page" },
        { key: "section_key", label: "Section" },
        { key: "title", label: "Title" },
        { key: "subtitle", label: "Subtitle" },
      ]}
      fields={[
        {
          key: "page_slug",
          label: "Page slug",
          type: "text",
          required: true,
          placeholder: "home, about...",
        },
        {
          key: "section_key",
          label: "Section key",
          type: "text",
          required: true,
          placeholder: "hero, cta...",
        },
        { key: "title", label: "Title", type: "text", colSpan: 2 },
        { key: "subtitle", label: "Subtitle", type: "text", colSpan: 2 },
        { key: "body", label: "Body", type: "textarea", colSpan: 2 },
        { key: "image_url", label: "Image", type: "image", colSpan: 2 },
      ]}
    />
  ),
});
