"use client";

import useCartService from "@/lib/hooks/useCartStore";
import { Minus, Plus } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";

interface ProductQtyProps {
  stock: number;
}

const ProductQty: React.FC<ProductQtyProps> = ({ stock }) => {
  const [productQty, setProductQty] = useState<number>(1);

  const { items } = useCartService();

  const handleIncreaseQty = () => {
    if (productQty < stock) {
      setProductQty(productQty + 1);
    }
  };

  const handleDecreaseQty = () => {
    if (productQty > 1) {
      setProductQty(productQty - 1);
    }
  };

  return (
    <div className="flex items-center border rounded-md bg-gray-100 max-w-xs">
      <button
        type="button"
        className="flex items-center justify-center px-2 py-2.5"
        onClick={handleDecreaseQty}
      >
        <Minus />
      </button>
      <input
        type="number"
        min="1"
        max={stock}
        value={productQty}
        id="quantity-input"
        data-input-counter
        aria-describedby="helper-text-explanation"
        className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-12 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-semibold"
        required
      />
      <button
        type="button"
        className="flex items-center justify-center px-2 py-2.5"
        onClick={handleIncreaseQty}
      >
        <Plus />
      </button>
    </div>
  );
};

export default ProductQty;
