// src/api/orders.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface OrderItem {
  id: string;
  product?: { name: string; sku: string };
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  created_at: string;
  order_items: OrderItem[];
  // Additional fields that may be returned by the backend
  coupon?: { code: string; discount: number };
  customer_note?: string;
  shipment?: {
    courier?: string;
    tracking_number?: string;
    vehicle?: string;
    driver?: string;
    dispatch_date?: string;
    status?: string;
  };
}

const isDev = import.meta.env.DEV;
const BACKEND_URL = isDev ? "http://localhost:4000" : "";
const token = localStorage.getItem("admin_token");

// Existing fetch for all orders (unchanged)
const fetchOrders = async (): Promise<Order[]> => {
  const res = await fetch(`${BACKEND_URL}/api/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};

export const useOrders = () => {
  return useQuery<Order[]>(["orders"], fetchOrders, {
    staleTime: 5 * 60 * 1000,
  });
};

// NEW: fetch a single order with full details
const fetchOrder = async (orderId: string): Promise<Order> => {
  const res = await fetch(`${BACKEND_URL}/api/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch order details");
  return res.json();
};

export const useOrder = (orderId: string) => {
  return useQuery<Order>(["order", orderId], () => fetchOrder(orderId), {
    enabled: !!orderId,
    staleTime: 2 * 60 * 1000,
  });
};

// Existing mutation for status updates (unchanged)
const updateOrderStatus = async ({
  orderId,
  field,
  value,
}: {
  orderId: string;
  field: "status" | "payment_status";
  value: string;
}) => {
  const res = await fetch(`${BACKEND_URL}/api/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ [field]: value }),
  });
  if (!res.ok) throw new Error("Failed to update order");
  return res.json();
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(updateOrderStatus, {
    onSuccess: (_, vars) => {
      // Invalidate both the list and the specific order cache
      queryClient.invalidateQueries(["orders"]);
      queryClient.invalidateQueries(["order", vars.orderId]);
    },
  });
};

// Placeholder for invoice generation – backend should return a PDF Blob
export const generateInvoice = async (orderId: string): Promise<Blob> => {
  const res = await fetch(`${BACKEND_URL}/api/orders/${orderId}/invoice`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to generate invoice");
  return res.blob();
};

export const useGenerateInvoice = (orderId: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => generateInvoice(orderId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["order", orderId]);
    },
  });
};
