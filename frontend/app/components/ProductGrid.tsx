"use client"

import { useEffect, useRef } from "react"
import { CartItem } from "../types/cart"
import { Product } from "../types/product"
import ProductCard from "./ProductCard"
import SkeletonCard from "./SkeletonCard"

type Props = {
  products: Product[]
  loading: boolean
  error: string | null
  onAddToCart: (item: CartItem) => void
   onSelectProduct: (product: Product) => void
  hasMore: boolean
  onLoadMore: () => void
}

export default function ProductGrid({
  products,
  loading,
  error,
  onAddToCart,
  hasMore,
  onSelectProduct,
  onLoadMore,
}: Props) {
  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasMore) return

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        onLoadMore()
      }
    })

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, onLoadMore])

  if (error) {
    return <p className="text-red-500">Failed to load products</p>
  }

  return (
    <>
      <div
        className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onSelectProduct}
            onAddToCart={onAddToCart}
          />
        ))}

        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
      </div>

      {hasMore && (
        <div
          ref={loaderRef}
          className="h-10 flex items-center justify-center"
        >
          <span className="text-sm text-gray-400">
            Loading more...
          </span>
        </div>
      )}
    </>
  )
}