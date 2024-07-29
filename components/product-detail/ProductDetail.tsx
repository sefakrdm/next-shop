import React, { useEffect, useState } from "react";
import { Rating as ReactRating, RoundedStar } from '@smastrom/react-rating';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import productService from "@/lib/service/productService";
import { priceFormat } from "@/lib/utils";
import { Heart, Minus, Plus, Shuffle, Star } from "@phosphor-icons/react/dist/ssr";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import ProductItem from "../products/ProductItem";
import { IProduct } from "@/lib/models/ProductModel";
import { Document, Model, Types, UpdateQuery, MergeType, Query, FlattenMaps, Require_id, UpdateWithAggregationPipeline, Error } from "mongoose";
import AddToCart from "../products/AddToCart";
import ImageMagnifier from "../products/ImageMagnifier";
import ImageGallery from "../products/ImageGallery";
import ProductReviews from "../products/ProductReviews";
import reviewService from "@/lib/service/reviewService";

const ProductDetail = async ({ slug }: { slug: string }) => {
  // const [product, setProduct] = useState<ProductTypes>();

  // useEffect(() => {
  //   const getProduct = async () => {
  //     await axios
  //       .get(`/api/v1/products/${slug}`)
  //       .then((response) => {
  //         if (response.data.data != null) {
  //           setProduct(response.data.data);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  //   getProduct();
  // }, [slug]);

  const product = await productService.getBySlug(slug);
  const relatedProduct = await productService.getByCategoryId(product?.categoryId || '', 10);
  const reviews = await reviewService.getByProductId(product?._id || '', 10);

  // Ortalama puanı hesapla
  const totalReviews = reviews?.length ?? 0;
  const totalRating = reviews?.reduce((sum, review) => sum + review.rate, 0) ?? 0;
  const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(2) : "0.00";

  return (
    <>
      <section className="bg-slate-100/60 py-3">
        <div className="container">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Anasayfa</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/category/${product?.category[0].slug}`}>
                  {product?.category[0].title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="mt-20">
        <div className="container">
          <div className="flex items-stretch">
            <div className="w-1/2">
              {product?.images && product?.images.length != 0 && (
                // <Image
                //   src={product?.images[0]}
                //   fill
                //   alt={product?.title || ""}
                //   className="object-contain"
                // />
                <ImageGallery
                  images={JSON.parse(JSON.stringify(product.images))}
                  className="flex items-start justify-start"
                />
              )}
            </div>
            <div className="w-1/2 rounded-xl bg-white drop-shadow p-10">
              <div className="flex items-start justify-between mb-10">
                <div className="w-3/4 space-y-1">
                  <h1 className="text-4xl font-bold">{product?.title}</h1>
                  {product && product.brand && (
                    <span>Marka: {product.brand}</span>
                  )}
                </div>
                <div className="w-1/4 flex flex-col items-end">
                  <div className="flex items-center space-x-1.5">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {averageRating}
                    </div>
                    <ReactRating
                      style={{ maxWidth: 100 }}
                      value={Math.round(parseFloat(averageRating))}
                      itemStyles={{
                        itemShapes: RoundedStar,
                        activeFillColor: "#facc15",
                        inactiveFillColor: "#d8d8d8",
                      }}
                      transition="zoom"
                      readOnly
                    />
                    {/* <Star size={22} weight="fill" className="text-yellow-400" /> */}
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {`${reviews?.length ?? "0"} Değerlendirme`}
                  </a>
                </div>
              </div>
              <div className="flex flex-col mb-1">
                <span className="text-3xl font-bold text-slate-800">
                  {product?.currency &&
                    product?.price &&
                    priceFormat(
                      product?.currency,
                      "TRY",
                      "tr-TR",
                      product?.price
                    )}
                </span>
                <span className="text-base font-bold text-slate-600">
                  -{" "}
                  {product?.currency &&
                    product?.price &&
                    priceFormat(
                      product?.currency,
                      "USD",
                      "tr-TR",
                      product?.price
                    )}
                </span>
              </div>
              <p className="text-sm text-gray-600">Fiyatlara KDV Dahildir</p>
              <p className="mt-10">{product?.shortDescription}</p>
              <div className="flex items-center space-x-5 mt-10">
                {product && (
                  <AddToCart item={product} />
                )}
              </div>
              <div className="flex items-center space-x-5 mt-5">
                <Button
                  variant="link"
                  className="flex items-center space-x-1.5 text-sm font-semibold text-gray-600 p-0 h-auto"
                >
                  <Shuffle size={16} weight="bold" />
                  <span>Karşılaştır</span>
                </Button>
                <Button
                  variant="link"
                  className="flex items-center space-x-1.5 text-sm font-semibold text-gray-600 p-0 h-auto"
                >
                  <Heart size={16} weight="bold" />
                  <span>İstek Listesine Ekle</span>
                </Button>
              </div>
              <div className="shrink-0 border h-[1px] w-full my-5"></div>
              <div className="flex flex-col space-y-1 text-sm">
                <div>
                  <strong>Kategori:</strong>{" "}
                  <Link href={`/category/${product?.category[0].slug}`}>
                    {product?.category[0].title}
                  </Link>
                </div>
                <div>
                  <strong>Paylaş:</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <div className="container">
          <Tabs defaultValue="description_tab" className="w-full">
            <TabsList className="w-full h-14 rounded-lg drop-shadow">
              <TabsTrigger
                className="text-base font-semibold py-2 rounded-lg px-6"
                value="description_tab"
              >
                Açıklama
              </TabsTrigger>
              <TabsTrigger
                className="text-base font-semibold py-2 rounded-lg px-6"
                value="info_tab"
              >
                Ürün Bilgileri
              </TabsTrigger>
              <TabsTrigger
                className="text-base font-semibold py-2 rounded-lg px-6"
                value="reviews_tab"
              >
                Değerlendirmeler ({reviews?.length ?? "0"})
              </TabsTrigger>
            </TabsList>
            <TabsContent
              className="border bg-slate-50 -mt-2 pt-10 pb-5 px-5 rounded-b-xl"
              value="description_tab"
            >
              Make changes to your account here.
            </TabsContent>
            <TabsContent
              className="border bg-slate-50 -mt-2 pt-10 pb-5 px-5 rounded-b-xl"
              value="info_tab"
            >
              Change your password here.
            </TabsContent>
            <TabsContent
              className="border bg-slate-50 -mt-2 pt-10 pb-5 px-5 rounded-b-xl"
              value="reviews_tab"
            >
              <ProductReviews
                reviews={reviews ? reviews : []}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="mt-20">
        <div className="container">
          <h2 className="text-3xl font-bold mb-5">İlgili Ürünler</h2>
          <div>
            <Carousel>
              <CarouselContent>
                {relatedProduct &&
                  relatedProduct.length > 0 &&
                  JSON.parse(JSON.stringify(relatedProduct)).map(
                    (lProd: any, index: any) => (
                      <CarouselItem className="basis-1/5 pb-5" key={index}>
                        <ProductItem
                          id={lProd._id}
                          title={lProd.title}
                          price={lProd.price}
                          slug={lProd.slug}
                          discountPercentage={
                            lProd.discountPercentage || undefined
                          }
                          stock={lProd.stock}
                          images={lProd.images || []}
                          isNewProduct={lProd.isNewProduct}
                          isFreeShipping={lProd.isFreeShipping}
                        />
                      </CarouselItem>
                    )
                  )}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;