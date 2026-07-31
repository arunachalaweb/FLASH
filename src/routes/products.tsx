import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Search, Filter, ShoppingCart, SlidersHorizontal, ArrowUpDown, ChevronRight, Check } from "lucide-react";
import { addToCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products Shop | Flash Renewable Energy" },
      { name: "description", content: "Explore high-quality monocrystalline solar panels, inverters, structures, cables, and solar accessories at FLASH." },
    ],
  }),
  component: ProductsPage,
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
  images: any; // string or array
  category_id: string;
  category?: { name: string };
  published: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc">("name");
  const [priceRange, setPriceRange] = useState<number>(60000);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadData() {
      try {
        const prodRes = await fetch("http://localhost:4000/api/products");
        const prodData = await prodRes.json();
        
        const catRes = await fetch("http://localhost:4000/api/categories");
        const catData = await catRes.json();

        setProducts(prodData);
        setCategories(catData);
      } catch (err) {
        console.error("Failed to load e-commerce catalog:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      sale_price: product.sale_price,
      images: product.images,
    });
    
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    toast.success(`Added ${product.name} to cart!`);
    
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const getProductImage = (imagesStr: any) => {
    try {
      const imgs = typeof imagesStr === "string" ? JSON.parse(imagesStr) : imagesStr;
      if (Array.isArray(imgs) && imgs.length > 0) return imgs[0];
    } catch (e) {}
    return "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600";
  };

  const filteredProducts = products
    .filter((p) => {
      if (!p.published) return false;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                            p.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "all" || p.category_id === selectedCategory;
      const currentPrice = p.sale_price ?? p.price;
      const matchesPrice = currentPrice <= priceRange;
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      const aPrice = a.sale_price ?? a.price;
      const bPrice = b.sale_price ?? b.price;
      if (sortBy === "price-asc") return aPrice - bPrice;
      if (sortBy === "price-desc") return bPrice - aPrice;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <Header />
      <PageHero
        title="Premium Solar Shop"
        subtitle="Industrial-grade panels, smart inverters, and original components engineered for maximum power generation."
      />

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="space-y-8 bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 h-fit mb-8 lg:mb-0">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
                <Filter className="h-4 w-4" /> Categories
              </h3>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition flex items-center justify-between ${
                    selectedCategory === "all"
                      ? "bg-primary/20 text-primary font-semibold"
                      : "text-slate-350 hover:bg-slate-800"
                  }`}
                >
                  <span>All Categories</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? "bg-primary/20 text-primary font-semibold"
                        : "text-slate-350 hover:bg-slate-800"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-slate-700" />

            {/* Price filter */}
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
                <SlidersHorizontal className="h-4 w-4" /> Price Range
              </h3>
              <div className="mt-4">
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-primary bg-slate-700 h-2 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                  <span>Min: ₹1,000</span>
                  <span className="text-primary font-bold">Max: ₹{priceRange.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Catalog list */}
          <main className="lg:col-span-3">
            {/* Search and Sort Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 mb-8">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary text-white"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <ArrowUpDown className="h-4 w-4 text-slate-450" />
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-white"
                >
                  <option value="name">Sort by: Name (A-Z)</option>
                  <option value="price-asc">Sort by: Price (Low to High)</option>
                  <option value="price-desc">Sort by: Price (High to Low)</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4 animate-pulse space-y-4">
                    <div className="bg-slate-700 h-48 w-full rounded-xl" />
                    <div className="h-4 bg-slate-700 w-2/3 rounded" />
                    <div className="h-4 bg-slate-700 w-1/2 rounded" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-slate-850 rounded-2xl border border-dashed border-slate-700">
                <p className="text-slate-400 text-lg">No products matches your filters.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("all");
                    setPriceRange(60000);
                  }}
                  className="mt-4 px-5 py-2 bg-primary text-slate-900 font-bold rounded-lg hover:bg-primary-hover transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((p) => {
                  const onSale = p.sale_price !== null;
                  const currentPrice = p.sale_price ?? p.price;
                  const outOfStock = p.manage_stock && p.stock_quantity <= 0;

                  return (
                    <div
                      key={p.id}
                      className="group flex flex-col justify-between bg-slate-800/35 border border-slate-700/50 hover:border-primary/45 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl hover:-translate-y-1"
                    >
                      {/* Product Image Section */}
                      <div className="relative overflow-hidden aspect-square bg-slate-950">
                        {onSale && (
                          <span className="absolute top-3 left-3 bg-red-500 text-white font-bold text-xs px-2.5 py-1 rounded-md z-10 shadow-lg">
                            SALE
                          </span>
                        )}
                        {outOfStock && (
                          <span className="absolute inset-0 bg-slate-950/80 text-white font-bold text-sm flex items-center justify-center z-10">
                            OUT OF STOCK
                          </span>
                        )}
                        <Link to="/products/$slug" params={{ slug: p.slug }}>
                          <img
                            src={getProductImage(p.images)}
                            alt={p.name}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>
                      </div>

                      {/* Content Section */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-xs text-primary/80 font-bold uppercase tracking-wider">
                            {categories.find((c) => c.id === p.category_id)?.name || "Solar"}
                          </span>
                          <Link to="/products/$slug" params={{ slug: p.slug }}>
                            <h4 className="mt-1 font-bold text-white text-base hover:text-primary transition line-clamp-1">
                              {p.name}
                            </h4>
                          </Link>
                          <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {p.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-700/40">
                          {/* Price */}
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-black text-primary">
                              ₹{currentPrice.toLocaleString("en-IN")}
                            </span>
                            {onSale && (
                              <span className="text-xs text-slate-500 line-through">
                                ₹{p.price.toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>

                          {/* Quick Actions */}
                          <button
                            onClick={() => handleAddToCart(p)}
                            disabled={outOfStock}
                            className={`mt-4 w-full py-2.5 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 ${
                              outOfStock
                                ? "bg-slate-800 text-slate-650 cursor-not-allowed"
                                : addedItems[p.id]
                                ? "bg-green-600 text-white"
                                : "bg-primary text-slate-900 hover:bg-primary-hover active:scale-[0.98]"
                            }`}
                          >
                            {addedItems[p.id] ? (
                              <>
                                <Check className="h-4 w-4" /> Added to Cart
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="h-4 w-4" /> Add to Cart
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </section>

      <Footer />
    </div>
  );
}
