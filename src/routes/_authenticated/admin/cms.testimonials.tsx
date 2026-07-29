import { createFileRoute } from "@tanstack/react-router";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/cms/testimonials")({
  head: () => ({ meta: [{ title: "Testimonials CMS | Flash Admin" }] }),
  component: () => (
    <AdminCrud
      table="testimonials"
      title="Testimonials"
      description="Client testimonials shown on the homepage."
      searchColumn="author_name"
      displayColumns={[
        { key: "author_name", label: "Author" },
        { key: "author_role", label: "Role" },
        { key: "rating", label: "Rating" },
        { key: "sort_order", label: "Order" },
        { key: "published", label: "Published", render: (r) => (r.published ? "Yes" : "No") },
      ]}
      fields={[
        { key: "author_name", label: "Author name", type: "text", required: true },
        { key: "author_role", label: "Role / company", type: "text" },
        { key: "author_image", label: "Author image", type: "image", colSpan: 2 },
        { key: "quote", label: "Quote", type: "textarea", colSpan: 2, required: true },
        { key: "rating", label: "Rating (1-5)", type: "number" },
        { key: "sort_order", label: "Sort order", type: "number" },
        { key: "published", label: "Published", type: "boolean" },
      ]}
    />
  ),
});
