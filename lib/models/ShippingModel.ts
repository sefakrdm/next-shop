import mongoose, { Document, Schema } from "mongoose";

export interface IShipping extends Document {
    _id: string;
    title: string;
    image?: string;
    price: number;
    status: boolean;
    apiKey: string;
    privApiKey: string;
}

const shippingsSchema = new Schema<IShipping>(
  {
    title: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true, default: false },
    apiKey: { type: String },
    privApiKey: { type: String }
  },
  {
    timestamps: true,
  }
);

const ShippingsModel = mongoose.models.Shipping || mongoose.model<IShipping>("Shipping", shippingsSchema);

export default ShippingsModel;