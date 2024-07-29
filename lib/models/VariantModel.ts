import mongoose, { Document, Schema } from "mongoose";

export interface IVariant extends Document {
  _id: string;
  productId: string;
  price: number;
  stock: number;
  sku: string;
  thumbnailImageId: any[];
  image: any[];

    
//   id ObjectId
//   productId ObjectId
//   price Double
//   quantity Number // default: 0
//   thumbnailImageId String
//   sku String
}


const variantSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true },
    stock: { type: BigInt, required: true, default: 0 },
    sku: { type: String, required: true },
    thumbnailImageId: { type: [Schema.Types.ObjectId] },
  },
  {
    timestamps: true,
  }
);

const VariantModel = mongoose.models.Variant || mongoose.model('Variant', variantSchema);

export default VariantModel;