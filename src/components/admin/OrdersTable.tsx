// src/components/admin/OrdersTable.tsx
import { Order } from "~/api/orders";
import { ColumnDef, useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { ArrowUpDown, ChevronRight } from "lucide-react";

interface OrdersTableProps {
  orders: Order[];
  selectedOrderId: string | null;
  onSelect: (order: Order) => void;
}

const columns: ColumnDef<Order, any>[] = [
  {
    accessorKey: "order_number",
    header: () => <span className="font-semibold">Order Ref</span>,
    cell: info => <span className="font-mono text-xs text-slate-500">{info.getValue()}</span>,
  },
  {
    accessorFn: row => row.shipping_name,
    id: "client",
    header: () => <span className="font-semibold">Client</span>,
    cell: info => (
      <div className="text-sm">
        <div className="font-semibold text-slate-800">{info.getValue()}</div>
        <div className="text-xs text-slate-400">{info.row.original.shipping_city}, {info.row.original.shipping_state}</div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <button className="flex items-center gap-1" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        <span className="font-semibold">Status</span>
        <ArrowUpDown className="h-3 w-3" />
      </button>
    ),
    cell: info => {
      const status = info.getValue() as string;
      const colors: Record<string, string> = {
        completed: "bg-green-50 text-green-600 border border-green-150",
        processing: "bg-blue-50 text-blue-600 border border-blue-150",
        pending: "bg-yellow-50 text-yellow-600 border border-yellow-150",
        cancelled: "bg-red-50 text-red-600 border border-red-150",
        refunded: "bg-purple-50 text-purple-600 border border-purple-150",
      };
      const colorClass = colors[status] ?? "bg-gray-50 text-gray-600";
      return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${colorClass}`}>{status}</span>;
    },
  },
  {
    accessorKey: "total_amount",
    header: () => <span className="font-semibold text-right">Total</span>,
    cell: info => <span className="font-mono font-bold text-right">₹{Number(info.getValue()).toLocaleString("en-IN")}</span>,
  },
];

export function OrdersTable({ orders, selectedOrderId, onSelect }: OrdersTableProps) {
  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting: [],
      columnFilters: [],
      pagination: { pageIndex: 0, pageSize: 10 },
    },
  });

  return (
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 border-b">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="text-left font-semibold px-5 py-4">
                    {header.isPlaceholder ? null : header.renderHeader()}
                  </th>
                ))}
                <th className="w-10 px-5 py-4" />
              </tr>
            ))}
          </thead>
          <tbody className="divide-y text-slate-700">
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                onClick={() => onSelect(row.original)}
                className={`hover:bg-slate-50/50 cursor-pointer transition ${selectedOrderId === row.original.id ? "bg-slate-50/90 font-semibold" : ""}`}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-5 py-4">
                    {cell.renderCell()}
                  </td>
                ))}
                <td className="px-5 py-4 text-right">
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between p-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-2 py-1 text-sm bg-slate-100 rounded disabled:opacity-50"
        >Prev</button>
        <span className="text-sm">Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-2 py-1 text-sm bg-slate-100 rounded disabled:opacity-50"
        >Next</button>
      </div>
    </div>
  );
}
