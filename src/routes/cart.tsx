import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, Percent, Truck, Check } from "lucide-react";
import { getCart, removeFromCart, updateCartQuantity, type CartItem } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart | FLASH Solar Shop" },
      { name: "description", content: "Review your solar products and calculate shipping." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [activeCoupon, setActiveCoupon] = useState("");
  const [verifyingCoupon, setVerifyingCoupon] = useState(false);

  // Delivery check state
  const [pincode, setPincode] = useState("");
  const [checkingPincode, setCheckingPincode] = useState(false);
  const [shippingFee, setShippingFee] = useState<number | null>(null);
  const [shippingMsg, setShippingMsg] = useState("");

  useEffect(() => {
    setItems(getCart());
    const handleUpdate = () => {
      setItems(getCart());
    };
    window.addEventListener("flash_cart_update", handleUpdate);
    return () => window.removeEventListener("flash_cart_update", handleUpdate);
  }, []);

  const handleQtyChange = (id: string, newQty: number) => {
    updateCartQuantity(id, newQty);
    setItems(getCart());
    setCouponDiscount(0);
    setActiveCoupon("");
    setShippingFee(null);
  };

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    setItems(getCart());
    toast.error(`Removed ${name} from cart`);
    setCouponDiscount(0);
    setActiveCoupon("");
    setShippingFee(null);
  };

  const itemsSubtotal = items.reduce((sum, item) => {
    const itemPrice = item.sale_price ?? item.price;
    return sum + (itemPrice * item.quantity);
  }, 0);

  const totalWeight = items.reduce((sum, item) => {
    const weight = item.name.toLowerCase().includes("panel")
      ? 28.5
      : item.name.toLowerCase().includes("battery")
      ? 55
      : 5;
    return sum + (weight * item.quantity);
  }, 0);

  const applyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;

    setVerifyingCoupon(true);
    try {
      const isDev = import.meta.env.DEV;
      const BACKEND_URL = isDev ? "http://localhost:4000" : "";
      
      const res = await fetch(`${BACKEND_URL}/api/coupons/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, subtotal: itemsSubtotal })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to verify coupon");

      setCouponDiscount(data.discount_value);
      setActiveCoupon(data.code);
      toast.success(`Coupon "${data.code}" applied! Discount: -₹${data.discount_value}`);
    } catch (err: any) {
      toast.error(err.message || "Invalid Coupon Code");
    } finally {
      setVerifyingCoupon(false);
    }
  };

  const calculateShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode) return;

    setCheckingPincode(true);
    try {
      const isDev = import.meta.env.DEV;
      const BACKEND_URL = isDev ? "http://localhost:4000" : "";
      
      const res = await fetch(`${BACKEND_URL}/api/shipping/check-delivery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pincode, totalWeight })
      });

      const data = await res.json();
      if (data.available) {
        setShippingFee(data.charge);
        setShippingMsg(data.message);
        toast.success("Logistics delivery rates updated.");
      } else {
        setShippingFee(null);
        setShippingMsg(data.message);
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to estimate shipping charges.");
    } finally {
      setCheckingPincode(false);
    }
  };

  const estimatedTax = itemsSubtotal * 0.18; 
  const finalShipping = shippingFee ?? 0;
  const grandTotal = Math.max(0, (itemsSubtotal + estimatedTax + finalShipping) - couponDiscount);

  const handleProceedToCheckout = () => {
    localStorage.setItem("checkout_shipping_fee", String(finalShipping));
    localStorage.setItem("checkout_discount", String(couponDiscount));
    localStorage.setItem("checkout_coupon_code", activeCoupon);
    localStorage.setItem("checkout_pincode", pincode);
    navigate({ to: "/checkout" });
  };

  return (
    <div className="bg-background text-foreground font-sans min-h-screen flex flex-col justify-between">
      <div>
        <Header overlay />
        <PageHero
          title="Your Shopping Cart"
          crumb="Cart"
          tagline="Review chosen high-efficiency solar panels, batteries, inverters, and verify local logistics fees."
        />

        <main className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-20 bg-white border border-border rounded-3xl max-w-xl mx-auto shadow-sm">
              <ShoppingBag className="h-16 w-16 text-slate-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-brand-navy">Your cart is empty</h2>
              <p className="text-slate-500 mt-2">Looks like you haven't added any products to your cart yet.</p>
              <Link
                to="/products"
                className="mt-8 inline-block px-8 py-3 bg-gradient-to-r from-primary to-brand-gold text-brand-navy-deep font-bold rounded-full transition shadow-lg"
              >
                Start Solar Shopping
              </Link>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-3 lg:gap-10">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white border border-border rounded-3xl p-6 space-y-6 shadow-sm text-slate-800">
                  {items.map((item) => {
                    const price = item.sale_price ?? item.price;
                    return (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 last:pb-0 last:border-0"
                      >
                        {/* Image & Title */}
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-xl bg-slate-900 border border-slate-200"
                          />
                          <div>
                            <Link to={`/products/${item.slug}`}>
                              <h4 className="font-bold text-slate-800 hover:text-primary transition line-clamp-1 text-sm">
                                {item.name}
                              </h4>
                            </Link>
                            <span className="text-[10px] font-mono text-slate-400 block mt-1">SKU: {item.sku}</span>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                          <div className="flex items-center border border-border bg-slate-50 rounded-lg">
                            <button
                              onClick={() => handleQtyChange(item.id, Math.max(1, item.quantity - 1))}
                              className="px-2.5 py-1 text-slate-500 hover:text-slate-800"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 font-mono font-bold text-xs text-slate-700">{item.quantity}</span>
                            <button
                              onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-slate-500 hover:text-slate-800"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="font-mono font-bold text-sm block">
                              ₹{(price * item.quantity).toLocaleString("en-IN")}
                            </span>
                            <span className="text-[10px] text-slate-450">₹{price.toLocaleString("en-IN")} each</span>
                          </div>

                          <button
                            onClick={() => handleRemove(item.id, item.name)}
                            className="text-red-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-50 transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Shipping Estimator & Coupons — styled like the Free Solar Quote Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Coupon Form */}
                  <form
                    onSubmit={applyCoupon}
                    className="relative rounded-2xl overflow-hidden border border-white/10 bg-brand-navy-deep p-6 text-white shadow-[0_25px_60px_-25px_hsl(var(--primary)/0.4)]"
                  >
                    <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
                    <div className="relative space-y-4">
                      <div>
                        <h4 className="font-display text-base font-bold flex items-center gap-2">
                          <Percent className="h-4 w-4 text-primary" /> Apply Promo Code
                        </h4>
                        <p className="text-[11px] text-white/60 mt-1">Avail special volume discounts instantly.</p>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="FLASH1000 or SOLAR5"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="flex-1 rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-xs text-white placeholder:text-white/45 outline-none transition focus:bg-white/10 focus:border-primary uppercase font-mono"
                        />
                        <button
                          type="submit"
                          disabled={verifyingCoupon}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-brand-gold px-5 py-2 text-xs font-semibold text-brand-navy-deep shadow-sm hover:shadow transition"
                        >
                          Apply
                        </button>
                      </div>
                      {activeCoupon && (
                        <p className="text-xs text-green-400 font-bold flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" /> Coupon "{activeCoupon}" Active! (-₹{couponDiscount})
                        </p>
                      )}
                    </div>
                  </form>

                  {/* Pincode Estimator Form */}
                  <form
                    onSubmit={calculateShipping}
                    className="relative rounded-2xl overflow-hidden border border-white/10 bg-brand-navy-deep p-6 text-white shadow-[0_25px_60px_-25px_hsl(var(--primary)/0.4)]"
                  >
                    <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
                    <div className="relative space-y-4">
                      <div>
                        <h4 className="font-display text-base font-bold flex items-center gap-2">
                          <Truck className="h-4 w-4 text-primary" /> Logistics Estimator
                        </h4>
                        <p className="text-[11px] text-white/60 mt-1">Weight-based cargo delivery estimates.</p>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          placeholder="6-digit Pincode"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="flex-1 rounded-lg bg-white/5 border border-white/15 px-3 py-2 text-xs text-white placeholder:text-white/45 outline-none transition focus:bg-white/10 focus:border-primary font-mono"
                        />
                        <button
                          type="submit"
                          disabled={checkingPincode}
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-brand-gold px-5 py-2 text-xs font-semibold text-brand-navy-deep shadow-sm hover:shadow transition"
                        >
                          {checkingPincode ? "Estimating..." : "Estimate"}
                        </button>
                      </div>
                      <div className="text-[10px] text-white/60 flex justify-between">
                        <span>Total Weight: <strong>{totalWeight.toFixed(1)} kg</strong></span>
                        {shippingFee !== null && <span className="text-primary font-bold">Logistics: +₹{shippingFee}</span>}
                      </div>
                      {shippingMsg && (
                        <p className="text-[10px] font-semibold text-primary">{shippingMsg}</p>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Summary Checkout Card */}
              <div className="bg-white rounded-3xl p-6 border border-border h-fit space-y-6 shadow-sm text-slate-800">
                <h3 className="font-black text-lg border-b border-slate-100 pb-3 text-brand-navy">Order Summary</h3>
                <div className="space-y-3.5 text-xs text-slate-655">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-mono">₹{itemsSubtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (GST 18%)</span>
                    <span className="font-mono">₹{estimatedTax.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Logistics Shipping</span>
                    <span className="font-mono">
                      {shippingFee !== null ? `₹${shippingFee.toLocaleString("en-IN")}` : "Verify Pincode"}
                    </span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>Discount ({activeCoupon})</span>
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
                  onClick={handleProceedToCheckout}
                  disabled={shippingFee === null && totalWeight > 0}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 bg-brand-navy-deep text-white font-bold rounded-2xl shadow-lg hover:bg-brand-navy transition disabled:bg-slate-200 disabled:text-slate-400"
                >
                  Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </button>
                {shippingFee === null && totalWeight > 0 && (
                  <p className="text-[10px] text-center text-amber-600 font-bold mt-2">
                    ⚠️ Please estimate logistics charges using your shipping pincode before checking out.
                  </p>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
