import React from "react";
import Image from "next/image";
import Link from "next/link";
import { priceFormat, slugify } from "@/lib/utils";
import { Button } from "../ui/button";
import { IProduct } from "@/lib/models/ProductModel";

interface ProductItemProps {
  id: string;
  title: string;
  price?: number;
  slug: string;
  discountPercentage?: number;
  stock: number;
  images: any[];
  isNewProduct?: boolean;
  isFreeShipping?: boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  title,
  price,
  slug,
  discountPercentage,
  stock,
  images,
  isNewProduct,
  isFreeShipping,
}) => {
  return (
    <div className="flex flex-col justify-between drop-shadow-md rounded-xl p-5 bg-white group h-full">
      <figure className="relative h-full">
        <Link
          href={`/product/${slug}`}
          title={title}
          className="flex justify-center items-center w-full h-full rounded-xl bg-white overflow-hidden mb-2 relative"
        >
          {images && images.length > 0 ? (
            <Image src={images[0]} alt={title} width={200} height={200} />
          ) : (
            <div>Resim Yok</div>
          )}
        </Link>
        <div className="w-14 absolute space-y-1 -top-3 -right-3">
          {discountPercentage && (
            <div className="flex flex-col justify-center w-14 items-center bg-red-600 text-white rounded-lg h-9 text-[10px] font-extrabold text-center leading-[1.19] uppercase shadow-sm">
                <span className="font-black text-sm">%{Math.round(discountPercentage)}</span> İNDİRİM
            </div>
          )}
          {isFreeShipping && (
            <div className="flex flex-col justify-center w-14 items-center bg-amber-600 text-white rounded-lg h-9 text-[10px] font-extrabold text-center leading-[1.19] uppercase shadow-sm">
              Ücretsiz Kargo
            </div>
          )}
          {isNewProduct && (
            <div className="flex flex-col justify-center w-14 items-center bg-emerald-600 text-white rounded-lg h-9 text-[10px] font-extrabold text-center leading-[1.19] uppercase shadow-sm">
              Yeni Ürün
            </div>
          )}
        </div>
      </figure>
      <aside className="flex flex-col justify-between items-center">
        <Link href={`/${slug}`}>
          <h3 className="text-base font-medium line-clamp-2 text-center leading-tight">{title}</h3>
        </Link>
        <div className="flex items-center justify-center my-3 space-x-1">
          <span className="text-lg text-slate-700 font-bold">
            {priceFormat("USD", "TRY", "tr-TR", price || 0)}
          </span>
          <span className="text-sm text-slate-600 font-bold">
            - {priceFormat("USD", "USD", "en-US", price || 0)}
          </span>
        </div>
        {/* <div className="w-full">
          {stock && stock > 0 ? (
            <Button size="sm" className="w-full font-semibold">
              Sepete Ekle
            </Button>
          ) : (
            <Button size="sm" className="w-full font-semibold" disabled>
              Tükendi
            </Button>
          )}
        </div> */}
      </aside>
    </div>
  );
};

export default ProductItem;
