import React from "react";
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
import AddToCart from "../products/AddToCart";
import ImageGallery from "../products/ImageGallery";
import ProductReviews from "../products/ProductReviews";
import reviewService from "@/lib/service/reviewService";
import axios from "axios";
import { ProductTypes } from "@/utils/definitions";
import AddFavoriteButton from "./AddFavoriteButton";
import { auth } from "@/lib/auth";
import favoriteService from "@/lib/service/favoriteService";

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

  const session = await auth();

  
  const product = await productService.getBySlug(slug);
  const relatedProduct = await productService.getByCategoryId(product?.categoryId || '', 10);
  // const reviews = await reviewService.getByProductId(product?.id || '', 10);
  
  const isFavorite = await favoriteService.getByUserProductId(product?.id || '', session?.user.id || '');

  // Ortalama puanı hesapla
  const totalReviews = product?.Review?.length ?? 0;
  const totalRating = product?.Review?.reduce((sum, review) => sum + review.rate, 0) ?? 0;
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
                <BreadcrumbLink href={`/category/${product?.category.slug}`}>
                  {product?.category.title}
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
              {product?.ProductImages && product?.ProductImages.length != 0 && (
                // <Image
                //   src={product?.images[0]}
                //   fill
                //   alt={product?.title || ""}
                //   className="object-contain"
                // />
                <ImageGallery
                  images={JSON.parse(JSON.stringify(product.ProductImages))}
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
                    {`${product?.Review?.length ?? "0"} Değerlendirme`}
                  </a>
                </div>
              </div>
              <div className="flex flex-col mb-1">
                <span className="text-3xl font-bold text-slate-800">
                  {product?.price?.currency &&
                    product?.price &&
                    priceFormat(
                      product?.price?.currency,
                      product?.price?.currency,
                      "tr-TR",
                      product?.price?.sellPrice || 0
                    )}
                </span>
                <span className="text-base font-bold text-slate-600">
                  -{" "}
                  {product?.price?.currency &&
                    product?.price &&
                    priceFormat(
                      product?.price?.currency,
                      "USD",
                      "tr-TR",
                      product?.price?.sellPrice || 0
                    )}
                </span>
              </div>
              <p className="text-sm text-gray-600">Fiyatlara KDV Dahildir</p>
              <p className="mt-10">{product?.shortDescription}</p>
              <div className="flex items-center justify-between space-x-3.5 mt-10">
                {product && (
                  <AddToCart item={product} />
                )}
                <AddFavoriteButton product={product ?? null} isFavorite={isFavorite} />
              </div>
              <div className="flex items-center space-x-5 mt-5">
                <Button
                  variant="link"
                  className="flex items-center space-x-1.5 text-sm font-semibold text-gray-600 p-0 h-auto"
                >
                  <Shuffle size={16} weight="bold" />
                  <span>Karşılaştır</span>
                </Button>
              </div>
              <div className="shrink-0 border h-[1px] w-full my-5"></div>
              <div className="flex flex-col space-y-1 text-sm">
                <div>
                  <strong>Kategori:</strong>{" "}
                  <Link href={`/category/${product?.category.slug}`}>
                    {product?.category.title}
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
                Değerlendirmeler ({product?.Review?.length ?? "0"})
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
                reviews={product?.Review ? product?.Review : []}
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
                          product={lProd}
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