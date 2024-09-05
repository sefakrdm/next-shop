import { CategoryTypes } from "@/utils/definitions";
import { cache } from "react";
import { db } from "../db";

export const revalidate = 3600; //! verileri en fazla saatte bir yeniden doğrulayın

const getLatest = cache(async (limit: number | null): Promise<CategoryTypes[] | null> => {

  const categories = await db.category.findMany({
    where: { parentCategoryId: null },
    include: { childCategories: true },
    orderBy: { createdAt: "desc" },
    take: limit || 10,
  });

  if (!categories || categories.length === 0) {
    return null;
  } else {
    return categories as unknown as CategoryTypes[];
  }
});

const getChildCategories = cache(async (categoryId: string): Promise<CategoryTypes[] | null> => {

  const categories = await db.category.findMany({
    where: { parentCategoryId: categoryId },
    include: { childCategories: true },
    orderBy: { createdAt: "desc" },
  });

  if(!categories || categories.length === 0) {
    return null
  } else {
    return categories as unknown as CategoryTypes[];
  }
});

const getBySlug = cache(async (slug: string): Promise<CategoryTypes | null> => {

    const category = await db.category.findFirst({
      where: { slug: slug },
      include: { childCategories: true },
      orderBy: { createdAt: "desc" },
      take: 1,
    });

    if(!category) {
      return null
    } else {
      return category as unknown as CategoryTypes;
    }
});

const categoryService = {
    getLatest,
    getChildCategories,
    getBySlug
}

export default categoryService;