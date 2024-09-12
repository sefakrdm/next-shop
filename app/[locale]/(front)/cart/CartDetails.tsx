"use client";

import { useRouter } from "next/navigation";
import useCartService from "@/lib/hooks/useCartStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Minus, Plus, Trash } from "@phosphor-icons/react/dist/ssr";
import { priceFormat } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { OrderItemTypes } from "@/utils/definitions";

export default function CartDetails() {
  const router = useRouter();
  const { items, addCart, increase, decrease, removeCart, itemsPrice } =
    useCartService();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const removeFromCartHandler = (item: OrderItemTypes) => {
    removeCart(item);
  };

  if (!mounted) return <></>;

  return (
    <>
      <h1 className="mb-5 font-semibold text-2xl">Sepetim</h1>

      {items.length === 0 ? (
        <div className="flex flex-col space-y-2">
          <h2>Sepetinizde ürün yok.</h2>
          <Link href="/">
            <Button size="lg">Alışverişe devam et</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-9">
            {items.map((cartItem, index) => (
              <div
                key={index}
                className="flex items-start justify-between h-32 w-full border-b pb-5 mt-5"
              >
                <div className="flex space-x-5 h-full">
                  <div className="block w-28 h-28 relative overflow-hidden">
                    {cartItem.images && cartItem.images.length !== 0 ? (
                      <Image
                        src={cartItem.images[0]}
                        fill
                        alt=""
                        className="w-full h-16 object-contain"
                      />
                    ) : (
                      <div>Resim yok...</div>
                    )}
                  </div>
                  <div className="flex flex-col h-full justify-between">
                    <Link href={`/product/${cartItem.slug}`}>
                      {cartItem.title}
                    </Link>
                    <div className="flex flex-col font-bold">
                      <span>
                        {priceFormat(
                          cartItem.currency,
                          "TRY",
                          "tr-TR",
                          cartItem.price
                        )}
                      </span>
                      <span>
                        {priceFormat(
                          cartItem.currency,
                          "USD",
                          "tr-TR",
                          cartItem.price
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col h-full justify-between items-end">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeFromCartHandler(cartItem)}
                  >
                    <Trash weight="bold" size={16} />
                  </Button>
                  <div className="flex items-center space-x-2.5">
                    <div className="text-sm font-medium">Adet:</div>
                    <div className="flex items-center max-w-xs border rounded-md">
                      <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        className="flex items-center justify-center"
                        onClick={() => decrease(cartItem)}
                        disabled={cartItem.qty > 1 ? false : true}
                      >
                        <Minus />
                      </Button>

                      <input
                        type="number"
                        min="1"
                        max="9999"
                        value={cartItem.qty}
                        defaultValue={cartItem.qty}
                        id="quantity-input"
                        data-input-counter
                        aria-describedby="helper-text-explanation"
                        className="text-center text-gray-900 text-sm font-semibold block w-8"
                        required
                      />

                      <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        className="flex items-center justify-center"
                        onClick={() => increase(cartItem)}
                      >
                        <Plus />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-3 h-full">
            <div className="space-y-5 sticky top-5">
              <div className="bg-white drop-shadow rounded-lg space-y-2.5 p-5">
                <div className="text-xl font-semibold">Sipariş Özeti</div>
                <div className="flex items-center space-x-2">
                  <span className="text-base font-semibold">Toplam: </span>
                  <span className="text-base font-medium">
                    {priceFormat("USD", "TRY", "tr-TR", itemsPrice)}
                  </span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Kargo, vergi ve kupon kodları sonraki aşamada hesaplanacaktır.
                </p>
              </div>
              <Button
                size="lg"
                className="w-full text-base font-semibold drop-shadow"
                onClick={() => router.push("/checkout")}
              >
                Sepeti Onayla
                <ArrowRight weight="bold" className="text-base ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
