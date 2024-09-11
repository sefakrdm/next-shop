"use client";

import React, { useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  CaretDown,
  CheckCircle,
  CheckSquare,
  CheckSquareOffset,
  FileText,
  Package,
} from "@phosphor-icons/react/dist/ssr";
import moment from "moment";
import "moment/locale/tr";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/custom-ui/Accordion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type OrderProductsType = {
  id: string;
  title: string;
  image: string;
  price: string;
  slug: string;
  variant?: any[];
};

type orderDataType = {
  id: string;
  orderId: number;
  orderDate: string;
  orderProducts: OrderProductsType[];
  orderTotalPrice: string;
};

const orderData: orderDataType[] = [
  {
    id: "1",
    orderId: Math.floor(Math.random() * (999999999 - 0) + 0),
    orderDate: "2024.07.28 13:51:00",
    orderProducts: [
      {
        id: "66446cc781cb706b1456dac3",
        title: "SUBLIMATION SE",
        image:
          "https://www.bercostore.com/images/urunler/sublimation-se-resim-248.png",
        price: "1652.74",
        slug: "sublimation-se",
        variant: [
          {
            variantId: "1",
            variantName: "STANDART",
            variantType: "beden",
          },
        ],
      },
      {
        id: "66447626308198a757528dc5",
        title: "Becolink DTF Serisi",
        image:
          "https://www.bercostore.com/images/urunler/becolink-dtf-serisi-resim-258.png",
        price: "1129.8",
        slug: "becolink-dtf-serisi",
        variant: [
          {
            variantId: "1",
            variantName: "STANDART",
            variantType: "beden",
          },
        ],
      },
    ],
    orderTotalPrice: "2782,54",
  },
  {
    id: "2",
    orderId: Math.floor(Math.random() * (999999999 - 0) + 0),
    orderDate: "2024.07.28 13:51:00",
    orderProducts: [
      {
        id: "66446cc781cb706b1456dac3",
        title: "SUBLIMATION SE",
        image:
          "https://www.bercostore.com/images/urunler/sublimation-se-resim-248.png",
        price: "1652.74",
        slug: "sublimation-se",
      },
      {
        id: "66447626308198a757528dc5",
        title: "Becolink DTF Serisi",
        image:
          "https://www.bercostore.com/images/urunler/becolink-dtf-serisi-resim-258.png",
        price: "1129.8",
        slug: "becolink-dtf-serisi",
      },
    ],
    orderTotalPrice: "2782,54",
  },
  {
    id: "3",
    orderId: Math.floor(Math.random() * (999999999 - 0) + 0),
    orderDate: "2024.07.28 13:51:00",
    orderProducts: [
      {
        id: "66446cc781cb706b1456dac3",
        title: "SUBLIMATION SE",
        image:
          "https://www.bercostore.com/images/urunler/sublimation-se-resim-248.png",
        price: "1652.74",
        slug: "sublimation-se",
      },
      {
        id: "66447626308198a757528dc5",
        title: "Becolink DTF Serisi",
        image:
          "https://www.bercostore.com/images/urunler/becolink-dtf-serisi-resim-258.png",
        price: "1129.8",
        slug: "becolink-dtf-serisi",
      },
      {
        id: "66446cc781cb706b1456dac3",
        title: "SUBLIMATION SE",
        image:
          "https://www.bercostore.com/images/urunler/sublimation-se-resim-248.png",
        price: "1652.74",
        slug: "sublimation-se",
      },
      {
        id: "66447626308198a757528dc5",
        title: "Becolink DTF Serisi",
        image:
          "https://www.bercostore.com/images/urunler/becolink-dtf-serisi-resim-258.png",
        price: "1129.8",
        slug: "becolink-dtf-serisi",
      },
      {
        id: "66446cc781cb706b1456dac3",
        title: "SUBLIMATION SE",
        image:
          "https://www.bercostore.com/images/urunler/sublimation-se-resim-248.png",
        price: "1652.74",
        slug: "sublimation-se",
      },
      {
        id: "66447626308198a757528dc5",
        title: "Becolink DTF Serisi",
        image:
          "https://www.bercostore.com/images/urunler/becolink-dtf-serisi-resim-258.png",
        price: "1129.8",
        slug: "becolink-dtf-serisi",
      },
    ],
    orderTotalPrice: "2782,54",
  },
];

