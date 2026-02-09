"use client";

import { Minus, Plus, Trash, Package } from "lucide-react";
import { CartItem } from "@/app/types/cart";
import { useCart } from "@/app/contexts/CartContext";

type Props = {
  item: CartItem;
};

export default function CartItemRow({ item }: Props) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="flex gap-3 mb-4 items-start">
      <div
        className="
          w-16 h-16
          flex items-center justify-center
          border rounded
          bg-gray-50
          shrink-0
        "
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain p-1"
          />
        ) : (
          <Package className="w-6 h-6 text-gray-400" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className="font-medium line-clamp-2 text-sm"
          title={item.name}
        >
          {item.name}
        </p>

        <p className="text-xs text-gray-500 mt-0.5">
          ฿{item.price.toLocaleString()} / item
        </p>

        {/* Quantity */}
        <div className="flex items-center gap-2 mt-2">
          <button
            className="
              p-1 border rounded
              hover:bg-gray-100
              disabled:opacity-40
            "
            onClick={() => updateQty(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="w-6 text-center text-sm">
            {item.quantity}
          </span>

          <button
            className="p-1 border rounded hover:bg-gray-100"
            onClick={() => updateQty(item.id, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Remove */}
      <button
        className="
          text-gray-400
          hover:text-red-500
          transition
          mt-1
        "
        onClick={() => removeItem(item.id)}
        aria-label="Remove item"
      >
        <Trash className="w-4 h-4" />
      </button>
    </div>
  );
}
