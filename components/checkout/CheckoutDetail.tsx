"use client"

import useCartService from '@/lib/hooks/useCartStore';
import { priceFormat } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';

const CheckoutDetail = () => {

    const router = useRouter();

    const { items, itemsPrice, totalPrice, selectedPayment, shippingPrice } =
      useCartService();
    const [mounted, setMounted] = useState(false);
  
    useEffect(() => {
      setMounted(true);
    }, []);

  return (
    <div>
      <div className="text-lg font-semibold mb-5">Sepet Detayı</div>
      <div className="max-h-96 overflow-y-auto">
        {items.map((cartItem, index) => (
          <div
            key={index}
            className="flex items-start justify-between h-20 w-full"
          >
            <div className="flex space-x-5 h-full">
              <div className="block w-16 h-16 relative overflow-hidden">
                {cartItem.images && cartItem.images.length !== 0 ? (
                  <Image
                    src={cartItem.images[0]}
                    fill
                    alt=""
                    className="w-full object-contain"
                  />
                ) : (
                  <div>Resim yok...</div>
                )}
              </div>
              <div className="flex flex-col h-full justify-between text-sm font-semibold">
                {cartItem.title}
              </div>
            </div>
            <div className="flex flex-col h-full justify-between items-end">
              <div className="flex flex-col text-sm font-bold">
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
      <Separator className="my-5" />
      <ul className="space-y-2.5">
        <li className="flex items-center justify-between">
          <div>Ara Toplam:</div>
          <div>{priceFormat("TRY", "TRY", "tr-TR", itemsPrice / (1 + 20 / 100) )}</div>
        </li>
        <li className="flex items-center justify-between">
          <div>KDV (%20):</div>
          <div>{priceFormat("TRY", "TRY", "tr-TR", itemsPrice - (itemsPrice / (1 + 20 / 100)) )}</div>
        </li>
        <li className="flex items-center justify-between">
          <div>Teslimat / Kargo:</div>
          <div>{priceFormat("TRY", "TRY", "tr-TR", shippingPrice)}</div>
        </li>
        {selectedPayment && selectedPayment.type === "offline" && (
          <li className="flex items-center justify-between">
            <div>{selectedPayment.title}</div>
            <div>{priceFormat("TRY", "TRY", "tr-TR", selectedPayment.transactionCost || 0)}</div>
          </li>
        )}
      </ul>
      <Separator className="my-5" />
      <Button variant="link" className="p-0 m-0 h-auto">
        Kupon kodu kullan
      </Button>
      <Separator className="my-5" />
      <div className="flex items-center justify-between text-lg font-semibold">
        <div>Toplam:</div>
        <div>{priceFormat("TRY", "TRY", "tr-TR", totalPrice)}</div>
      </div>
      <div className="w-full text-center mt-10">
        <p>Secriva tarfından geliştirildi.</p>
      </div>
    </div>
  );
}

export default CheckoutDetail