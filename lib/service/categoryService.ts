import { cache } from "react";
import dbConnect from "../mongodb";
import CategoryModel, { ICategory } from "../models/CategoryModel";

export const revalidate = 3600; //! verileri en fazla saatte bir yeniden doğrulayın

const getLatest = cache(async (limit: number | null): Promise<ICategory[] | null> => {
  await dbConnect();
  const categories = await CategoryModel.find().limit(limit || 10).exec();

  if (!categories || categories.length === 0) {
    return null;
  } else {
    return JSON.parse(JSON.stringify(categories));
  }
});

const getChildCategories = cache(
  async (categoryId: string): Promise<ICategory[] | null> => {
    await dbConnect();
    const categories = await CategoryModel.find({
      parentCategory: categoryId,
    }).exec();

    if (!categories || categories.length === 0) {
      return null;
    } else {
      return categories;
    }
  }
);

const getBySlug = cache(async (slug: string): Promise<ICategory | null> => {
    await dbConnect();
    const category = await CategoryModel.aggregate([
      { $match: { slug } },
      { $limit: 1 },
    ]).exec();

    if(!category || category.length === 0) {
      return null
    } else {
      return JSON.parse(JSON.stringify(category[0]));
    }
});

const categoryService = {
    getLatest,
    getChildCategories,
    getBySlug
}

export default categoryService;