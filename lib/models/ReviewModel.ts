import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./ProductModel";
import { IUser } from "./UserModel";

export interface IReview extends Document {
  _id: string;
  rate: number;
  comment: string;
  images?: string[];
  userName: string;
  userId: IUser['_id'];
  productId: IProduct['_id'];
  createdAt: Date
}

const reviewSchema = new Schema(
  {
    rate: { type: Number, required: true },
    comment: { type: String, required: true },
    images: [String],
    userName: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  },
  {
    timestamps: true,
  }
);

const ReviewModel = mongoose.models?.Review || mongoose.model('Review', reviewSchema);

export default ReviewModel;