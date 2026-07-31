import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { ShieldAlert, CreditCard, ChevronLeft, CheckCircle, Smartphone, Landmark, Check } from "lucide-react";
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
    setLoading(true);

    const token = localStorage.getItem("customer_token");
    const isDev = import.meta.env.DEV;
    const BACKEND_URL = isDev ? "http://localhost:4000" : "";

    const payload = {
      cart: cart.map(item => ({ id: item.id, quantity: item.quantity })),
      shipping_name: formData.name,
      shipping_phone: formData.phone,
      shipping_address: formData.companyName 
        ? `${formData.companyName} (GSTIN: ${formData.gstin}) - ${formData.address}`
        : formData.address,
      shipping_city: formData.city,
      shipping_state: formData.state,
      shipping_postal_code: formData.postalCode,
      payment_method: formData.paymentMethod,
      coupon_code: couponCode || undefined
    };

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${BACKEND_URL}/api/orders/create`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order placement failed");

      setOrderNum(data.order.order_number);
      setCompleted(true);
      clearCart();
      
      localStorage.removeItem("checkout_shipping_fee");
      localStorage.removeItem("checkout_discount");
      localStorage.removeItem("checkout_coupon_code");
      localStorage.removeItem("checkout_pincode");

      toast.success("Order secured successfully!");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please check your balance.");
    } finally {
      setLoading(false);
    }
  };

  const itemsSubtotal = cart.reduce((sum, item) => {
    const itemPrice = item.sale_price ?? item.price;
    return sum + (itemPrice * item.quantity);
  }, 0);

  const estimatedTax = itemsSubtotal * 0.18; 
  const grandTotal = Math.max(0, (itemsSubtotal + estimatedTax + shippingFee) - couponDiscount);

  if (completed) {
    return (
      <div className="bg-background text-foreground font-sans min-h-screen flex flex-col justify-between">
        <Header overlay />
        <main className="py-20 max-w-xl mx-auto px-4 text-center space-y-6">
          <CheckCircle className="h-20 w-20 text-primary mx-auto" />
          <h1 className="text-3xl font-black text-brand-navy">Order Secured Successfully!</h1>
          <p className="text-slate-550 leading-relaxed text-sm">
            Thank you for choosing FLASH. We are preparing your high-performance solar components for logistics dispatch.
          </p>
          <div className="bg-white border border-border p-6 rounded-3xl text-left space-y-3 font-mono text-sm shadow-sm text-slate-800">
            <div className="flex justify-between border-b border-dashed pb-2">
              <span className="text-slate-500">Order Ref:</span>
              <span className="font-bold text-slate-800">{orderNum}</span>
            </div>
            <div className="flex justify-between border-b border-dashed pb-2">
              <span className="text-slate-500">Method:</span>
              <span className="font-bold text-slate-800 uppercase">{formData.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Paid Amount:</span>
              <span className="font-bold text-primary">₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <div className="flex gap-4 justify-center pt-6">
            <Link to="/products" className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-full transition border border-border">
              Continue Shopping
            </Link>
            <Link to="/customer/dashboard" className="px-6 py-3 bg-gradient-to-r from-primary to-brand-gold text-brand-navy-deep font-bold rounded-full transition shadow-lg">
              Track in Dashboard
            </Link>
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
        />

        <main className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleCheckoutSubmit} className="lg:grid lg:grid-cols-3 lg:gap-10">
            
            {/* Shipping Form Coordinates — styled like the dark-navy Request Free Solar Quote form */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Delivery Coordinates Card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-brand-navy-deep p-6 md:p-8 text-white shadow-[0_25px_60px_-25px_hsl(var(--primary)/0.4)]">
                <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
                <div className="relative space-y-6">
                  <div>
                    <h3 className="font-display text-lg md:text-xl font-bold text-white uppercase tracking-wider">Delivery Coordinates</h3>
                    <p className="text-xs text-white/60 mt-1">Recipient name, contact number, and cargo shipping address.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/50 uppercase">Receiver Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-xs text-white placeholder:text-white/45 outline-none transition focus:bg-white/10 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/50 uppercase">Mobile Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-xs text-white placeholder:text-white/45 outline-none transition focus:bg-white/10 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/50 uppercase">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-xs text-white placeholder:text-white/45 outline-none transition focus:bg-white/10 focus:border-primary"
                    />
                  </div>

                  {/* B2B / GST Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 border border-white/10 p-4 rounded-xl">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/50 uppercase">Company Name (Optional)</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Enter for B2B Invoice"
                        className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-xs text-white placeholder:text-white/45 outline-none transition focus:bg-white/10 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/50 uppercase">GSTIN (Optional)</label>
                      <input
                        type="text"
                        name="gstin"
                        value={formData.gstin}
                        onChange={handleInputChange}
                        placeholder="B2B Input GSTIN"
                        className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-xs text-white placeholder:text-white/45 outline-none transition focus:bg-white/10 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/50 uppercase">Full Delivery Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-xs text-white placeholder:text-white/45 outline-none transition focus:bg-white/10 focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1 col-span-2 sm:col-span-1">
                      <label className="text-[10px] font-bold text-white/50 uppercase">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-xs text-white placeholder:text-white/45 outline-none transition focus:bg-white/10 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1 col-span-1">
                      <label className="text-[10px] font-bold text-white/50 uppercase">State</label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-xs text-white placeholder:text-white/45 outline-none transition focus:bg-white/10 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1 col-span-3 sm:col-span-1">
                      <label className="text-[10px] font-bold text-white/40 uppercase">Postal PIN Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        disabled
                        value={formData.postalCode}
                        className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-xs text-white/50 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Gateway selector card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-brand-navy-deep p-6 md:p-8 text-white shadow-[0_25px_60px_-25px_hsl(var(--primary)/0.4)]">
                <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
                <div className="relative space-y-6">
                  <div>
                    <h3 className="font-display text-lg md:text-xl font-bold text-white uppercase tracking-wider">Choose Payment Gateway</h3>
                    <p className="text-xs text-white/60 mt-1">Select one of our secure payment gateways to clear your balance.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* UPI */}
                    <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition ${
                      formData.paymentMethod === "upi" ? "border-primary bg-white/5" : "border-white/10 bg-white/[0.02]"
                    }`}>
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <div>
                          <span className="font-bold text-xs block text-white">UPI / QR Code</span>
                          <span className="text-[10px] text-white/50">Instant GPay/PhonePe</span>
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
                    <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition ${
                      formData.paymentMethod === "razorpay" ? "border-primary bg-white/5" : "border-white/10 bg-white/[0.02]"
                    }`}>
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div>
                          <span className="font-bold text-xs block text-white">Razorpay Gateway</span>
                          <span className="text-[10px] text-white/50">Cards & Netbanking</span>
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
                    <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition ${
                      formData.paymentMethod === "bank_transfer" ? "border-primary bg-white/5" : "border-white/10 bg-white/[0.02]"
                    }`}>
                      <div className="flex items-center gap-3">
                        <Landmark className="h-5 w-5 text-primary" />
                        <div>
                          <span className="font-bold text-xs block text-white">Bank Transfer (NEFT)</span>
                          <span className="text-[10px] text-white/50">B2B Proforma Invoices</span>
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
                    <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition ${
                      formData.paymentMethod === "cod" ? "border-primary bg-white/5" : "border-white/10 bg-white/[0.02]"
                    }`}>
                      <div className="flex items-center gap-3">
                        <ShieldAlert className="h-5 w-5 text-primary" />
                        <div>
                          <span className="font-bold text-xs block text-white">Cash on Delivery</span>
                          <span className="text-[10px] text-white/50">Pay at unloading point</span>
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
            </div>

            {/* Right Summary Checkout Panel */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-border space-y-6 shadow-sm text-slate-800">
                <h3 className="font-black text-lg border-b border-slate-100 pb-3 text-brand-navy">Checkout Totals</h3>
                
                <div className="max-h-60 overflow-y-auto space-y-3.5 pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs text-slate-655">
                      <span className="line-clamp-1">{item.name} × {item.quantity}</span>
                      <span className="font-mono">₹{((item.sale_price ?? item.price) * item.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-3.5 text-xs text-slate-655">
                  <div className="flex justify-between">
                    <span>Goods Subtotal</span>
                    <span className="font-mono">₹{itemsSubtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CGST & SGST (18%)</span>
                    <span className="font-mono">₹{estimatedTax.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Logistics Shipping</span>
                    <span className="font-mono">₹{shippingFee.toLocaleString("en-IN")}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>Discount ({couponCode})</span>
                      <span className="font-mono">-₹{couponDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <hr className="border-slate-100" />
                  <div className="flex justify-between text-slate-800 font-black text-base">
                    <span>Grand Total</span>
                    <span className="font-mono text-primary">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-primary to-brand-gold text-brand-navy-deep font-black rounded-2xl shadow-lg transition hover:shadow-xl disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Place Secure Order"}
                </button>
              </div>
              
              <Link to="/cart" className="inline-flex items-center gap-2 text-xs text-slate-550 hover:text-primary transition font-bold px-2">
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
