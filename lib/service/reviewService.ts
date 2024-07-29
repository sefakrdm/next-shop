import { cache } from "react";
import dbConnect from "../mongodb";
import ReviewModel, { IReview } from "../models/ReviewModel";

export const revalidate = 3600; //! verileri en fazla saatte bir yeniden doğrulayın

const getByProductId = cache(async (productId: string, limit: number | null): Promise<IReview[] | null> => {
  await dbConnect();
//   const reviews = await ReviewModel.aggregate([
//     { $match: { productId: productId } },
//     {
//       $lookup: {
//         from: 'users',
//         localField: 'userId',
//         foreignField: '_id',
//         as: 'user',
//       },
//     },
//     { $limit: limit || 10 },
//   ]).exec();

  const reviews = await ReviewModel.find({ productId: productId }).sort({ createdAt: -1 }).limit(limit || 10).exec();

  if(!reviews || reviews.length === 0) {
    return null
  } else {
    return JSON.parse(JSON.stringify(reviews));
  }
});

const reviewService = {
    getByProductId,
}

export default reviewService;