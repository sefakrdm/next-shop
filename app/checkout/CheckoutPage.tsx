"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import useCartService from '@/lib/hooks/useCartStore';
import { cn, priceFormat } from '@/lib/utils';
import { AddressTypes, PaymentTypes, ShippingTypes } from '@/utils/definitions';
import { LockKey, PencilSimpleLine, Trash } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface CheckoutProps {
    addresses: AddressTypes[];
    shippings: ShippingTypes[];
    payments: PaymentTypes[];
}

interface ProvinceProps {
    value: string;
    label: string;
}

const CheckoutPageClient:React.FC<CheckoutProps> = ({ addresses, shippings, payments }) => {

  const { selectShipping, selectPayment } = useCartService();

    const [selectAddress, setSelectAddress] = useState<string | null>(addresses[0]._id);

    const [selectShippingMethod, setSelectShippingMethod] = useState<string | null>(shippings[0]._id);

    const [selectPaymentMethod, setSelectPaymentMethod] = useState<string | null>(null);

    const [open, setOpen] = useState<boolean>(false);
    const [selectProvince, setSelectProvince] = useState<string | null>("");

    const provinces: ProvinceProps[] = [
        {
            value: "izmir",
            label: "İzmir",
        },
        {
            value: "istanbul",
            label: "İstanbul",
        },
        {
            value: "ankara",
            label: "Ankara",
        },
        {
            value: "bursa",
            label: "Bursa",
        }
    ];

    useEffect(() => {
      const selectedShipping = shippings.find(shipping => shipping._id === selectShippingMethod);
      if (selectedShipping) {
        selectShipping(selectedShipping);
      }
    }, [selectShippingMethod, shippings, selectShipping]);
  
    useEffect(() => {
      const selectedPayment = payments.find(payment => payment._id === selectPaymentMethod);
      if (selectedPayment) {
        selectPayment(selectedPayment);
      }
    }, [selectPaymentMethod, payments, selectPayment]);

  return (
    <div>
      <div>
        <div className="text-2xl font-bold mb-5">Teslimat Adresi</div>
        {addresses && addresses.length != 0 ? (
          <div className="flex flex-col space-y-5">
            {addresses.map((address, index) => (
              <div
                key={index}
                onClick={() => setSelectAddress(address._id)}
                className={cn(
                  "flex items-center justify-between border rounded-lg h-20 w-full p-4 drop-shadow-sm bg-white cursor-pointer transition-all ease-linear",
                  selectAddress === address._id && "bg-slate-100 border-primary"
                )}
              >
                <div className="flex items-center space-x-2.5">
                  <Checkbox
                    checked={selectAddress === address._id ? true : false}
                    className="rounded-full h-6 w-6 transition-all ease-linear"
                  />
                  <div className="flex flex-col items-start justify-between h-auto">
                    <div className="text-base font-bold">{address.title}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-lg">
                      {address.name +
                        " " +
                        address.surname +
                        " / " +
                        address.addressLine1 +
                        " " +
                        address.addressLine2 +
                        " / " +
                        address.province +
                        " - " +
                        address.district}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Button variant="outline" onClick={() => alert("clik edit")}>
                    <PencilSimpleLine className="mr-2" />
                    Düzenle
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => alert("clik edit")}
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center border h-20 w-full rounded-lg p-4 drop-shadow-sm">
            Kayıtlı adresiniz bulunmuyor.
          </div>
        )}
        <div
          className={cn(
            "flex flex-col items-center justify-center border rounded-lg h-full w-full px-4 drop-shadow-sm bg-white mt-5 cursor-pointer transition-all ease-linear",
            selectAddress === null && "bg-slate-100 border-primary"
          )}
          onClick={() => setSelectAddress(null)}
        >
          <div className="flex items-center justify-start space-x-2.5 w-full h-20">
            <Checkbox
              checked={selectAddress === null ? true : false}
              className="rounded-full h-6 w-6 transition-all ease-linear"
              id="newAddress"
            />
            <div className="text-base font-bold">Yeni Adres Ekle</div>
          </div>
          {selectAddress === null && (
            <form className="space-y-5 px-8 pb-5 w-full transition-all ease-linear">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col space-y-0.5">
                  <label htmlFor="name" className="font-semibold">
                    Ad
                  </label>
                  <Input
                    placeholder="Ad"
                    id="name"
                    className="border rounded-md h-12 p-4"
                  />
                </div>
                <div className="flex flex-col space-y-0.5">
                  <label htmlFor="surname" className="font-semibold">
                    Soyad
                  </label>
                  <Input
                    placeholder="Soyad"
                    id="surname"
                    className="border rounded-md h-12 p-4"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-0.5">
                <label htmlFor="addressLine1" className="font-semibold">
                  Adres Satırı 1
                </label>
                <Input
                  placeholder="Mahalle, cadde, sokak vb."
                  id="addressLine1"
                  className="border rounded-md h-12 p-4"
                />
              </div>
              <div className="flex flex-col space-y-0.5">
                <label htmlFor="addressLine2" className="font-semibold">
                  Adres Satırı 2
                </label>
                <Input
                  placeholder="Apartman, daire, numara vb."
                  id="addressLine2"
                  className="border rounded-md h-12 p-4"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col space-y-0.5">
                  <label htmlFor="il" className="font-semibold">
                    İl
                  </label>
                  <Select
                    onValueChange={setSelectProvince}
                    // defaultValue={selectProvince}
                  >
                    <SelectTrigger className="border rounded-md h-12 p-4">
                      <SelectValue placeholder="İl seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province, index) => (
                        <SelectItem key={index} value={province.value}>
                          {province.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-0.5">
                  <label htmlFor="il" className="font-semibold">
                    İlçe
                  </label>
                  <Select
                    onValueChange={setSelectProvince}
                    // defaultValue={selectProvince}
                  >
                    <SelectTrigger className="border rounded-md h-12 p-4">
                      <SelectValue placeholder="İlçe seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province, index) => (
                        <SelectItem key={index} value={province.value}>
                          {province.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button size="lg" className="w-full text-base">
                Kaydet
              </Button>
            </form>
          )}
        </div>
      </div>
      <Separator className="my-10" />
      <div>
        <div className="text-2xl font-bold mb-5">Kargo Seçenekleri</div>
        {selectAddress ? (
          <>
            {shippings && shippings.length != 0 ? (
              <div className="grid grid-cols-2 gap-5">
                {shippings.map((shipping, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectShippingMethod(shipping._id)}
                    className={cn(
                      "flex items-center justify-between border rounded-lg h-20 w-full p-4 drop-shadow-sm bg-white cursor-pointer transition-all ease-linear",
                      selectShippingMethod === shipping._id &&
                        "bg-slate-100 border-primary"
                    )}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Checkbox
                        checked={
                          selectShippingMethod == shipping._id ? true : false
                        }
                        className="rounded-full h-6 w-6 transition-all ease-linear"
                      />
                      <div className="flex items-center space-x-2.5 h-auto">
                        {shipping.image && (
                          <div className="relative overflow-hidden w-28 h-10">
                            <Image
                              src={`/images/${shipping.image}`}
                              alt="kargo img"
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        {!shipping.image && (
                          <div className="text-base font-bold">
                            {shipping.title}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-base font-extrabold">
                      {priceFormat("TRY", "TRY", "tr-TR", shipping.price)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center border h-20 w-full p-4 drop-shadow-sm bg-white rounded-lg">
                Kayıtlı kargo seçeneği bulunmuyor.
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center border h-20 w-full p-4 drop-shadow-sm bg-white rounded-lg">
            Kargo seçeneklerini görebilmek için adres seçimi yapınız.
          </div>
        )}
      </div>
      <Separator className="my-10" />
      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-none p-0 m-0">
            <AccordionTrigger className="text-2xl font-bold mb-2.5 p-0">
              Sipariş Notu Ekle
            </AccordionTrigger>
            <AccordionContent>
              <Textarea placeholder="Notunuz..." />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <Separator className="my-10" />
      <div>
        <div className="text-2xl font-bold mb-5">Ödeme Yöntemleri</div>
        {payments && payments.length != 0 ? (
          <div className="flex flex-col space-y-5">
            {payments.map((payment, index) => (
              <div
                key={index}
                onClick={() => setSelectPaymentMethod(payment._id)}
                className={cn(
                  "flex flex-col border rounded-lg h-full w-full px-4 drop-shadow-sm bg-white cursor-pointer transition-all ease-linear",
                  selectPaymentMethod === payment._id &&
                    "bg-slate-100 border-primary"
                )}
              >
                <div className="flex items-center justify-between w-full h-20">
                  <div className="flex items-center justify-start space-x-2.5">
                    <Checkbox
                      checked={
                        selectPaymentMethod === payment._id ? true : false
                      }
                      className="rounded-full h-6 w-6 transition-all ease-linear"
                    />
                    <div className="flex items-center space-x-2.5 h-auto">
                      {payment.image && (
                        <div className="relative overflow-hidden w-28 h-10">
                          <Image
                            src={`/images/${payment.image}`}
                            alt="kargo img"
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <div className="text-base font-bold">{payment.title}</div>
                    </div>
                  </div>
                  {payment.transactionCost && (
                    <div className="text-base font-semibold">
                      {priceFormat(
                        "TRY",
                        "TRY",
                        "tr-TR",
                        payment.transactionCost
                      ) + " işlem bedeli"}
                    </div>
                  )}
                </div>
                {selectPaymentMethod == payment._id &&
                  payment.type === "card" && (
                    <form className="space-y-5 px-8 pb-5 w-full transition-all ease-linear">
                      <div className="flex flex-col space-y-0.5">
                        <label htmlFor="cardNumber" className="font-semibold">
                          Kart Numarası
                        </label>
                        <Input
                          placeholder="Kart Numarası"
                          id="cardNumber"
                          className="border rounded-md h-12 p-4"
                        />
                      </div>
                      <div className="flex flex-col space-y-0.5">
                        <label htmlFor="cardName" className="font-semibold">
                          Kart Üzerindeki İsim
                        </label>
                        <Input
                          placeholder="Kart Üzerindeki İsim"
                          id="cardName"
                          className="border rounded-md h-12 p-4"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col space-y-0.5">
                          <label htmlFor="date" className="font-semibold">
                            Ay / Yıl
                          </label>
                          <Input
                            placeholder="Ay / Yıl"
                            id="date"
                            className="border rounded-md h-12 p-4"
                          />
                        </div>
                        <div className="flex flex-col space-y-0.5">
                          <label htmlFor="cardCCV" className="font-semibold">
                            CCV
                          </label>
                          <Input
                            placeholder="CCV"
                            id="cardCCV"
                            className="border rounded-md h-12 p-4"
                          />
                        </div>
                      </div>
                    </form>
                  )}
                {selectPaymentMethod == payment._id && payment.description && (
                  <div className="text-base px-8 pb-5 w-full transition-all ease-linear">
                    {payment.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-lg border h-full w-full p-6 drop-shadow-sm">
            Kayıtlı ödeme yöntemi bulunmuyor.
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-5 mt-10 w-full">
        <div className="items-top flex space-x-2">
          <Checkbox id="invoiceAddress" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="invoiceAddress"
              className="font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Fatura adresim teslimat adresimle aynı
            </label>
          </div>
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox id="privacyTerms" />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="privacyTerms"
              className="font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Gizlilik Sözleşmesini ve Satış Sözleşmesini okudum, onaylıyorum.
            </label>
          </div>
        </div>
        <Button size="lg" className="text-lg h-14 uppercase">
          Alışverişi Tamamla
        </Button>
        <div className="flex items-center justify-center w-full mt-10">
          <LockKey className="mr-2" />
          Ödemeler güvenli ve şifreldir
        </div>
      </div>
      <div className="mt-40 mb-2.5">
        <Link href="/">Gizlilik Sözleşmesi</Link>
      </div>
    </div>
  );
}

export default CheckoutPageClient