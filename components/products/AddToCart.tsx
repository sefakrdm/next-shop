"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCartService from "@/lib/hooks/useCartStore";
import { Button } from "../ui/button";
import { CircleNotch, Minus, Plus } from "@phosphor-icons/react/dist/ssr";
import { OrderItemTypes, ProductTypes } from "@/utils/definitions";

export default function AddToCart({ item }: { item: ProductTypes }) {
  const router = useRouter();
  const { items, addCart, increase, decrease } = useCartService();
  const [loading, setLoading] = useState<boolean>(false);

  const [productQty, setProductQty] = useState<number>(1);

  const handleIncreaseQty = () => {
    if (productQty < item.stock) {
      setProductQty(productQty + 1);
    }
  };

  const handleDecreaseQty = () => {
    if (productQty > 1) {
      setProductQty(productQty - 1);
    }
  };

  const handleQtyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const qtyNumber = Number(e.target.value);
    setProductQty(qtyNumber);
  }

  const addToCartHandler = () => {
    setLoading(true);
    setTimeout(() => {
       //addCart({ ...item, qty: productQty, variants: [] } as OrderItemTypes);
    }, 1000);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <div className="flex items-center border rounded-md bg-gray-100 max-w-xs">
        <button
          type="button"
          className="flex items-center justify-center px-2 py-2.5"
          onClick={handleDecreaseQty}
          disabled={item.stock === 0 ? true : false}
        >
          <Minus />
        </button>
        <input
          type="number"
          min="1"
          pattern="[0-9]"
          step="1"
          value={productQty}
          onChange={handleQtyChange}
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-12 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-semibold"
          required
          disabled={item.stock === 0 ? true : false}
        />
        <button
          type="button"
          className="flex items-center justify-center px-2 py-2.5"
          onClick={handleIncreaseQty}
          disabled={item.stock === 0 ? true : false}
        >
          <Plus />
        </button>
      </div>

      {loading ? (
        <Button
          className="w-full rounded-md text-lg font-semibold uppercase"
          size="lg"
          disabled
        >
          <CircleNotch className="mr-2 h-4 w-4 animate-spin" />
          Sepete Ekleniyor..
        </Button>
      ) : (
        <>
          {item.stock === 0 ? (
            <Button
              className="w-full rounded-md text-lg font-semibold uppercase"
              size="lg"
              disabled
            >
              Tükendi
            </Button>
          ) : (
            <Button
              className="w-full rounded-md text-lg font-semibold uppercase"
              size="lg"
              onClick={addToCartHandler}
            >
              Sepete Ekle
            </Button>
          )}
        </>
      )}
    </>
  );
}
