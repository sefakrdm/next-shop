"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  ArrowRight,
  CreditCard,
  Minus,
  Plus,
  ShoppingBag,
  Trash,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Link from "next/link";
import Image from "next/image";
import useCartService from "@/lib/hooks/useCartStore";
import { priceFormat } from "@/lib/utils";
import { IOrderItem } from "@/lib/models/OrderModel";
import { useRouter } from "next/navigation";

const BasketSheet: React.FC = () => {
  const router = useRouter();

  const { items, itemsPrice, removeCart, isCartPopupOpen, toggleCartPopup } =
    useCartService();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        className="relative h-12 rounded-xl"
        onClick={() => toggleCartPopup(!isCartPopupOpen)}
      >
        <ShoppingBag size={24} />
        <span className="absolute top-1 right-3 bg-blue-500 text-white text-xs font-semibold rounded-full h-4 w-4">
          {mounted && items.length != 0 ? items.length : 0}
        </span>
      </Button>
      <Sheet open={isCartPopupOpen} onOpenChange={toggleCartPopup}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              Sepetim ({mounted && items.length != 0 ? items.length : 0})
            </SheetTitle>
          </SheetHeader>
          <Separator className="my-5" />
          <div className="relative h-[500px] overflow-y-auto space-y-4">
            {mounted &&
              items.length != 0 &&
              items.map((cartItem, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between h-18 w-full border-b pb-4"
                >
                  <div className="flex space-x-5">
                    <Link
                      href={`/product/${cartItem.slug}`}
                      className="block w-16 h-16 relative overflow-hidden"
                    >
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
                    </Link>
                    <div className="flex flex-col h-auto justify-between w-3/5">
                      <div>
                        <Link
                          href={`/product/${cartItem.slug}`}
                          className="text-sm font-semibold leading-tight line-clamp-2"
                        >
                          {cartItem.title}
                        </Link>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <div className="text-xs font-medium">Adet:</div>
                        <div className="flex items-center max-w-xs">
                          <button
                            type="button"
                            className="flex items-center justify-center"
                          >
                            <Minus />
                          </button>

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

                          <button
                            type="button"
                            className="flex items-center justify-center"
                          >
                            <Plus />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col h-auto space-y-2.5 justify-between w-1/5">
                    <button onClick={() => removeCart(cartItem)}>
                      <Trash weight="bold" />
                    </button>
                    <div className="flex flex-col text-xs font-semibold">
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
              ))}
          </div>
          <SheetFooter className="absolute bottom-0 left-0 p-5 w-full">
            <div className="flex flex-col w-full space-y-2.5">
              <Button variant="outline">
                <CreditCard size={24} className="mr-2" />
                Ödeme Sayfasına Git
              </Button>
              <Button
                className="w-full h-20 bg-slate-900 hover:bg-slate-800"
                onClick={() => router.push("/cart")}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="text-start">
                    <div className="text-sm font-semibold">Toplam:</div>
                    <div className="font-extrabold">
                      {priceFormat("USD", "TRY", "tr-TR", itemsPrice)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 uppercase font-extrabold">
                    <span>Sepete Git</span>
                    <ArrowRight size={18} weight="bold" />
                  </div>
                </div>
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BasketSheet;
