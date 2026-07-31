import { createFileRoute } from "@tanstack/react-router";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/ecommerce/credit-notes")({
  head: () => ({ meta: [{ title: "Credit Notes | Flash Admin" }] }),
  component: () => (
    <AdminCrud
      table="credit_notes"
      title="Credit Notes Registry"
      description="List of issued refund certificates and credit returns."
      searchColumn="credit_note_number"
      orderBy={{ column: "created_at", ascending: false }}
      displayColumns={[
        { key: "credit_note_number", label: "Credit Note Ref" },
        { key: "amount", label: "Refunded (₹)", render: (r) => `₹${Number(r.amount).toLocaleString("en-IN")}` },
        { key: "reason", label: "Reason for Refund" },
        { key: "created_at", label: "Issued Date", render: (r) => new Date(r.created_at as string).toLocaleDateString() }
      ]}
      fields={[
        { key: "credit_note_number", label: "Ref Number", type: "text", required: true },
        { key: "amount", label: "Amount (INR)", type: "number", required: true },
        { key: "reason", label: "Refund Context/Reason", type: "textarea", colSpan: 2 }
      ]}
    />
  ),
});
