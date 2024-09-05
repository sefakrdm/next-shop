import { cache } from "react";
import { db } from "../db";
import { ReviewTypes } from "@/utils/definitions";

export const revalidate = 3600; //! verileri en fazla saatte bir yeniden doğrulayın

const getByProductId = cache(async (productId: string, limit: number | null): Promise<ReviewTypes[] | null> => {

  try {
    const reviews = await db.review.findMany({
      where: { productId: productId },
      orderBy: { createdAt: "desc" },
      take: limit || 10,
    });

    if(!reviews || reviews.length === 0) {
      return null;
    } else {
      return reviews as ReviewTypes[];
    }
    
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    return null;
  }
});

const reviewService = {
    getByProductId,
}

export default reviewService;