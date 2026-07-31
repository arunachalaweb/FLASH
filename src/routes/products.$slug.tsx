import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, RefreshCw, Check, AlertCircle, FileText, Share2, HelpCircle, PhoneCall, PenSquare } from "lucide-react";
import { addToCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Solar Component Specifications | FLASH` },
      { name: "description", content: "Buy high-performance monocrystalline panels and pure sine wave inverters at FLASH." },
    ],
  }),
  component: ProductDetailPage,
});

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  sale_price: number | null;
  sku: string;
  stock_quantity: number;
  manage_stock: boolean;
  images: any;
  category_id: string;
  brand_id: string;
  category?: { name: string };
  brand?: { name: string };
  published: boolean;
  datasheet_url?: string;
  video_url?: string;
  weight?: number;
  watt_capacity?: number;
  voltage?: string;
  phase?: string;
  battery_capacity?: string;
  panel_technology?: string;
  cell_type?: string;
}

function ProductDetailPage() {
  const { slug } = useParams({ from: "/products/$slug" });
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Delivery check state
  const [pincode, setPincode] = useState("");
  const [delChecking, setDelChecking] = useState(false);
  const [delResult, setDelResult] = useState<{ available: boolean; charge: number; message: string } | null>(null);

  // Enquiry modal state
  const [showEnqModal, setShowEnqModal] = useState(false);
  const [enqName, setEnqName] = useState("");
  const [enqPhone, setEnqPhone] = useState("");
  const [enqEmail, setEnqEmail] = useState("");
  const [enqMessage, setEnqMessage] = useState("");
  const [sendingEnq, setSendingEnq] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const isDev = import.meta.env.DEV;
        const BACKEND_URL = isDev ? "http://localhost:4000" : "";
        const res = await fetch(`${BACKEND_URL}/api/products`);
        const allProducts: Product[] = await res.json();
        
        const current = allProducts.find((p) => p.slug === slug);
        if (current) {
          setProduct(current);
          const relatedItems = allProducts.filter(
            (p) => p.category_id === current.category_id && p.id !== current.id && p.published
          );
          setRelated(relatedItems.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to load product details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      sale_price: product.sale_price,
      images: product.images,
    }, quantity);
    
    setAdded(true);
    toast.success(`Added ${quantity} × ${product.name} to cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate({ to: "/cart" });
  };

  const checkDelivery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || !product) return;

    setDelChecking(true);
    try {
      const isDev = import.meta.env.DEV;
      const BACKEND_URL = isDev ? "http://localhost:4000" : "";
      
      const res = await fetch(`${BACKEND_URL}/api/shipping/check-delivery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pincode,
          totalWeight: (product.weight || 0) * quantity
        })
      });

      const data = await res.json();
      setDelResult(data);
    } catch (err) {
      toast.error("Failed to check delivery availability.");
    } finally {
      setDelChecking(false);
    }
  };

  const submitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setSendingEnq(true);
    try {
      const isDev = import.meta.env.DEV;
      const BACKEND_URL = isDev ? "http://localhost:4000" : "";
      const res = await fetch(`${BACKEND_URL}/api/solar_enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: enqName,
          phone: enqPhone,
          email: enqEmail,
          location: "Not Specified",
          message: `Product Enquiry for: ${product.name}. SKU: ${product.sku}. ${enqMessage}`,
          usage_type: "residential"
        })
      });

      if (!res.ok) throw new Error("Failed to submit enquiry.");
      
      toast.success("Enquiry request submitted successfully! A solar executive will contact you shortly.");
      setShowEnqModal(false);
      setEnqMessage("");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit enquiry");
    } finally {
      setSendingEnq(false);
    }
  };

  const getProductImages = (imagesStr: any) => {
    try {
      const imgs = typeof imagesStr === "string" ? JSON.parse(imagesStr) : imagesStr;
      if (Array.isArray(imgs) && imgs.length > 0) return imgs;
    } catch (e) {}
    return ["https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600"];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <Header overlay />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <Header overlay />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-xl font-bold">Solar Product Not Found</h2>
          <Link to="/products" className="mt-4 text-primary hover:underline">Return to Shop Catalog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = getProductImages(product.images);
  const finalPrice = product.sale_price ?? product.price;
  const isOutOfStock = product.stock_quantity <= 0;

  const waUrl = `https://wa.me/919150011428?text=${encodeURIComponent(`Hi FLASH, I am interested in purchasing ${product.name} (SKU: ${product.sku}). Please let me know current stock availability.`)}`;

  return (
    <div className="bg-background text-foreground font-sans min-h-screen flex flex-col justify-between">
      <div>
        <Header overlay />
        <PageHero
          title={product.name}
          crumb="Product Specifications"
          tagline={product.category?.name || "Solar Component"}
        />

        <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link to="/products" className="inline-flex items-center gap-2 text-slate-550 hover:text-primary transition text-sm mb-8 font-semibold">
            <ArrowLeft className="h-4 w-4" /> Back to Solar Shop
          </Link>

          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            {/* Left: Gallery & Assets */}
            <div className="space-y-6">
              <div className="aspect-video bg-slate-950 rounded-3xl overflow-hidden border border-border shadow-xl relative">
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-20 aspect-video rounded-xl overflow-hidden border-2 transition ${
                        activeImage === idx ? "border-primary" : "border-border"
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Video Player/Placeholder */}
              <div className="bg-slate-50 border border-border p-6 rounded-3xl flex items-center justify-between shadow-sm">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Product Video Guide</h4>
                  <p className="text-xs text-slate-500 mt-1">Watch installation walkthrough and efficiency tests.</p>
                </div>
                <a
                  href={product.video_url || "https://youtube.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs bg-white hover:bg-slate-50 font-bold px-4 py-2.5 rounded-xl border border-border transition text-slate-800"
                >
                  Watch Video Demo
                </a>
              </div>
            </div>

            {/* Right: Product summary, CTA forms */}
            <div className="space-y-8 mt-8 lg:mt-0">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">{product.category?.name || "Solar Component"}</span>
                <h1 className="text-2xl sm:text-3xl font-black mt-1 text-brand-navy leading-tight">{product.name}</h1>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
                  <span>SKU: <strong className="font-mono text-slate-700">{product.sku}</strong></span>
                  {product.brand?.name && <span>Brand: <strong className="text-slate-700">{product.brand.name}</strong></span>}
                  <span>Status: <strong className={isOutOfStock ? "text-red-500" : "text-green-500"}>{isOutOfStock ? "Out of Stock" : "In Stock"}</strong></span>
                </div>
              </div>

              {/* Price Card */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-border space-y-3 shadow-sm">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-slate-850">
                    ₹{finalPrice.toLocaleString("en-IN")}
                  </span>
                  {product.sale_price !== null && (
                    <span className="text-slate-400 line-through text-base font-mono">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-450 font-medium">Price includes GST (18%) standard central and state tax rate rules.</p>
              </div>

              {/* Quantity and Checkout actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-700">Quantity:</span>
                  <div className="flex items-center border border-border bg-slate-50 rounded-xl">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2 text-slate-500 hover:text-slate-800"
                    >
                      -
                    </button>
                    <span className="px-4 font-mono font-bold text-sm text-slate-800">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3.5 py-2 text-slate-500 hover:text-slate-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl border border-border transition disabled:opacity-50"
                  >
                    <ShoppingCart className="h-4 w-4" /> Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={isOutOfStock}
                    className="w-full py-3.5 bg-gradient-to-r from-primary to-brand-gold text-brand-navy-deep font-black rounded-2xl hover:shadow-lg transition disabled:opacity-50"
                  >
                    Buy Now
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-green-50 hover:bg-green-100/50 border border-green-200 rounded-2xl text-xs font-bold text-green-600 transition"
                  >
                    <PhoneCall className="h-4 w-4" /> WhatsApp Enquiry
                  </a>
                  <button
                    onClick={() => setShowEnqModal(true)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-primary/10 hover:bg-primary/25 border border-primary/30 rounded-2xl text-xs font-bold text-brand-navy transition"
                  >
                    <PenSquare className="h-4 w-4" /> Request Quote
                  </button>
                </div>
              </div>

              {/* Pincode check */}
              <form onSubmit={checkDelivery} className="bg-slate-50 p-5 rounded-2xl border border-border space-y-3 shadow-sm">
                <label className="text-xs font-bold text-slate-400 block uppercase">Check Logistics Delivery</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Enter 6-digit Delivery Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-1 bg-white border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 font-mono"
                  />
                  <button
                    type="submit"
                    disabled={delChecking}
                    className="bg-primary hover:bg-primary-hover text-slate-900 px-4 py-2 rounded-xl text-xs font-bold transition"
                  >
                    {delChecking ? "Checking..." : "Verify Pincode"}
                  </button>
                </div>
                {delResult && (
                  <p className={`text-xs font-bold ${delResult.available ? "text-green-600" : "text-red-500"}`}>
                    {delResult.message} {delResult.available && `Shipping Estimate: ₹${delResult.charge}`}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Specs Sheet */}
          <section className="mt-16 space-y-6">
            <h3 className="text-lg font-black text-brand-navy border-b pb-2 border-slate-100">Technical Specifications</h3>
            <div className="bg-white border border-border rounded-2xl overflow-hidden p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-slate-655">
                <div className="flex justify-between border-b border-dashed pb-2">
                  <span className="font-semibold text-slate-500">Regular Price</span>
                  <span className="font-mono">₹{product.price}</span>
                </div>
                <div className="flex justify-between border-b border-dashed pb-2">
                  <span className="font-semibold text-slate-500">Estimated Shipping Weight</span>
                  <span className="font-mono">{product.weight || "—"} kg</span>
                </div>
                {product.panel_technology && (
                  <div className="flex justify-between border-b border-dashed pb-2">
                    <span className="font-semibold text-slate-500">Technology</span>
                    <span>{product.panel_technology}</span>
                  </div>
                )}
                {product.cell_type && (
                  <div className="flex justify-between border-b border-dashed pb-2">
                    <span className="font-semibold text-slate-500">Cell Type</span>
                    <span>{product.cell_type}</span>
                  </div>
                )}
                {product.watt_capacity && (
                  <div className="flex justify-between border-b border-dashed pb-2">
                    <span className="font-semibold text-slate-500">Rated Capacity</span>
                    <span>{product.watt_capacity}W</span>
                  </div>
                )}
                {product.voltage && (
                  <div className="flex justify-between border-b border-dashed pb-2">
                    <span className="font-semibold text-slate-500">Operational Voltage</span>
                    <span>{product.voltage}</span>
                  </div>
                )}
                {product.phase && (
                  <div className="flex justify-between border-b border-dashed pb-2">
                    <span className="font-semibold text-slate-500">Phase Phase</span>
                    <span>{product.phase}</span>
                  </div>
                )}
                {product.battery_capacity && (
                  <div className="flex justify-between border-b border-dashed pb-2">
                    <span className="font-semibold text-slate-500">Ampere Hour Rating</span>
                    <span>{product.battery_capacity}</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Related Products */}
          {related.length > 0 && (
            <section className="mt-16 space-y-6">
              <h3 className="text-lg font-black text-brand-navy">Related Solar Products</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    to={`/products/${item.slug}`}
                    className="bg-white border border-border rounded-2xl p-4 block hover:border-primary/50 transition group shadow-sm"
                  >
                    <div className="aspect-video rounded-xl overflow-hidden bg-slate-950">
                      <img src={getProductImages(item.images)[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-bold text-xs text-slate-800 truncate group-hover:text-primary transition mt-3">{item.name}</h4>
                    <span className="text-primary font-mono text-xs font-bold block mt-1">₹{item.price.toLocaleString("en-IN")}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Quote Request Modal */}
      {showEnqModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={submitEnquiry} className="bg-white border border-border rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 relative text-slate-800 shadow-xl">
            <div>
              <h3 className="text-lg font-black text-brand-navy">Request Custom Quote</h3>
              <p className="text-slate-500 text-xs mt-1">Request custom pricing and logistics timelines for {product.name}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Your Name</label>
                <input
                  type="text"
                  required
                  value={enqName}
                  onChange={(e) => setEnqName(e.target.value)}
                  className="w-full bg-slate-50 border border-border rounded-lg p-2.5 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Your Phone</label>
                <input
                  type="text"
                  required
                  value={enqPhone}
                  onChange={(e) => setEnqPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-border rounded-lg p-2.5 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Your Email</label>
                <input
                  type="email"
                  required
                  value={enqEmail}
                  onChange={(e) => setEnqEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-border rounded-lg p-2.5 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Message / Quantity needs</label>
                <textarea
                  value={enqMessage}
                  onChange={(e) => setEnqMessage(e.target.value)}
                  placeholder="Installation needed? Special shipping notes?"
                  className="w-full bg-slate-50 border border-border rounded-lg p-2.5 text-xs h-20 resize-none focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowEnqModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg text-xs transition border border-border"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={sendingEnq}
                className="flex-1 py-2.5 bg-primary text-slate-900 font-bold rounded-lg text-xs hover:bg-primary-hover transition"
              >
                {sendingEnq ? "Sending..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
}
