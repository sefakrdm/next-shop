import { FavoriteTypes } from "@/utils/definitions";
import { cache } from "react";
import { db } from "../db";

export const revalidate = 3600; //! verileri en fazla saatte bir yeniden doğrulayın

const getByUserId = cache(
  async (id: string): Promise<FavoriteTypes[] | null> => {

    const favorites = await db.favoriteProduct.findMany({
      where: { favorite: { userId: id } },
      include: { 
        product: { 
          include: {
            ProductImages: true 
          }
        } 
      },
    });

    if (!favorites || favorites.length === 0) {
      return null;
    } else {
      const products = favorites.map((fp) => fp.product);
      return products as unknown as FavoriteTypes[];
    }
  }
);

const getByUserProductId = cache(
  async (
    productId: string,
    userId: string
  ): Promise<boolean> => {
    if (!userId || !productId) return false;

    const favorites = await db.favoriteProduct.findMany({
      where: { productId: productId, favorite: { userId: userId } },
    });

    if (!favorites || favorites.length === 0) {
      return false;
    } else {
      return true;
    }
  }
);

const favoriteService = {
  getByUserId,
  getByUserProductId,
};

export default favoriteService;