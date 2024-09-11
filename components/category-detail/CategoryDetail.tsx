"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Link from "next/link";
import dynamic from "next/dynamic";
import DetailHead from "./DetailHead";
import { CategoryTypes, ProductTypes } from "@/utils/definitions";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { locale } from "moment";

const ProductItem = dynamic(
  () => import("../products/ProductItem").then((mod) => mod.ProductItem),
  {
    loading: () => <Skeleton className="rounded-xl w-full h-[360px]" />,
    ssr: false,
  }
);

interface CategoryDetailProps {
  category: CategoryTypes;
  categories: CategoryTypes[];
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({
  category,
  categories,
}) => {
  const [viewProduct, setViewProduct] = React.useState<string>("grid-4");
  const handleViewProduct = (value: string) => {
    setViewProduct(value);
  };

  const [products, setProducts] = useState<ProductTypes[]>([]);

  const searchParams = useSearchParams();
  const listOption = searchParams.get("l");

  const getOrderType = (option: string | null) => {
    switch (option) {
      case "1":
        return "createdAt";
      case "2":
        return "price.buyPrice";
      case "3":
        return "price.sellPrice";
      default:
        return "createdAt";
    }
  };

  const getDirection = (option: string | null) => {
    switch (option) {
      case "1":
        return "desc";
      case "2":
        return "asc";
      case "3":
        return "asc";
      default:
        return "desc";
    }
  };

  const apiData = useMemo(() => {
    return {
      categoryId: category?.id,
      categorySlug: category?.slug,
      filterList: [],
      locale: "tr",
      order: {
        direction: getDirection(listOption),
        type: getOrderType(listOption),
      },
      page: 1,
      limit: 10,
    };
  }, [category?.id, category?.slug, listOption]);

  useEffect(() => {
    const getProducts = async () => {
      await axios
        .post(`/api/v1/products/category/slug/${category?.slug}`, apiData)
        .then((response) => {
          if (response.data.products != null) {
            setProducts(response.data.products);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getProducts();
  }, [apiData, category?.slug]);

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
                <BreadcrumbPage>{category?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="mt-20">
        <div className="container">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-3 max-h-full h-full sticky top-2">
              <div className="bg-white rounded-xl shadow p-5 space-y-2.5">
                <h2 className="text-xl font-semibold">Alt Kategoriler</h2>
                <div className="flex flex-col space-y-0.5 max-h-72 overflow-y-auto">
                  {Array.isArray(categories) &&
                    categories.length > 0 &&
                    categories.map((cat, index) => (
                      <Link key={index} href={`/${cat.slug}`}>
                        {cat.title}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-span-9">
              <DetailHead
                category={category ?? ({} as CategoryTypes)}
                handleViewProduct={handleViewProduct}
              />
              <div
                className={cn(
                  "grid gap-5",
                  viewProduct === "grid-4" ? "grid-cols-4" : "grid-cols-3"
                )}
              >
                {products && products?.length > 0 ? (
                  <>
                    {products?.map((prod, index) => (
                      <ProductItem key={index} product={prod} />
                    ))}
                  </>
                ) : (
                  <div>Bu kategoride ürün bulunamadı...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryDetail;
