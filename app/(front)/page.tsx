import BigSlider from "@/components/index/BigSlider";
import SaleProducts from "@/components/index/SaleProducts";
import clientPromise from "@/lib/mongodb";
import Image from "next/image";

export default function Home() {

  clientPromise

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
              <SaleProducts />
            </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="container">
            <h2 className="text-3xl font-extrabold mb-5">Tüm Ürünler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
              <SaleProducts />
            </div>
        </div>
      </section>
    </>
  );
}
