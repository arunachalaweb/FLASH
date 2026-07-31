import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight } from "lucide-react";
import { getCart, removeFromCart, updateCartQuantity, type CartItem } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart | FLASH Solar Shop" },
      { name: "description", content: "Review your solar products and proceed to checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
    
    // Listen for storage changes
    const handleUpdate = () => {
      setItems(getCart());
    };
    window.addEventListener("flash_cart_update", handleUpdate);
    return () => window.removeEventListener("flash_cart_update", handleUpdate);
  }, []);

  const handleQtyChange = (id: string, newQty: number) => {
    updateCartQuantity(id, newQty);
    setItems(getCart());
  };

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    setItems(getCart());
    toast.error(`Removed ${name} from cart`);
  };

  // Pricing calculations
  const itemsSubtotal = items.reduce((sum, item) => {
    const itemPrice = item.sale_price ?? item.price;
    return sum + (itemPrice * item.quantity);
  }, 0);

  const estimatedTax = itemsSubtotal * 0.18; // 18% GST on solar goods
  const grandTotal = itemsSubtotal + estimatedTax;

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col justify-between">
      <div>
        <Header />
        <PageHero
          title="Your Shopping Cart"
          subtitle="Review your chosen high-efficiency solar equipment and parts before securing your order."
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
                            <Link to="/products/$slug" params={{ slug: item.slug }}>
                              <h4 className="font-bold text-white hover:text-primary transition line-clamp-1">
                                {item.name}
                              </h4>
                            </Link>
                            <span className="text-sm text-primary font-bold mt-1 block">
                              ₹{price.toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                            <button
                              onClick={() => handleQtyChange(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-slate-800 transition font-bold"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 font-mono font-bold text-primary w-10 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-slate-800 transition font-bold"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="font-bold text-white min-w-[80px] text-right">
                              ₹{(price * item.quantity).toLocaleString("en-IN")}
                            </span>
                            <button
                              onClick={() => handleRemove(item.id, item.name)}
                              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition"
                              title="Delete Item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-8 lg:mt-0">
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-3xl p-6 space-y-6 sticky top-24 shadow-xl">
                  <h3 className="text-xl font-bold border-b border-slate-700/40 pb-4 text-white">Order Summary</h3>

                  <div className="space-y-4 text-sm font-medium">
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

                  <Link
                    to="/checkout"
                    className="w-full py-3.5 bg-primary text-slate-900 font-bold rounded-lg hover:bg-primary-hover transition flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                  >
                    Proceed to Checkout <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
