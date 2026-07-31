import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { ShieldAlert, CreditCard, ChevronLeft, CheckCircle } from "lucide-react";
import { getCart, clearCart, type CartItem } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout | FLASH Shop" },
      { name: "description", content: "Enter shipping details to secure your order." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [orderNum, setOrderNum] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    paymentMethod: "cod" // Cash on Delivery or Bank Transfer
  });

  useEffect(() => {
    const items = getCart();
    setCart(items);
    if (items.length === 0) {
      navigate({ to: "/products" });
    }

    // Prefill user details if logged in
    const customer = localStorage.getItem("customer_user");
    const token = localStorage.getItem("customer_token");
    if (customer && token) {
      try {
        const user = JSON.parse(customer);
        setFormData((prev) => ({
          ...prev,
          name: user.name || "",
          phone: user.phone || ""
        }));
        
        // Fetch detailed profile to prefill address
        fetch("http://localhost:4000/api/customer/profile", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            setFormData(prev => ({
              ...prev,
              address: data.address_line1 || "",
              city: data.city || "",
              state: data.state || "",
              postalCode: data.postal_code || ""
            }));
          }
        });
      } catch (e) {}
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("customer_token");
    const payload = {
      cart: cart.map(item => ({ id: item.id, quantity: item.quantity })),
      shipping_name: formData.name,
      shipping_phone: formData.phone,
      shipping_address: formData.address,
      shipping_city: formData.city,
      shipping_state: formData.state,
      shipping_postal_code: formData.postalCode,
      payment_method: formData.paymentMethod
    };

    try {
      const res = await fetch("http://localhost:4000/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Order creation failed");
      }

      setOrderNum(data.order.order_number);
      clearCart();
      setCompleted(true);
      toast.success("Order placed successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to process checkout transaction.");
    } finally {
      setLoading(false);
    }
  };

  // Pricing calculations
  const itemsSubtotal = cart.reduce((sum, item) => {
    const price = item.sale_price ?? item.price;
    return sum + (price * item.quantity);
  }, 0);
  const estimatedTax = itemsSubtotal * 0.18;
  const grandTotal = itemsSubtotal + estimatedTax;

  if (completed) {
    return (
      <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col justify-between">
        <Header />
        <main className="py-20 max-w-xl mx-auto px-4 text-center">
          <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6 animate-bounce" />
          <h1 className="text-3xl font-black">Order Placed Successfully!</h1>
          <p className="text-slate-400 mt-3">Thank you for your purchase. We are processing your request.</p>
          <div className="my-6 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
            <span className="text-xs text-slate-500 font-mono block">Order Reference</span>
            <span className="text-lg font-bold text-primary font-mono">{orderNum}</span>
          </div>
          <p className="text-xs text-slate-500">A tax invoice has been automatically generated in your account details.</p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link to="/products" className="px-6 py-2.5 bg-slate-800 border border-slate-700 text-white font-bold rounded-lg hover:bg-slate-750 transition">
              Continue Shopping
            </Link>
            <Link to="/customer/dashboard" className="px-6 py-2.5 bg-primary text-slate-900 font-bold rounded-lg hover:bg-primary-hover transition">
              Go to Dashboard
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col justify-between">
      <div>
        <Header />
        <PageHero
          title="Secure Checkout"
          subtitle="Confirm shipping and billing details to finalize your solar hardware acquisition."
        />

        <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition mb-8 font-medium"
          >
            <ChevronLeft className="h-4 w-4" /> Return to Cart
          </Link>

          <form onSubmit={handleCheckoutSubmit} className="lg:grid lg:grid-cols-3 lg:gap-10">
            {/* Shipping Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800/20 border border-slate-700/40 rounded-3xl p-6 md:p-8 space-y-6">
                <h3 className="text-xl font-bold text-white border-b border-slate-700/40 pb-4">Shipping Destination</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-450 uppercase tracking-wider block">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ganesh Kumar"
                      className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-450 uppercase tracking-wider block">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-xs font-semibold text-slate-455 uppercase tracking-wider block">Detailed Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House No, Street, Landmark"
                      className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-450 uppercase tracking-wider block">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Chennai"
                      className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-450 uppercase tracking-wider block">State</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Tamil Nadu"
                      className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-450 uppercase tracking-wider block">Postal Code (PIN)</label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="600001"
                      className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-450 uppercase tracking-wider block">Payment Option</label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
                    >
                      <option value="cod">Cash on Delivery (COD)</option>
                      <option value="bank">Direct Bank Transfer</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Side summary panel */}
            <div className="mt-8 lg:mt-0">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-3xl p-6 space-y-6 sticky top-24 shadow-xl">
                <h3 className="text-xl font-bold border-b border-slate-700/40 pb-4 text-white">Your Order</h3>

                {/* Items */}
                <div className="max-h-48 overflow-y-auto space-y-3 pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs text-slate-350">
                      <span className="line-clamp-1">{item.name} × {item.quantity}</span>
                      <span className="text-white font-semibold">
                        ₹{((item.sale_price ?? item.price) * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                <hr className="border-slate-700/40" />

                <div className="space-y-3 text-sm font-medium">
                  <div className="flex justify-between text-slate-400">
                    <span>Items Subtotal</span>
                    <span className="text-white">₹{itemsSubtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>GST (18%)</span>
                    <span className="text-white">₹{estimatedTax.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Shipping</span>
                    <span className="text-green-500">FREE</span>
                  </div>

                  <hr className="border-slate-700/40" />

                  <div className="flex justify-between text-base font-bold">
                    <span className="text-white">Grand Total</span>
                    <span className="text-primary text-lg">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/50 flex items-start gap-2.5">
                  <ShieldAlert className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-450 leading-relaxed">
                    By submitting your order, you agree to our terms of service. Flash PV panels and modules are backed by standard warranties.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary text-slate-900 font-bold rounded-lg hover:bg-primary-hover transition flex items-center justify-center gap-2 shadow-lg disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {loading ? "Processing Order..." : "Confirm & Place Order"}
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>

      <Footer />
    </div>
  );
}
