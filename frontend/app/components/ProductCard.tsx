"use client";

import { CartItem } from "../types/cart";
import { Product } from "../types/product";

type Props = {
  product: Product;
  onClick: (product: Product) => void;
  onAddToCart: (item: CartItem) => void;
};

export default function ProductCard({
  product,
  onAddToCart,
  onClick,
}: Props) {
  return (
    <div
      className="border rounded-lg bg-white hover:shadow-md transition cursor-pointer"
      onClick={() => onClick(product)}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain p-4"
      />

      <div className="p-4">
        <h3 className="font-medium mb-1 line-clamp-1">
          {product.title}
        </h3>

        <div className="text-sm text-gray-600 mb-3 flex justify-between">
          <p>฿{product.price.toLocaleString()}</p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart({
              id: product.id.toString(),
              name: product.title,
              image: product.image,
              price: product.price,
              quantity: 1,
            });
          }}
          className="
            w-full
            bg-black text-white
            py-2 rounded-md
            hover:bg-gray-800 transition
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
