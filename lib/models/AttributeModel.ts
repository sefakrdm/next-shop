import mongoose, { Document, Schema } from "mongoose";

export interface IAttribute extends Document {
  _id: string;
  name: string;
}


const attributeSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AttributeModel = mongoose.models.Attribute || mongoose.model('Attribute', attributeSchema);

export default AttributeModel;