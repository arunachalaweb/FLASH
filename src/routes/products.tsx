import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Search, Filter, ShoppingCart, SlidersHorizontal, ArrowUpDown, ChevronRight, Check, Grid, List, Shield, Zap } from "lucide-react";
import { addToCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Solar Products & Hardwares | Flash Renewable Energy" },
      { name: "description", content: "Shop monocrystalline panels, grid-tie/hybrid inverters, tubular batteries, structures and distribution boxes." },
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
  images: any; 
  category_id: string;
  brand_id: string;
  category?: { name: string };
  brand?: { name: string };
  published: boolean;
  // Specifications
  watt_capacity: number | null;
  voltage: string | null;
  phase: string | null;
  battery_capacity: string | null;
  panel_technology: string | null;
  cell_type: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Brand {
  id: string;
  name: string;
  slug: string;
}

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  // States for layout and filtering
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("latest");
  const [priceRange, setPriceRange] = useState<number>(200000);
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [selectedPhase, setSelectedPhase] = useState<string>("all");
  const [selectedBatteryCap, setSelectedBatteryCap] = useState<string>("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadData() {
      try {
        const isDev = import.meta.env.DEV;
        const BACKEND_URL = isDev ? "http://localhost:4000" : "";
        
        const [prodRes, catRes, brandRes] = await Promise.all([
          fetch(`${BACKEND_URL}/api/products`),
          fetch(`${BACKEND_URL}/api/categories`),
          fetch(`${BACKEND_URL}/api/brands`)
        ]);

        const prodData = await prodRes.json();
        const catData = await catRes.json();
        const brandData = await brandRes.json();

        setProducts(prodData || []);
        setCategories(catData || []);
        setBrands(brandData || []);
      } catch (err) {
        console.error("Failed to load e-commerce data:", err);
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
                            (p.description || "").toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "all" || p.category_id === selectedCategory;
      const matchesBrand = selectedBrand === "all" || p.brand_id === selectedBrand;
      const currentPrice = p.sale_price ?? p.price;
      const matchesPrice = currentPrice <= priceRange;
      const matchesTech = selectedTech === "all" || p.panel_technology === selectedTech;
      const matchesPhase = selectedPhase === "all" || p.phase === selectedPhase;
      const matchesBatCap = selectedBatteryCap === "all" || p.battery_capacity === selectedBatteryCap;
      const matchesStock = !inStockOnly || p.stock_quantity > 0;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesTech && matchesPhase && matchesBatCap && matchesStock;
    })
    .sort((a, b) => {
      const aPrice = a.sale_price ?? a.price;
      const bPrice = b.sale_price ?? b.price;
      if (sortBy === "price-asc") return aPrice - bPrice;
      if (sortBy === "price-desc") return bPrice - aPrice;
      if (sortBy === "wattage") return (b.watt_capacity || 0) - (a.watt_capacity || 0);
      // default: latest
      return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    });

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <Header />
      <PageHero
        title="Solar Hardware Shop"
        subtitle="Industrial-grade panels, smart grid-tie/hybrid inverters, and hot-dip galvanized mounting structures."
      />

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Advanced Sidebar Filters */}
          <aside className="space-y-6 bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 h-fit mb-8 lg:mb-0">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                <Filter className="h-4 w-4" /> Categories
              </h3>
              <div className="mt-4 space-y-1">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                    selectedCategory === "all" ? "bg-primary/20 text-primary" : "text-slate-350 hover:bg-slate-800"
                  }`}
                >
                  <span>All Categories</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                      selectedCategory === cat.id ? "bg-primary/20 text-primary" : "text-slate-350 hover:bg-slate-800"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-slate-800" />

            {/* Brand Filter */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Brands</h3>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 mt-3 text-xs focus:outline-none focus:border-primary text-white"
              >
                <option value="all">All Brands</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            <hr className="border-slate-800" />

            {/* Price filter */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Price Limit</h3>
              <div className="mt-3">
                <input
                  type="range"
                  min="1000"
                  max="200000"
                  step="2000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-primary bg-slate-700 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-bold">
                  <span>Min: ₹1,000</span>
                  <span className="text-primary font-mono text-xs">Max: ₹{priceRange.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <hr className="border-slate-800" />

            {/* Technology / Specifications Filters */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary">Solar Specs</h3>
              
              {/* Tech */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Panel Technology</label>
                <select
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                >
                  <option value="all">Any Technology</option>
                  <option value="TOPCon">TOPCon</option>
                  <option value="PERC">PERC</option>
                </select>
              </div>

              {/* Inverter Phase */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Inverter Phase</label>
                <select
                  value={selectedPhase}
                  onChange={(e) => setSelectedPhase(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                >
                  <option value="all">Any Phase</option>
                  <option value="single-phase">Single Phase</option>
                  <option value="three-phase">Three Phase</option>
                </select>
              </div>

              {/* Battery Capacity */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Battery Capacity</label>
                <select
                  value={selectedBatteryCap}
                  onChange={(e) => setSelectedBatteryCap(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                >
                  <option value="all">Any Capacity</option>
                  <option value="150Ah">150Ah</option>
                  <option value="200Ah">200Ah</option>
                </select>
              </div>

              {/* Stock toggle */}
              <label className="flex items-center gap-2 text-xs text-slate-350 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-primary rounded"
                />
                <span>In-Stock Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid / List Section */}
          <main className="lg:col-span-3 space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
              {/* Search */}
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-450" />
                <input
                  type="text"
                  placeholder="Search solar catalog..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-primary text-white"
                />
              </div>

              {/* Layout & Sort controls */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded transition ${viewMode === "grid" ? "bg-primary text-slate-900" : "text-slate-400"}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded transition ${viewMode === "list" ? "bg-primary text-slate-900" : "text-slate-400"}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none"
                  >
                    <option value="latest">Latest Arrivals</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="wattage">Watt Capacity</option>
                  </select>
                </div>
              </div>
            </div>

            {/* List or Grid items */}
            {filteredProducts.length === 0 ? (
              <div className="text-center p-12 bg-slate-800/20 border border-dashed rounded-3xl text-slate-450">
                No products found matching your active filter criteria. Try adjusting filters.
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((p) => {
                  const hasDiscount = p.sale_price !== null;
                  const finalPrice = p.sale_price ?? p.price;
                  const isOutOfStock = p.stock_quantity <= 0;

                  return (
                    <div key={p.id} className="bg-slate-800/40 rounded-3xl border border-slate-700/50 overflow-hidden hover:border-primary/50 transition group flex flex-col h-full shadow-lg">
                      <Link to={`/products/${p.slug}`} className="relative block overflow-hidden aspect-video bg-slate-950">
                        <img
                          src={getProductImage(p.images)}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        {hasDiscount && (
                          <span className="absolute top-4 left-4 bg-primary text-slate-900 font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                            Offer
                          </span>
                        )}
                        {isOutOfStock && (
                          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center font-bold text-xs text-red-500 uppercase tracking-widest">
                            Out of stock
                          </div>
                        )}
                      </Link>

                      <div className="p-5 space-y-4 flex flex-col flex-1">
                        <div>
                          <span className="text-[10px] font-bold text-primary tracking-wider uppercase block">
                            {p.category?.name || "Solar Component"}
                          </span>
                          <h4 className="font-bold text-sm text-white group-hover:text-primary transition mt-1 line-clamp-2 min-h-[40px]">
                            <Link to={`/products/${p.slug}`}>{p.name}</Link>
                          </h4>
                          <span className="text-[10px] font-mono text-slate-450 block mt-1">SKU: {p.sku}</span>
                        </div>

                        {/* Specs badge pill */}
                        {p.watt_capacity && (
                          <div className="inline-flex items-center gap-1 text-[10px] bg-slate-900 border border-slate-850 px-2 py-1 rounded-lg text-slate-350 w-fit">
                            <Zap className="h-3 w-3 text-primary" /> {p.watt_capacity}W Capacity
                          </div>
                        )}

                        <div className="mt-auto pt-4 border-t border-slate-700/30 flex items-end justify-between">
                          <div>
                            {hasDiscount && (
                              <span className="text-[10px] text-slate-450 line-through block font-mono">
                                ₹{p.price.toLocaleString("en-IN")}
                              </span>
                            )}
                            <span className="text-base font-black font-mono text-primary">
                              ₹{finalPrice.toLocaleString("en-IN")}
                            </span>
                          </div>

                          <button
                            onClick={() => handleAddToCart(p)}
                            disabled={isOutOfStock}
                            className="p-2.5 bg-primary hover:bg-primary-hover text-slate-900 rounded-xl transition disabled:bg-slate-750 disabled:text-slate-500"
                          >
                            {addedItems[p.id] ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((p) => {
                  const hasDiscount = p.sale_price !== null;
                  const finalPrice = p.sale_price ?? p.price;
                  const isOutOfStock = p.stock_quantity <= 0;

                  return (
                    <div key={p.id} className="bg-slate-800/40 rounded-3xl border border-slate-700/50 p-4 hover:border-primary/50 transition flex gap-5 items-center shadow-lg">
                      <Link to={`/products/${p.slug}`} className="w-24 sm:w-36 aspect-video rounded-xl overflow-hidden bg-slate-950 relative flex-shrink-0">
                        <img
                          src={getProductImage(p.images)}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                        {isOutOfStock && (
                          <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center font-bold text-[9px] text-red-500 uppercase tracking-widest">
                            Out
                          </div>
                        )}
                      </Link>

                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold text-primary tracking-wider uppercase block">
                          {p.category?.name}
                        </span>
                        <h4 className="font-bold text-sm sm:text-base text-white hover:text-primary transition mt-0.5 truncate">
                          <Link to={`/products/${p.slug}`}>{p.name}</Link>
                        </h4>
                        <p className="text-slate-400 text-xs line-clamp-2 mt-1 hidden sm:block">{p.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[10px] font-mono text-slate-450">SKU: {p.sku}</span>
                          {p.watt_capacity && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] bg-slate-900 px-2 py-0.5 rounded text-slate-350">
                              {p.watt_capacity}W
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0 space-y-2">
                        <div>
                          {hasDiscount && (
                            <span className="text-[10px] text-slate-450 line-through block font-mono">
                              ₹{p.price.toLocaleString("en-IN")}
                            </span>
                          )}
                          <span className="text-base font-black font-mono text-primary">
                            ₹{finalPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(p)}
                          disabled={isOutOfStock}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary hover:bg-primary-hover text-slate-900 text-xs font-bold rounded-lg transition disabled:bg-slate-750 disabled:text-slate-500"
                        >
                          {addedItems[p.id] ? <Check className="h-3.5 w-3.5" /> : <ShoppingCart className="h-3.5 w-3.5" />} Add
                        </button>
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
