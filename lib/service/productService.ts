import { cache } from "react";
import dbConnect from "../mongodb";
import ProductModel, { IProduct } from "@/lib/models/ProductModel";
import mongoose from "mongoose";

export const revalidate = 3600; //! verileri en fazla saatte bir yeniden doğrulayın

const getLatest = cache(async (limit: number | null): Promise<IProduct[] | null> => {
  await dbConnect();
  const products = await ProductModel.aggregate([
    {
      $sort: { createdAt: -1 },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category_id',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $limit: limit || 10,
    },
  ]).exec();

  if (!products || products.length === 0) {
    return null;
  } else {
    return JSON.parse(JSON.stringify(products));
  }
});

const getFeatured = cache(async (limit: number | null): Promise<IProduct[] | null> => {
  await dbConnect();
  const products = await ProductModel.aggregate([
    {
      $match: { isFeatured: true },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $limit: limit || 10,
    },
  ]).exec();

  if (!products || products.length === 0) {
    return null;
  } else {
    return JSON.parse(JSON.stringify(products));
  }
});

const getBySlug = cache(async (slug: string): Promise<IProduct | null> => {
    await dbConnect();
    const product = await ProductModel.aggregate([
      { $match: { slug } },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $limit: 1 },
    ]).exec();

    if(!product || product.length === 0) {
      return null
    } else {
      return JSON.parse(JSON.stringify(product[0]));
    }
});

const getByCategoryId = cache(async (categoryId: string, limit: number | null): Promise<IProduct[] | null> => {
  await dbConnect();
  const objectId = new mongoose.Types.ObjectId(categoryId);
  const products = await ProductModel.aggregate([
    { $match: { categoryId: objectId } },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      },
    },
    { $limit: limit || 10 },
  ]).exec();

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