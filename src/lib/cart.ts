export interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  sale_price?: number | null;
  image: string;
  quantity: number;
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("flash_cart") || "[]");
  } catch (e) {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("flash_cart", JSON.stringify(cart));
  // Dispatch custom event to notify header cart bubble
  window.dispatchEvent(new Event("flash_cart_update"));
}

export function addToCart(product: { id: string; name: string; slug: string; price: number; sale_price?: number | null; images?: any }, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);
  
  let image = "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600";
  if (product.images) {
    try {
      const imgs = typeof product.images === "string" ? JSON.parse(product.images) : product.images;
      if (Array.isArray(imgs) && imgs.length > 0) {
        image = imgs[0];
      }
    } catch (e) {}
  }

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      sale_price: product.sale_price,
      image,
      quantity,
    });
  }
  saveCart(cart);
}

export function removeFromCart(id: string) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}

export function updateCartQuantity(id: string, quantity: number) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity = Math.max(1, quantity);
    saveCart(cart);
  }
}

export function clearCart() {
  saveCart([]);
}
