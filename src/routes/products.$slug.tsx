import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, RefreshCw, Check, AlertCircle } from "lucide-react";
import { addToCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Solar Product | FLASH Shop` },
      { name: "description", content: "Buy high performance solar components and equipment." },
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
  category?: { name: string };
  published: boolean;
}

function ProductDetailPage() {
  const { slug } = useParams({ from: "/products/$slug" });
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch("http://localhost:4000/api/products");
        const allProducts: Product[] = await res.json();
        
        const current = allProducts.find((p) => p.slug === slug);
        if (current) {
          setProduct(current);
          // Find related products from same category
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

  const getProductImages = (imagesStr: any) => {
    try {
      const imgs = typeof imagesStr === "string" ? JSON.parse(imagesStr) : imagesStr;
      if (Array.isArray(imgs) && imgs.length > 0) return imgs;
    } catch (e) {}
    return ["https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600"];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between">
        <Header />
        <div className="flex-1 max-w-xl mx-auto px-4 py-16 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <p className="text-slate-450 mt-2">The product you are looking for does not exist or has been removed.</p>
          <Link to="/products" className="mt-6 inline-block px-6 py-2.5 bg-primary text-slate-900 font-bold rounded-lg hover:bg-primary-hover transition">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = getProductImages(product.images);
  const currentPrice = product.sale_price ?? product.price;
  const onSale = product.sale_price !== null;
  const outOfStock = product.manage_stock && product.stock_quantity <= 0;

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <Header />

      <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition mb-8 font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-slate-800/20 p-6 md:p-10 rounded-3xl border border-slate-700/40">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-slate-950 rounded-2xl overflow-hidden border border-slate-700/60 shadow-inner flex items-center justify-center">
              <img
                src={images[0]}
                alt={product.name}
                className="object-contain w-full h-full max-h-[500px]"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="bg-primary/20 text-primary font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-primary/20">
                  Solar Equipment
                </span>
                <h1 className="text-3xl font-black mt-3 leading-tight">{product.name}</h1>
                <p className="text-xs text-slate-500 mt-1 font-mono">SKU: {product.sku}</p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-primary">
                  ₹{currentPrice.toLocaleString("en-IN")}
                </span>
                {onSale && (
                  <span className="text-lg text-slate-500 line-through">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Description</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light">{product.description}</p>
              </div>

              <hr className="border-slate-700/50" />

              {/* Stock and Purchase */}
              <div className="space-y-4">
                {product.manage_stock && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-slate-400">Availability:</span>
                    {outOfStock ? (
                      <span className="text-red-500 font-bold uppercase">Out of Stock</span>
                    ) : (
                      <span className="text-green-500 font-bold">
                        In Stock ({product.stock_quantity} available)
                      </span>
                    )}
                  </div>
                )}

                {!outOfStock && (
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 hover:bg-slate-800 transition font-bold text-lg"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 font-mono font-bold w-12 text-center text-primary">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(product.manage_stock ? Math.min(product.stock_quantity, quantity + 1) : quantity + 1)}
                        className="px-4 py-2 hover:bg-slate-800 transition font-bold text-lg"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className={`flex-1 py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 shadow-lg ${
                        added
                          ? "bg-green-600 text-white"
                          : "bg-primary text-slate-900 hover:bg-primary-hover active:scale-[0.98]"
                      }`}
                    >
                      {added ? (
                        <>
                          <Check className="h-5 w-5" /> Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-5 w-5" /> Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Badges / Guarantees */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-700/50 pt-8 mt-8 text-center text-xs text-slate-400">
              <div className="space-y-2 flex flex-col items-center">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <span className="font-semibold text-white">Genuine Brand Warranty</span>
              </div>
              <div className="space-y-2 flex flex-col items-center">
                <Truck className="h-6 w-6 text-primary" />
                <span className="font-semibold text-white">Safe Transit Insurance</span>
              </div>
              <div className="space-y-2 flex flex-col items-center">
                <RefreshCw className="h-6 w-6 text-primary" />
                <span className="font-semibold text-white">Easy Claims Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black mb-8 border-b border-slate-800 pb-4">Related Solar Solutions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => {
                const currentPrice = p.sale_price ?? p.price;
                const image = getProductImages(p.images)[0];

                return (
                  <div
                    key={p.id}
                    className="group bg-slate-800/30 border border-slate-700/40 hover:border-primary/45 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300"
                  >
                    <Link to="/products/$slug" params={{ slug: p.slug }} className="aspect-square block bg-slate-950 overflow-hidden">
                      <img
                        src={image}
                        alt={p.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <Link to="/products/$slug" params={{ slug: p.slug }}>
                          <h4 className="font-bold text-white text-sm hover:text-primary transition line-clamp-1">{p.name}</h4>
                        </Link>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-bold text-primary">₹{currentPrice.toLocaleString("en-IN")}</span>
                        <Link
                          to="/products/$slug"
                          params={{ slug: p.slug }}
                          className="text-xs font-semibold text-slate-400 hover:text-white transition"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
