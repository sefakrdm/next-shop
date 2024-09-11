import { ProductTypes } from "@/utils/definitions";
import { cache } from "react";
import { db } from "../db";

export const revalidate = 3600; //! verileri en fazla saatte bir yeniden doğrulayın

const getLatest = cache(async (limit: number | null): Promise<ProductTypes[] | null> => {

  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, ProductImages: true, prices: true },
    take: limit || 10,
  });

  if (!products || products.length === 0) {
    return null;
  } else {
    return JSON.parse(JSON.stringify(products));
  }
});

const getFeatured = cache(async (limit: number | null): Promise<ProductTypes[] | null> => {

  const products = await db.product.findMany({
    where: { isFeatured: true },
    include: { category: true, ProductImages: true, prices: true },
    orderBy: { createdAt: "desc" },
    take: limit || 10,
  });

  if (!products || products.length === 0) {
    return null;
  } else {
    return JSON.parse(JSON.stringify(products));
  }
});

const getBySlug = cache(async (slug: string): Promise<ProductTypes | null> => {

    const product = await db.product.findFirst({
      where: { slug: slug },
      include: { category: true, ProductImages: true, Review: true, prices: true },
      orderBy: { createdAt: "desc" },
      take: 1,
    });

    if(!product) {
      return null
    } else {
      return JSON.parse(JSON.stringify(product));
    }
});

const getByCategoryId = cache(async (categoryId: string, limit: number | null): Promise<ProductTypes[] | null> => {

  const products = await db.product.findMany({
    where: { categoryId: categoryId },
    include: { category: true, ProductImages: true, prices: true },
    orderBy: { createdAt: "desc" },
    take: limit || 10,
  });

  if(!products || products.length === 0) {
    return null
  } else {
    return JSON.parse(JSON.stringify(products));
  }
});

const productService = {
    getLatest,
    getFeatured,
    getBySlug,
    getByCategoryId
}

export default productService;