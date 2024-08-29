import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./ProductModel";
import { IUser } from "./UserModel";

export interface IFavorite extends Document {
  _id: string;
  userId: IUser['_id'];
  products: IProduct[];
  createdAt: Date
}

const favoriteSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: Object, ref: 'Product', required: true }],
  },
  {
    timestamps: true,
  }
);

const FavoriteModel = mongoose.models?.Favorite || mongoose.model('Favorite', favoriteSchema);

export default FavoriteModel;