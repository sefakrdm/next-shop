import React, { Suspense, lazy } from "react";
import BigSlider from "@/components/index/BigSlider";
import dynamic from "next/dynamic";
// import SaleProducts from "@/components/index/SaleProducts";

const LazySaleProducts = dynamic(() => import("../../components/index/SaleProducts").then((mod) => mod.SaleProducts), {
  loading: () => <div>Yükleniyor...</div>,
});

export default function Home() {

  // const session = await auth();
  // console.log("Home Session: ", session);

  return (
    <>
      <section className="mt-4">
        <div className="container">
            <BigSlider />
        </div>
      </section>

      <section className="mt-20">
        <div className="container">
            <h2 className="text-3xl font-extrabold mb-5">Öne Çıkan Ürünler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
              <LazySaleProducts />
            </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="container">
            <h2 className="text-3xl font-extrabold mb-5">Tüm Ürünler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
              <LazySaleProducts />
            </div>
        </div>
      </section>
    </>
  );
}
