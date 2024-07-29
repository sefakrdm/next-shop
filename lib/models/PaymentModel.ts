import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
    _id: string;
    title: string;
    description?: string;
    image?: string;
    type: string;
    transactionCost?: number;
    status: boolean;
    queue: number;
    apiKey: string;
    privApiKey: string;
}

const paymentSchema = new Schema<IPayment>(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String },
    type: { type: String, required: true },
    transactionCost: { type: Number },
    status: { type: Boolean, required: true, default: false },
    queue: { type: Number, required: true, default: 999 },
    apiKey: { type: String },
    privApiKey: { type: String }
  },
  {
    timestamps: true,
  }
);

const PaymentModel = mongoose.models.Payment || mongoose.model<IPayment>("Payment", paymentSchema);

export default PaymentModel;