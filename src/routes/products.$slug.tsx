import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, RefreshCw, Check, AlertCircle, FileText, Share2, HelpCircle, PhoneCall, PenSquare, X, Heart, RefreshCw as CompareIcon, Info, Star, Facebook, Twitter, Linkedin, MessageCircle, Send } from "lucide-react";
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
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Tabs state: description, additional, reviews
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");

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

  // Added to cart modal
  const [showAddedModal, setShowAddedModal] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const isDev = import.meta.env.DEV;
        const BACKEND_URL = isDev ? "http://localhost:4000" : "";
        const res = await fetch(`${BACKEND_URL}/api/products`);
        const data: Product[] = await res.json();
        setAllProducts(data || []);
        
        const current = data.find((p) => p.slug === slug);
        if (current) {
          setProduct(current);
          const relatedItems = data.filter(
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
    setShowAddedModal(true);
    toast.success(`Added ${quantity} × ${product.name} to cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setShowAddedModal(false);
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
  const saving = product.sale_price ? product.price - product.sale_price : 0;

  const waUrl = `https://wa.me/919150011428?text=${encodeURIComponent(`Hi FLASH, I am interested in purchasing ${product.name} (SKU: ${product.sku}). Please let me know current stock availability.`)}`;

  // Sidebar products (sample)
  const sidebarProducts = allProducts.filter(p => p.id !== product.id && p.published).slice(0, 3);

  return (
    <div className="bg-background text-foreground font-sans min-h-screen flex flex-col justify-between">
      <div>
        <Header overlay />
        
        {/* Breadcrumb strip matching premium layout */}
        <div className="bg-slate-50 border-b border-border py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500 flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary transition">Shop</Link>
            <span>/</span>
            <span className="text-slate-400 capitalize">{product.category?.name || "Solar Components"}</span>
            <span>/</span>
            <span className="text-brand-navy font-bold truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>

        <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left 9 Columns: Main Product Gallery, Metadata & Tabbed Information */}
            <div className="lg:col-span-9 space-y-12">
              
              {/* Product Gallery & Buy Box */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Left: Product Images Slider */}
                <div className="md:col-span-5 space-y-4">
                  <div className="relative aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-border group">
                    <img
                      src={images[activeImage]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    {product.sale_price && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                        Sale
                      </span>
                    )}
                  </div>
                  {images.length > 1 && (
                    <div className="flex gap-2">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImage(idx)}
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                            activeImage === idx ? "border-primary" : "border-border"
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Product Buy Info box */}
                <div className="md:col-span-7 space-y-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-brand-navy leading-tight">{product.name}</h1>
                    <div className="flex items-center gap-1.5 mt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-primary text-primary" />
                      ))}
                      <span className="text-xs text-slate-400 font-bold ml-1">(5.0 Customer Rating)</span>
                    </div>
                  </div>

                  {/* Highlights Bullet points */}
                  <ul className="space-y-2 text-xs text-slate-655 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">✓</span>
                      <span>Authorized industrial-grade {product.brand?.name || "Premium Solar"} hardware.</span>
                    </li>
                    {product.panel_technology && (
                      <li className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">✓</span>
                        <span>Panel Technology: {product.panel_technology} specs.</span>
                      </li>
                    )}
                    {product.phase && (
                      <li className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">✓</span>
                        <span>Phase Config: {product.phase}.</span>
                      </li>
                    )}
                    <li className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">✓</span>
                      <span>5-Year comprehensive product warranty.</span>
                    </li>
                  </ul>

                  {/* Price display block */}
                  <div className="space-y-1">
                    <span className="text-3xl font-black font-mono text-slate-850">
                      ₹{finalPrice.toLocaleString("en-IN")}
                    </span>
                    {product.sale_price !== null && (
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 line-through text-sm font-mono">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-green-600 font-bold">Save ₹{saving.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                  </div>

                  {/* Add to Cart / Buy Now Action layout */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-border space-y-4 shadow-sm text-slate-800">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      {/* Qty */}
                      <div className="flex items-center border border-border bg-white rounded-xl h-11">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 text-slate-500 hover:text-slate-800"
                        >
                          -
                        </button>
                        <span className="px-4 font-mono font-bold text-sm text-slate-800">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 text-slate-500 hover:text-slate-800"
                        >
                          +
                        </button>
                      </div>

                      {/* Add */}
                      <button
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                        className="flex-1 h-11 inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition disabled:opacity-50"
                      >
                        <ShoppingCart className="h-4 w-4" /> Add to cart
                      </button>
                    </div>

                    {/* Buy now */}
                    <button
                      onClick={handleBuyNow}
                      disabled={isOutOfStock}
                      className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl transition disabled:opacity-50"
                    >
                      Buy now
                    </button>

                    {/* Compare, wishlist, ask */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
                      <button className="flex items-center gap-1 hover:text-primary transition">
                        <Heart className="h-3.5 w-3.5" /> Add to wishlist
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary transition">
                        <CompareIcon className="h-3.5 w-3.5" /> Compare
                      </button>
                      <button onClick={() => setShowEnqModal(true)} className="flex items-center gap-1 hover:text-primary transition">
                        <HelpCircle className="h-3.5 w-3.5" /> Ask about product
                      </button>
                    </div>
                  </div>

                  {/* Coupon Notice Strip */}
                  <div className="bg-sky-50 border border-sky-100 text-sky-700 text-xs py-3 px-4 rounded-xl font-semibold">
                    💡 Coupon Code: Apply "FLASH1000" at cart check to get ₹1,000 flat discount!
                  </div>

                  {/* Metadata fields */}
                  <div className="space-y-1.5 text-xs border-t border-slate-100 pt-4 text-slate-500">
                    <div>SKU: <strong className="font-mono text-slate-700">{product.sku}</strong></div>
                    <div>Category: <strong className="text-slate-700 capitalize">{product.category?.name || "Solar component"}</strong></div>
                    <div>Brand: <strong className="text-slate-700">{product.brand?.name || "FLASH"}</strong></div>
                  </div>

                  {/* Share icons */}
                  <div className="flex items-center gap-2.5 text-xs text-slate-400">
                    <span>Share:</span>
                    <a href={waUrl} target="_blank" rel="noreferrer" className="h-7 w-7 rounded-full bg-slate-50 border hover:bg-green-50 hover:text-green-500 grid place-items-center transition">
                      <MessageCircle className="h-3.5 w-3.5" />
                    </a>
                    <button className="h-7 w-7 rounded-full bg-slate-50 border hover:bg-blue-50 hover:text-blue-500 grid place-items-center transition">
                      <Facebook className="h-3.5 w-3.5" />
                    </button>
                    <button className="h-7 w-7 rounded-full bg-slate-50 border hover:bg-sky-50 hover:text-sky-500 grid place-items-center transition">
                      <Twitter className="h-3.5 w-3.5" />
                    </button>
                    <button className="h-7 w-7 rounded-full bg-slate-50 border hover:bg-indigo-50 hover:text-indigo-500 grid place-items-center transition">
                      <Linkedin className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Tabbed details description block */}
              <div className="space-y-6">
                <div className="flex border-b border-border text-sm font-bold">
                  <button
                    onClick={() => setActiveTab("desc")}
                    className={`pb-3 px-6 transition ${
                      activeTab === "desc" ? "border-b-2 border-primary text-brand-navy" : "text-slate-400"
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab("specs")}
                    className={`pb-3 px-6 transition ${
                      activeTab === "specs" ? "border-b-2 border-primary text-brand-navy" : "text-slate-400"
                    }`}
                  >
                    Additional Information
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`pb-3 px-6 transition ${
                      activeTab === "reviews" ? "border-b-2 border-primary text-brand-navy" : "text-slate-400"
                    }`}
                  >
                    Reviews (0)
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-border text-sm leading-relaxed text-slate-655 space-y-4">
                  {activeTab === "desc" && (
                    <>
                      <p>{product.description || "No full description added. This high-efficiency solar hardware is engineered for optimal performance and grid synchronization."}</p>
                      <p>Built with quality assurance to meet MNRE and BIS requirements. Long life cycles and minimum degradation over decades of sun exposure.</p>
                    </>
                  )}

                  {activeTab === "specs" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                      <div className="flex justify-between border-b pb-1.5 text-xs">
                        <span className="font-semibold text-slate-500">Rated Load Capacity</span>
                        <span className="font-bold text-brand-navy">{product.watt_capacity || "—"} Watts</span>
                      </div>
                      <div className="flex justify-between border-b pb-1.5 text-xs">
                        <span className="font-semibold text-slate-500">Operation Voltage</span>
                        <span className="font-bold text-brand-navy">{product.voltage || "—"}</span>
                      </div>
                      <div className="flex justify-between border-b pb-1.5 text-xs">
                        <span className="font-semibold text-slate-500">Grid Phase</span>
                        <span className="font-bold text-brand-navy">{product.phase || "—"}</span>
                      </div>
                      <div className="flex justify-between border-b pb-1.5 text-xs">
                        <span className="font-semibold text-slate-500">Estimated Weight</span>
                        <span className="font-bold text-brand-navy">{product.weight || "—"} kg</span>
                      </div>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <p className="text-xs text-slate-400 text-center py-4">There are no reviews yet. Be the first to review this product!</p>
                  )}
                </div>
              </div>

              {/* Related products grid list */}
              {related.length > 0 && (
                <section className="space-y-6">
                  <h3 className="text-lg font-black text-brand-navy border-b pb-2">Related Products</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                    {related.map((item) => (
                      <div key={item.id} className="bg-white border border-border rounded-2xl p-4 flex flex-col justify-between hover:border-primary/45 transition shadow-xs group">
                        <div>
                          <Link to="/products/$slug" params={{ slug: item.slug }} className="aspect-square rounded-xl overflow-hidden bg-slate-950 block">
                            <img src={getProductImages(item.images)[0]} alt={item.name} className="w-full h-full object-cover" />
                          </Link>
                          <span className="text-[9px] font-bold text-primary block mt-3 uppercase">{item.category?.name}</span>
                          <h4 className="font-bold text-xs text-slate-800 truncate group-hover:text-primary transition mt-1">
                            <Link to="/products/$slug" params={{ slug: item.slug }}>{item.name}</Link>
                          </h4>
                          <span className="text-slate-850 font-mono font-bold text-xs block mt-1">₹{item.price.toLocaleString("en-IN")}</span>
                        </div>
                        <button
                          onClick={() => addToCart({ id: item.id, name: item.name, slug: item.slug, price: item.price, sale_price: item.sale_price, images: item.images })}
                          className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border transition"
                        >
                          Add to cart
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* Right 3 Columns: Sidebar Widgets matching design */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* Widget 1: Hot Deal Countdown */}
              <div className="bg-white p-5 rounded-3xl border border-border shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] bg-red-500 text-white font-black px-2 py-0.5 rounded uppercase">Sale</span>
                  <span className="text-xs text-slate-400 font-bold">Limited time</span>
                </div>
                
                {sidebarProducts[0] && (
                  <div className="text-center space-y-2">
                    <img
                      src={getProductImages(sidebarProducts[0].images)[0]}
                      alt=""
                      className="w-28 h-28 object-cover mx-auto rounded-xl"
                    />
                    <h5 className="font-bold text-xs text-slate-800 line-clamp-1">{sidebarProducts[0].name}</h5>
                    <span className="font-mono text-sm font-black text-brand-navy">₹{sidebarProducts[0].price.toLocaleString("en-IN")}</span>
                  </div>
                )}

                {/* Grid timers */}
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  {[
                    { label: "Days", val: "72" },
                    { label: "Hrs", val: "01" },
                    { label: "Min", val: "29" },
                    { label: "Sec", val: "44" }
                  ].map((t, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-150 p-2 rounded-xl">
                      <span className="font-black text-xs block text-slate-800 font-mono">{t.val}</span>
                      <span className="text-[8px] text-slate-450 block uppercase tracking-wider font-semibold">{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 2: Custom Solar Promotion Banner */}
              <div className="bg-gradient-to-br from-brand-navy-deep to-brand-navy text-white p-6 rounded-3xl text-center space-y-4 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 h-20 w-20 bg-primary/20 rounded-full blur-xl" />
                <span className="text-[9px] font-black uppercase text-primary tracking-widest block">EPC SERVICES</span>
                <h4 className="font-display font-black text-base leading-tight">Vellore & Chennai solar installations</h4>
                <p className="text-[10px] text-white/70">Claim up to 40% government subsidy and clear DISCOM approvals.</p>
                <Link
                  to="/enquiry"
                  className="inline-block w-full py-2 bg-gradient-to-r from-primary to-brand-gold text-brand-navy-deep font-bold rounded-xl text-xs shadow-sm hover:shadow transition"
                >
                  Consult Now
                </Link>
              </div>

              {/* Widget 3: More to Love */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-brand-navy border-b pb-2">More to Love</h4>
                <div className="space-y-3">
                  {sidebarProducts.map((p) => (
                    <Link
                      key={p.id}
                      to="/products/$slug"
                      params={{ slug: p.slug }}
                      className="bg-white p-3 rounded-2xl border border-border flex items-center gap-3 shadow-xs hover:border-primary/45 transition"
                    >
                      <img
                        src={getProductImages(p.images)[0]}
                        alt=""
                        className="w-12 h-12 object-cover rounded-lg bg-slate-900 shrink-0"
                      />
                      <div className="min-w-0">
                        <h5 className="font-bold text-[11px] text-slate-800 truncate">{p.name}</h5>
                        <span className="font-mono text-xs font-bold text-primary block mt-0.5">₹{p.price.toLocaleString("en-IN")}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>

      {/* Enquiry Modal */}
      {showEnqModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={submitEnquiry} className="bg-white border border-border rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 relative text-slate-800 shadow-xl">
            <div>
              <h3 className="text-lg font-black text-brand-navy">Request Custom Quote</h3>
              <p className="text-slate-550 text-xs mt-1">Request custom pricing and logistics timelines for {product.name}</p>
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

      {/* Added to Cart Popup Modal */}
      {showAddedModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-border rounded-3xl p-6 md:p-8 max-w-sm w-full space-y-6 relative text-slate-855 shadow-2xl text-center">
            <button
              onClick={() => setShowAddedModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 border border-green-200">
              <Check className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-black text-brand-navy">Product Added to Cart!</h3>
              <p className="text-slate-550 text-xs mt-2 font-semibold">{product.name}</p>
            </div>

            <div className="flex flex-col gap-3.5 pt-2">
              <Link
                to="/cart"
                onClick={() => setShowAddedModal(false)}
                className="w-full py-3 bg-gradient-to-r from-primary to-brand-gold text-brand-navy-deep font-black rounded-2xl shadow-md hover:shadow-lg transition text-sm"
              >
                View Cart & Checkout
              </Link>
              <button
                onClick={() => setShowAddedModal(false)}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-655 font-bold rounded-2xl transition border border-border text-sm"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
