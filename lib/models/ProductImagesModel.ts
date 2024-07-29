import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./ProductModel";

export interface IImage extends Document {
  _id: string;
  productId: IProduct["_id"];
  isMain: boolean;
  isVideo?: boolean | null;
  order: number;
  fileName: string;
}


const productImagesSchema = new Schema(
  {
    productId:{ type: Schema.Types.ObjectId, ref: 'Product', required: true },
    isMain: Boolean,
    isVideo: Boolean,
    order: Number,
    fileName: String,
  },
  {
    timestamps: true,
  }
);

const ProductImagesModel = mongoose.models.ProductImage || mongoose.model('ProductImage', productImagesSchema);

export default ProductImagesModel;