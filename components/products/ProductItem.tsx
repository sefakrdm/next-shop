import React from "react";
import Image from "next/image";
import Link from "next/link";
import { priceFormat } from "@/lib/utils";
import { Button } from "../ui/button";
import { X } from "@phosphor-icons/react/dist/ssr";
import { ProductTypes } from "@/utils/definitions";
import { Rating as ReactRating, RoundedStar } from '@smastrom/react-rating';
import "@smastrom/react-rating/style.css";
import ClientImage from "../ClientImage";

interface ProductItemProps {
  product: ProductTypes;
  isFavorited?: boolean;
  handleRemoveFavorite?: (id: string) => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  isFavorited,
  handleRemoveFavorite,
}) => {

  const totalReviews = product.Review?.length || 0;
  
  const totalRating = product.Review.reduce((sum, review) => sum + review.rate, 0);
  const averageRating =
    totalReviews > 0 ? (totalRating / totalReviews).toFixed(2) : "0.00";

  return (
    <div className="flex flex-col justify-between drop-shadow-md rounded-xl p-5 bg-white group h-full relative">
      {isFavorited && (
        <Button
          size="icon"
          className="absolute top-2 right-2 rounded-full bg-white hover:bg-slate-100 h-8 w-8 text-muted-foreground drop-shadow-sm border hover:border-primary hover:text-primary transition-all z-30"
          onClick={() => handleRemoveFavorite?.(product.id)}
        >
          <X size={19} />
        </Button>
      )}
      <figure className="relative h-full">
        <Link
          href={`/product/${product?.slug}`}
          prefetch={true}
          title={product?.title}
          className="flex justify-center items-center w-full h-full rounded-xl bg-white overflow-hidden mb-2 relative"
        >
          {product.ProductImages && product.ProductImages.length > 0 ? (
            (() => {
              const mainImage = product.ProductImages.find(
                (image) => image.isMain
              );
              return mainImage ? (
                <ClientImage
                  url={mainImage.url}
                  alt={mainImage.alt}
                  fill
                  className="object-contain"
                  containerClass="w-52 h-60"
                />
              ) : (
                // <Image
                //   src={mainImage.url}
                //   alt={mainImage.alt}
                //   width={200}
                //   height={200}
                // />
                // <Image
                //   src={product.ProductImages[0].url}
                //   alt={product.ProductImages[0].alt}
                //   width={200}
                //   height={200}
                // />
                <ClientImage
                  url={product.ProductImages[0].url}
                  alt={product.ProductImages[0].alt}
                  fill
                  className="object-contain"
                  containerClass="w-52 h-60"
                />
              );
            })()
          ) : (
            <div>Resim Yok</div>
          )}
        </Link>
        <div className="w-14 absolute space-y-1 -top-3 -left-3">
          {product.discountPercentage && (
            <div className="flex flex-col justify-center w-14 items-center bg-red-600 text-white rounded-lg h-9 text-[10px] font-extrabold text-center leading-[1.19] uppercase shadow-sm">
              <span className="font-black text-sm">
                %{Math.round(product.discountPercentage)}
              </span>{" "}
              İNDİRİM
            </div>
          )}
          {product.isFreeShipping && (
            <div className="flex flex-col justify-center w-14 items-center bg-amber-600 text-white rounded-lg h-9 text-[10px] font-extrabold text-center leading-[1.19] uppercase shadow-sm">
              Ücretsiz Kargo
            </div>
          )}
          {product.isNewProduct && (
            <div className="flex flex-col justify-center w-14 items-center bg-emerald-600 text-white rounded-lg h-9 text-[10px] font-extrabold text-center leading-[1.19] uppercase shadow-sm">
              Yeni Ürün
            </div>
          )}
        </div>
      </figure>
      <aside className="flex flex-col justify-between items-start space-y-2">
        <Link href={`/${product.slug}`} prefetch={true}>
          <h3 className="text-base font-medium line-clamp-2 text-center leading-tight">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center space-x-1.5">
          <ReactRating
            style={{ maxWidth: 80 }}
            value={parseFloat(averageRating)}
            itemStyles={{
              itemShapes: RoundedStar,
              activeFillColor: "#facc15",
              inactiveFillColor: "#d8d8d8",
            }}
            transition="zoom"
            readOnly
          />
          <p className="text-xs font-semibold">{totalReviews} Yorum</p>
        </div>
        <div className="flex items-center justify-start space-x-1">
          <span className="text-lg text-slate-700 font-extrabold">
            {product?.prices &&
              product?.prices[0].currency &&
              priceFormat(
                product?.prices[0].currency,
                product?.prices[0].currency,
                "tr-TR",
                product?.prices[0].sellPrice || 0
              )}
          </span>
          {/* <span className="text-sm text-slate-600 font-bold">
            -{" "}
            {product?.prices && product?.prices[0].currency &&
              priceFormat(
                product?.prices[0].currency,
                "USD",
                "tr-TR",
                product?.prices[0].sellPrice || 0
              )}
          </span> */}
        </div>
        <div className="w-full">
          {product.stock && product.stock > 0 ? (
            <Button size="sm" variant="secondary" className="w-full font-semibold">
              Sepete Ekle
            </Button>
          ) : (
            <Button size="sm" variant="secondary" className="w-full font-semibold" disabled>
              Tükendi
            </Button>
          )}
        </div>
      </aside>
    </div>
  );
};

// export default ProductItem;
