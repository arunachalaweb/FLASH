import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { ShieldAlert, CreditCard, ChevronLeft, CheckCircle, Smartphone, Landmark, Check, AlertCircle, ShoppingCart } from "lucide-react";
import { getCart, clearCart, type CartItem } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout | FLASH Solar Shop" },
      { name: "description", content: "Enter shipping details to secure your solar hardware order." },
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

  // Stored values
  const [shippingFee, setShippingFee] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    companyName: "",
    gstin: "",
    paymentMethod: "upi" 
  });

  useEffect(() => {
    const items = getCart();
    setCart(items);
    if (items.length === 0) {
      navigate({ to: "/products" });
    }

    setShippingFee(parseFloat(localStorage.getItem("checkout_shipping_fee") || "0"));
    setCouponDiscount(parseFloat(localStorage.getItem("checkout_discount") || "0"));
    setCouponCode(localStorage.getItem("checkout_coupon_code") || "");
    const presetPincode = localStorage.getItem("checkout_pincode") || "";
    if (presetPincode) {
      setFormData((prev) => ({ ...prev, postalCode: presetPincode }));
    }

    const customer = localStorage.getItem("customer_user");
    const token = localStorage.getItem("customer_token");
    if (customer && token) {
      try {
        const user = JSON.parse(customer);
        setFormData((prev) => ({
          ...prev,
          name: user.name || "",
          phone: user.phone || "",
          email: user.email || ""
        }));
        
        const isDev = import.meta.env.DEV;
        const BACKEND_URL = isDev ? "http://localhost:4000" : "";
        fetch(`${BACKEND_URL}/api/customer/profile`, {
          headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            setFormData(prev => ({
              ...prev,
              address: data.address_line1 || "",
              city: data.city || "",
              state: data.state || "",
              postalCode: data.postal_code || prev.postalCode
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
    if (cart.length === 0) return;

    setLoading(true);
    try {
      const isDev = import.meta.env.DEV;
      const BACKEND_URL = isDev ? "http://localhost:4000" : "";
      
      const payload = {
        ...formData,
        items: cart.map((i) => ({
          productId: i.id,
          quantity: i.quantity,
          price: i.sale_price ?? i.price
        })),
        shippingFee,
        couponCode,
        discountAmount: couponDiscount,
        totalAmount: grandTotal
      };

      const token = localStorage.getItem("customer_token");
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${BACKEND_URL}/api/orders`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");

      setOrderNum(data.order.order_number);
      clearCart();
      localStorage.removeItem("checkout_shipping_fee");
      localStorage.removeItem("checkout_discount");
      localStorage.removeItem("checkout_coupon_code");
      setCompleted(true);
      toast.success("Order placed successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to process order.");
    } finally {
      setLoading(false);
    }
  };

  // Calculations
  const itemsSubtotal = cart.reduce((sum, item) => sum + (item.sale_price ?? item.price) * item.quantity, 0);
  const estimatedTax = itemsSubtotal * 0.18; // 18% GST
  const grandTotal = itemsSubtotal + estimatedTax + shippingFee - couponDiscount;

  if (completed) {
    return (
      <div className="bg-background text-foreground font-sans min-h-screen flex flex-col justify-between">
        <Header overlay />
        <PageHero
          title="Order Confirmed"
          crumb="Success"
          tagline="Your solar power hardware deployment is booked successfully."
        />

        <main className="py-20 max-w-xl mx-auto px-4 text-center space-y-8 text-slate-800">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 border border-green-250 shadow-sm">
            <CheckCircle className="h-10 w-10" />
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-black text-brand-navy">Thank You For Your Order!</h2>
            <p className="text-slate-550 text-xs">
              Your order has been logged into our systems. A logistics executive will contact you for delivery coordination shortly.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-2 text-left font-semibold text-xs">
            <div className="flex justify-between border-b pb-2">
              <span className="text-slate-400">Order Reference No.</span>
              <span className="font-mono text-slate-800 font-bold">{orderNum}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-400">Gate Payment Gateway</span>
              <span className="uppercase text-slate-800 font-mono font-bold">{formData.paymentMethod}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              to="/products"
              className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition border border-border text-xs"
            >
              Continue Shop
            </Link>
            {localStorage.getItem("customer_token") && (
              <Link
                to="/customer/dashboard"
                className="flex-1 py-3 bg-primary text-slate-900 font-bold rounded-2xl hover:bg-primary-hover transition text-xs shadow-xs"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground font-sans min-h-screen flex flex-col justify-between">
      <div>
        <Header overlay />
        <PageHero
          title="Secure Checkout"
          crumb="Checkout"
          tagline="Complete shipping coordinates and choose a payment method to dispatch your cargo."
          compact
        />

        <main className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleCheckoutSubmit} className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
            
            {/* Left 8 Columns: Shipping details and payment methods (Beautiful white cards) */}
            <div className="lg:col-span-8 space-y-8 text-slate-800">
              
              {/* Delivery Coordinates Card */}
              <div className="bg-white border border-border p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
                <div>
                  <h3 className="text-base font-black text-brand-navy">Delivery Coordinates</h3>
                  <p className="text-xs text-slate-500 mt-1">Recipient name, contact number, and cargo shipping address.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Receiver Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Mobile Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-primary"
                  />
                </div>

                {/* B2B / GST Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Company Name (Optional)</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Enter for B2B Invoice"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">GSTIN (Optional)</label>
                    <input
                      type="text"
                      name="gstin"
                      value={formData.gstin}
                      onChange={handleInputChange}
                      placeholder="B2B Input GSTIN"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Full Delivery Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1 col-span-2 sm:col-span-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1 col-span-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">State</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition focus:bg-white focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1 col-span-3 sm:col-span-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Postal PIN Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      disabled
                      value={formData.postalCode}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-450 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Gateway selector card */}
              <div className="bg-white border border-border p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
                <div>
                  <h3 className="text-base font-black text-brand-navy">Choose Payment Gateway</h3>
                  <p className="text-xs text-slate-550 mt-1">Select one of our secure payment gateways to clear your balance.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* UPI */}
                  <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${
                    formData.paymentMethod === "upi" ? "border-primary bg-slate-50" : "border-slate-100 bg-white"
                  }`}>
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-primary" />
                      <div>
                        <span className="font-bold text-xs block text-slate-800">UPI / QR Code</span>
                        <span className="text-[10px] text-slate-450">Instant GPay/PhonePe</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === "upi"}
                      onChange={handleInputChange}
                      className="accent-primary"
                    />
                  </label>

                  {/* Razorpay */}
                  <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${
                    formData.paymentMethod === "razorpay" ? "border-primary bg-slate-50" : "border-slate-100 bg-white"
                  }`}>
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div>
                        <span className="font-bold text-xs block text-slate-800">Razorpay Gateway</span>
                        <span className="text-[10px] text-slate-450">Cards & Netbanking</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={formData.paymentMethod === "razorpay"}
                      onChange={handleInputChange}
                      className="accent-primary"
                    />
                  </label>

                  {/* Bank Transfer */}
                  <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${
                    formData.paymentMethod === "bank_transfer" ? "border-primary bg-slate-50" : "border-slate-100 bg-white"
                  }`}>
                    <div className="flex items-center gap-3">
                      <Landmark className="h-5 w-5 text-primary" />
                      <div>
                        <span className="font-bold text-xs block text-slate-800">Bank Transfer (NEFT)</span>
                        <span className="text-[10px] text-slate-450">B2B Proforma Invoices</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === "bank_transfer"}
                      onChange={handleInputChange}
                      className="accent-primary"
                    />
                  </label>

                  {/* COD */}
                  <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${
                    formData.paymentMethod === "cod" ? "border-primary bg-slate-50" : "border-slate-100 bg-white"
                  }`}>
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="h-5 w-5 text-primary" />
                      <div>
                        <span className="font-bold text-xs block text-slate-800">Cash on Delivery</span>
                        <span className="text-[10px] text-slate-450">Pay at unloading point</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                      className="accent-primary"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Summary Checkout Panel */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-border space-y-6 shadow-sm text-slate-800">
                <h3 className="font-black text-sm border-b border-slate-100 pb-3 text-brand-navy flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-primary" /> Order Summary
                </h3>
                
                <div className="max-h-60 overflow-y-auto space-y-3.5 pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs text-slate-655">
                      <span className="line-clamp-1">{item.name} × {item.quantity}</span>
                      <span className="font-mono font-bold">₹{((item.sale_price ?? item.price) * item.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-3 text-xs text-slate-500 font-semibold">
                  <div className="flex justify-between">
                    <span>Goods Subtotal</span>
                    <span className="font-mono text-slate-800">₹{itemsSubtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CGST & SGST (18%)</span>
                    <span className="font-mono text-slate-800">₹{estimatedTax.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Logistics Shipping</span>
                    <span className="font-mono text-slate-800">₹{shippingFee.toLocaleString("en-IN")}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>Discount ({couponCode})</span>
                      <span className="font-mono">-₹{couponDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <hr className="border-slate-100" />
                  <div className="flex justify-between text-slate-850 font-black text-sm">
                    <span>Grand Total</span>
                    <span className="font-mono text-primary text-base">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-primary to-brand-gold text-brand-navy-deep font-black rounded-2xl shadow-md hover:shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50 text-xs"
                >
                  {loading ? "Processing Order..." : "Place Secure Order"}
                </button>
              </div>
              
              <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs text-slate-550 hover:text-primary transition font-bold px-2">
                <ChevronLeft className="h-4 w-4" /> Return to Cart
              </Link>
            </div>

          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
}