const OrdersPage = () => {
  const [openOrderDetail, setOpenOrderDetail] = useState<string | null>(null);

  return (
    <>
      <h1 className="text-xl font-semibold">Siparişlerim</h1>
      <Separator className="my-5" />
      <div>
        <Accordion type="single" collapsible className="space-y-5">
          {orderData.map((order, index) => (
            <AccordionItem
              key={index}
              value={`item-${order.id}`}
              className="rounded-lg border bg-background"
              id={`content-${order.id}`}
            >
              <AccordionTrigger
                className="py-2.5 px-5"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-5">
                    <div className="flex space-x-1 w-40">
                      {order.orderProducts.map((p, index) =>
                        index < 2 ? (
                          <Image
                            key={p.id} // Assuming `p.id` is unique for each product
                            src={p.image}
                            alt={p.title}
                            width={50}
                            height={50}
                            className="bg-white border drop-shadow-sm rounded-md w-12 h-12 object-contain p-0.5"
                          />
                        ) : (
                          index === 2 && (
                            <div
                              key={`extra-${p.id}`}
                              className="flex items-center justify-center font-semibold bg-white border drop-shadow-sm rounded-md w-12 h-12 p-0.5"
                            >
                              +{order.orderProducts.length - 2}
                            </div>
                          )
                        )
                      )}
                    </div>
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-base">
                        Sipariş no: <b>{order.orderId}</b>
                      </span>
                      <span className="text-xs font-semibold">
                        toplam {order.orderProducts.length} ürün
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle
                      size={20}
                      weight="duotone"
                      className="text-green-600"
                    />
                    <p className="text-sm font-medium">Sipariş Tamamlandı</p>
                  </div>
                  <div className="flex items-center space-x-5">
                    <div className="flex flex-col items-end leading-tight">
                      <span className="text-sm font-semibold text-muted-foreground">
                        {moment(order.orderDate).format("LL")}
                      </span>
                      <span className="font-bold text-primary">
                        {order.orderTotalPrice} TL
                      </span>
                    </div>
                    {/* <CaretDown size={26} /> */}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5">
                <Separator className="mb-5" />
                <div className="grid grid-cols-2 gap-12">
                  <div>
                    <h5 className="mb-2.5 text-xl font-semibold">
                      Sepet Özeti
                    </h5>
                    <ScrollArea>
                      <ul className="divide-y max-h-72 pr-2">
                        {order.orderProducts.map((p, index) => (
                          <li
                            key={index}
                            className="flex justify-between w-full py-2.5"
                          >
                            <div className="flex items-start space-x-2.5">
                              <Image
                                src={p.image}
                                alt={p.title}
                                width={64}
                                height={64}
                                className="border rounded-md p-0.5 object-contain w-16 h-16"
                              />
                              <div className="flex flex-col space-y-1">
                                <Link href={p.slug} className="font-semibold">
                                  {p.title}
                                </Link>
                                {p.variant &&
                                  p.variant.map((variant, index) => (
                                    <p
                                      key={index}
                                      className="text-xs capitalize"
                                    >
                                      {variant.variantType}:{" "}
                                      <b>{variant.variantName}</b>
                                    </p>
                                  ))}
                              </div>
                            </div>
                            <div className="">1 Adet</div>
                            <div className="font-semibold">{p.price} TL</div>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                    <div className="flex justify-end items-end w-full py-2.5">
                      <div className="text-base font-semibold">
                        Toplam: {order.orderTotalPrice} TL
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <h5 className="text-xl font-semibold">Sipariş İşlemleri</h5>
                    <div className="flex items-start space-x-2.5 border rounded-md p-2.5 bg-green-500/10">
                      <CheckSquareOffset
                        weight="duotone"
                        size={46}
                        className="text-green-500"
                      />
                      <div>
                        <p className="text-lg font-semibold">Teslim edildi</p>
                        <p className="text-xs font-medium">
                          Teslim tarihi: 30 May Per 2024, 17:04
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" size="lg">
                      <Package className="mr-2" size={18} />
                      Kargo takibi
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <FileText className="mr-2" size={18} />
                      Faturayı görüntüle
                    </Button>
                  </div>
                  <div className="space-y-2.5">
                    <h5 className="text-xl font-semibold">Adres Bilgileri</h5>
                    <div className="border rounded-md p-2.5">
                      <h6 className="text-base font-semibold mb-1">
                        Teslimat Adresi
                      </h6>
                      <div className="text-sm space-y-0.5">
                        <p className="font-semibold">İş yeri bersa</p>
                        <p className="">
                          10001 Sk. No: 7 Bersa Tekstil ve Kimya Aosb / Çiğli /
                          İzmir
                        </p>
                        <p className="font-semibold">
                          Sefa Karademir - 905*******43
                        </p>
                      </div>
                    </div>
                    <div className="border rounded-md p-2.5">
                      <h6 className="text-base font-semibold mb-1">
                        Fatura Bilgileri
                      </h6>
                      <div className="text-sm space-y-0.5">
                        <p className="font-semibold">İş yeri bersa</p>
                        <p className="">
                          10001 Sk. No: 7 Bersa Tekstil ve Kimya Aosb / Çiğli /
                          İzmir
                        </p>
                        <p className="font-semibold">
                          Sefa Karademir - 905*******43
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <h5 className="text-xl font-semibold">Ödeme Bilgileri</h5>
                    <div className="border rounded-md p-2.5"></div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {/* {orderData.map((order, index) => (
          <div
            key={index}
            className="flex flex-col items-start justify-start w-full py-2.5 px-5 rounded-xl border bg-accent/60"
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() =>
                setOpenOrderDetail(
                  order.id == openOrderDetail ? null : order.id
                )
              }
            >
              <div className="flex items-center space-x-5">
                <div className="flex space-x-1 w-40">
                  {order.orderProducts.map((p, index) =>
                    index < 2 ? (
                      <Image
                        key={p.id} // Assuming `p.id` is unique for each product
                        src={p.image}
                        alt={p.title}
                        width={50}
                        height={50}
                        className="bg-white border drop-shadow-sm rounded-md w-12 h-12 object-contain p-0.5"
                      />
                    ) : (
                      index === 2 && (
                        <div
                          key={`extra-${p.id}`}
                          className="flex items-center justify-center font-semibold bg-white border drop-shadow-sm rounded-md w-12 h-12 p-0.5"
                        >
                          +{order.orderProducts.length - 2}
                        </div>
                      )
                    )
                  )}
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-base">
                    Sipariş no: <b>{order.orderId}</b>
                  </span>
                  <span className="text-xs font-semibold">
                    toplam {order.orderProducts.length} ürün
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle
                  size={20}
                  weight="duotone"
                  className="text-green-600"
                />
                <p className="text-sm font-medium">Sipariş Tamamlandı</p>
              </div>
              <div className="flex items-center space-x-5">
                <div className="flex flex-col items-end leading-tight">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {moment(order.orderDate).format("LL")}
                  </span>
                  <span className="font-bold text-primary">
                    {order.orderTotalPrice} TL
                  </span>
                </div>
                <CaretDown size={26} />
              </div>
            </div>
            {openOrderDetail == order.id && <div>DETAİLLLL</div>}
          </div>
        ))} */}
      </div>
    </>
  );
};

export default OrdersPage;
