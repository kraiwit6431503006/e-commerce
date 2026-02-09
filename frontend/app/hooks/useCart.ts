import { useEffect, useState, useCallback } from "react"
import { CartItem } from "../types/cart"

const STORAGE_KEY = "cart"

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) setItems(JSON.parse(raw))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      const found = prev.find(i => i.id === item.id)
      if (found) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQty = useCallback((id: string, qty: number) => {
    setItems(prev =>
      prev.map(i =>
        i.id === id ? { ...i, quantity: Math.max(1, qty) } : i
      )
    )
  }, [])

  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  )

  return { items, addItem, removeItem, updateQty, total }
}
