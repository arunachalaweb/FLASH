import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, Percent, Truck } from "lucide-react";
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
    // Reset coupon/shipping on change to prevent pricing mismatches
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

  // Pricing calculations
  const itemsSubtotal = items.reduce((sum, item) => {
    const itemPrice = item.sale_price ?? item.price;
    return sum + (itemPrice * item.quantity);
  }, 0);

  // Hardcode product weights for shipping fee calculation (or dynamic fallback)
  const totalWeight = items.reduce((sum, item) => {
    // default panel to 28kg, battery to 50kg, other 5kg
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

  const estimatedTax = itemsSubtotal * 0.18; // 18% GST on solar goods
  const finalShipping = shippingFee ?? 0;
  const grandTotal = Math.max(0, (itemsSubtotal + estimatedTax + finalShipping) - couponDiscount);

  // Store variables in localStorage for checkout page
  const handleProceedToCheckout = () => {
    localStorage.setItem("checkout_shipping_fee", String(finalShipping));
    localStorage.setItem("checkout_discount", String(couponDiscount));
    localStorage.setItem("checkout_coupon_code", activeCoupon);
    localStorage.setItem("checkout_pincode", pincode);
    navigate({ to: "/checkout" });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col justify-between">
      <div>
        <Header />
        <PageHero
          title="Your Shopping Cart"
          subtitle="Review chosen high-efficiency solar panels, batteries, inverters, and verify local logistics fees."
        />

        <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-20 bg-slate-800/20 border border-slate-750 rounded-3xl max-w-xl mx-auto">
              <ShoppingBag className="h-16 w-16 text-slate-550 mx-auto mb-6" />
              <h2 className="text-2xl font-bold">Your cart is empty</h2>
              <p className="text-slate-400 mt-2">Looks like you haven't added any products to your cart yet.</p>
              <Link
                to="/products"
                className="mt-8 inline-block px-8 py-3 bg-primary text-slate-900 font-bold rounded-lg hover:bg-primary-hover transition shadow-lg"
              >
                Start Solar Shopping
              </Link>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-3 lg:gap-10">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-800/20 border border-slate-700/40 rounded-3xl p-6 space-y-6">
                  {items.map((item) => {
                    const price = item.sale_price ?? item.price;
                    return (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/40 last:pb-0 last:border-0"
                      >
                        {/* Image & Title */}
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-xl bg-slate-900 border border-slate-700"
                          />
                          <div>
                            <Link to={`/products/${item.slug}`}>
                              <h4 className="font-bold text-white hover:text-primary transition line-clamp-1 text-sm">
                                {item.name}
                              </h4>
                            </Link>
                            <span className="text-[10px] font-mono text-slate-450 block mt-1">SKU: {item.sku}</span>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                          <div className="flex items-center border border-slate-700 rounded-lg bg-slate-900">
                            <button
                              onClick={() => handleQtyChange(item.id, Math.max(1, item.quantity - 1))}
                              className="px-2.5 py-1 text-slate-400 hover:text-white"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 font-mono font-bold text-xs">{item.quantity}</span>
                            <button
                              onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-slate-400 hover:text-white"
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
                            className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-slate-800 transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Shipping Estimator & Coupons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Coupon */}
                  <form onSubmit={applyCoupon} className="bg-slate-800/20 border border-slate-700/40 p-5 rounded-2xl space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Percent className="h-4 w-4 text-primary" /> Apply Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="FLASH1000 or SOLAR5"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary uppercase font-mono"
                      />
                      <button
                        type="submit"
                        disabled={verifyingCoupon}
                        className="bg-primary hover:bg-primary-hover text-slate-900 px-4 py-2 rounded-lg text-xs font-bold transition"
                      >
                        Apply
                      </button>
                    </div>
                    {activeCoupon && (
                      <p className="text-xs text-green-400 font-bold">Active: {activeCoupon} (Discount: -₹{couponDiscount})</p>
                    )}
                  </form>

                  {/* Pincode logistics */}
                  <form onSubmit={calculateShipping} className="bg-slate-800/20 border border-slate-700/40 p-5 rounded-2xl space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Truck className="h-4 w-4 text-primary" /> Logistics Estimator
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="6-digit Pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary font-mono"
                      />
                      <button
                        type="submit"
                        disabled={checkingPincode}
                        className="bg-primary hover:bg-primary-hover text-slate-900 px-4 py-2 rounded-lg text-xs font-bold transition"
                      >
                        Estimate
                      </button>
                    </div>
                    <div className="text-[10px] text-slate-450 flex justify-between">
                      <span>Total Cargo Weight: <strong>{totalWeight.toFixed(1)} kg</strong></span>
                      {shippingFee !== null && <span className="text-green-400 font-bold">Logistics: +₹{shippingFee}</span>}
                    </div>
                    {shippingMsg && (
                      <p className="text-[10px] font-semibold text-primary">{shippingMsg}</p>
                    )}
                  </form>
                </div>
              </div>

              {/* Summary Checkout Card */}
              <div className="bg-slate-800/40 rounded-3xl p-6 border border-slate-700/50 h-fit space-y-6 shadow-xl">
                <h3 className="font-black text-lg border-b border-slate-700 pb-3">Solar Order Summary</h3>
                <div className="space-y-3.5 text-xs text-slate-350">
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
                    <div className="flex justify-between text-green-400 font-bold">
                      <span>Discount ({activeCoupon})</span>
                      <span className="font-mono">-₹{couponDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <hr className="border-slate-700" />
                  <div className="flex justify-between text-white font-black text-base">
                    <span>Grand Total</span>
                    <span className="font-mono text-primary">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  disabled={shippingFee === null && totalWeight > 0}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 bg-primary text-slate-900 font-black rounded-2xl hover:bg-primary-hover transition shadow-lg disabled:bg-slate-750 disabled:text-slate-500"
                >
                  Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </button>
                {shippingFee === null && totalWeight > 0 && (
                  <p className="text-[10px] text-center text-amber-500 font-bold mt-2">
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
