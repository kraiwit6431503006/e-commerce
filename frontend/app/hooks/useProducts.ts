"use client"

import { useEffect, useState } from "react"
import { Product } from "../types/product"

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products")

        if (!res.ok) {
          throw new Error("Failed to fetch products")
        }

        const data: Product[] = await res.json()

        if (mounted) {
          setProducts(data)
        }
      } catch (err) {
        if (mounted) {
          setError("Something went wrong")
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      mounted = false
    }
  }, [])

  return { products, loading, error }
}
