"use client"

import { ShoppingCart } from "lucide-react"
import { useState, useEffect } from "react"
import { useCart } from "@/app/contexts/CartContext"
import CartModal from "./Cart/CartModal"

export default function Header() {
  const [open, setOpen] = useState(false)
  const { items } = useCart()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const count = items.reduce(
    (sum, i) => sum + i.quantity,
    0
  )

  return (
    <>
      <header className="
        fixed top-0 inset-x-0 z-50
        h-16
        bg-white/80 backdrop-blur
        border-b
      ">
        <div className="
          max-w-7xl mx-auto h-full
          px-4
          flex items-center justify-between
        ">
          <h1 className="text-lg font-semibold">
            Store
          </h1>

          <button
            onClick={() => setOpen(true)}
            className="
              relative
              p-2 rounded-md
              hover:bg-gray-100
              transition
            "
          >
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="
                absolute -top-1 -right-1
                text-xs
                bg-black text-white
                w-5 h-5 rounded-full
                flex items-center justify-center
              ">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      <CartModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
