import mongoose, { Document, Schema } from "mongoose";

export interface IProductAttribute extends Document {
  _id: string;
  productId: string;
  attributeId: string;
  values: any[];

//   id ObjectId
//   productId ObjectId // ref: Product
//   attributesId ObjectId // ref: Attribute
//   valutes ObjectJSON
}


const productAttributeSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    attributeId: { type: Schema.Types.ObjectId, ref: "Attribute", required: true },
    values: Object
  },
  {
    timestamps: true,
  }
);

const ProductAttributeModel = mongoose.models.ProductAttribute || mongoose.model('ProductAttribute', productAttributeSchema);

export default ProductAttributeModel;