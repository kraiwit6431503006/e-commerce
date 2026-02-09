"use client";

import { X } from "lucide-react";
import { Product } from "../types/product";
import { CartItem } from "../types/cart";

type Props = {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
};

export default function ProductDetailModal({
  product,
  open,
  onClose,
  onAddToCart,
}: Props) {
  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div
        className="
          absolute inset-x-0 top-1/2 -translate-y-1/2
          mx-auto max-w-lg
          bg-white rounded-lg shadow-lg
          p-6
        "
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-56 object-contain mb-4"
        />

        {/* Info */}
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Category: {product.category}</p>

          <p className="text-gray-700 text-sm">{product.description}</p>

          <p className="text-lg font-semibold">
            ฿{product.price.toLocaleString()}
          </p>
        </div>

        {/* Actions */}
        <button
          className="
            mt-5 w-full
            bg-black text-white
            py-2 rounded-md
            hover:bg-gray-800 transition
          "
          onClick={() => {
            onAddToCart({
              id: product.id.toString(),
              name: product.title,
              image: product.image,
              price: product.price,
              quantity: 1,
            });
            onClose();
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
