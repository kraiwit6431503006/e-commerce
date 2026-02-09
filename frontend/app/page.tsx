"use client";

import { useMemo, useState, useEffect } from "react";
import { useProducts } from "./hooks/useProducts";
import ProductGrid from "./components/ProductGrid";
import Filters from "./components/Filters";
import { Product } from "./types/product";
import { useCart } from "./contexts/CartContext";
import ProductDetailModal from "./components/ProductDetailModal";

type PriceRange = "" | "under-100" | "100-500" | "500+";

const PAGE_SIZE = 8;

export default function HomePage() {
  const { products, loading, error } = useProducts();
  const { addItem } = useCart();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState<PriceRange>("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, category, priceRange]);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      const matchSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory = !category || product.category === category;

      const matchPrice =
        priceRange === "" ||
        (priceRange === "under-100" && product.price < 100) ||
        (priceRange === "100-500" &&
          product.price >= 100 &&
          product.price <= 500) ||
        (priceRange === "500+" && product.price > 500);

      return matchSearch && matchCategory && matchPrice;
    });
  }, [products, search, category, priceRange]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Products</h2>
        <p className="text-sm text-gray-600">
          Browse our product catalog and add items to your cart
        </p>
      </section>

      <section className="mb-6">
        <Filters
          search={search}
          category={category}
          priceRange={priceRange}
          categories={categories}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onPriceChange={setPriceRange}
        />
      </section>

      <ProductGrid
        products={visibleProducts}
        loading={loading}
        error={error}
        onAddToCart={addItem}
        onSelectProduct={setSelectedProduct}
        hasMore={visibleCount < filteredProducts.length}
        onLoadMore={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
      />

      <ProductDetailModal
        open={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addItem}
      />
    </div>
  );
}
