"use client";

import { X, Download } from "lucide-react";
import { useCart } from "@/app/contexts/CartContext";
import CartItemRow from "./CartItemRow";
import { flattenObject } from "@/app/utils/flattenObject";
import { downloadFile } from "@/app/utils/download";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartModal({ open, onClose }: Props) {
  const { items, total, clearCart } = useCart();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const cartSummary = {
    items,
    metadata: {
      timestamp: new Date().toISOString(),
      total,
    },
  };

  if (!open) return null;

  const handleExport = (type: "json" | "txt") => {
  const cartSummary = {
    items,
    metadata: {
      timestamp: new Date().toISOString(),
      total,
    },
  }

  const flattened = flattenObject(cartSummary)

  downloadFile(
    flattened,
    `cart-export-${Date.now()}.${type}`,
    type
  )
}

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <aside className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              Your cart is empty
            </p>
          )}

          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </div>

        {/* Footer */}
        <div className="border-t p-4 space-y-3">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>฿{total.toLocaleString()}</span>
          </div>

          {/* Download buttons */}
          <div className="flex gap-2">
            <button
             onClick={() => handleExport("json")}
              className="flex-1 border py-2 rounded-md hover:bg-gray-100 text-sm"
              disabled={items.length === 0}
            >
              Download .json
            </button>

            <button
              onClick={() => handleExport("txt")}
              className="flex-1 border py-2 rounded-md hover:bg-gray-100 text-sm"
              disabled={items.length === 0}
            >
              Download .txt
            </button>
          </div>

          <button
            className="
    w-full
    bg-black text-white
    py-2 rounded-md
    hover:bg-gray-800 transition
    disabled:opacity-50
  "
            disabled={items.length === 0}
            onClick={() => setConfirmOpen(true)}
          >
            Checkout
          </button>
        </div>
      </aside>

      <ConfirmModal
        open={confirmOpen}
        title="Confirm Checkout"
        description="Are you sure you want to checkout? This will clear your cart."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          clearCart();
          setConfirmOpen(false);
          onClose();
        }}
      />
    </div>
  );
}
