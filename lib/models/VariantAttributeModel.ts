import mongoose, { Document, Schema } from "mongoose";
import { IVariant } from "./VariantModel";
import { IAttribute } from "./AttributeModel";

export interface IVariantAttribute extends Document {
  _id: string;
  variantId: IVariant["_id"];
  attributeId: IAttribute["_id"];
  value: string;

    
//   id ObjectId
//   variantId ObjectId
//   attributeId ObjectId
//   value String
}


const variantAttributeSchema = new Schema(
  {
    variantId: { type: Schema.Types.ObjectId, required: true },
    attributeId: { type: Schema.Types.ObjectId, required: true },
    value: String
  },
  {
    timestamps: true,
  }
);

const VariantAttributeModel = mongoose.models.VariantAttribute || mongoose.model('VariantAttribute', variantAttributeSchema);

export default VariantAttributeModel;