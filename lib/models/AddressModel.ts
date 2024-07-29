import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./UserModel";

export interface IAddress extends Document {
    _id: string;
    title: string;
    name: string;
    surname: string;
    addressLine1: string;
    addressLine2: string;
    province: string;
    district: string;
    postalCode: string;
    userId: Schema.Types.ObjectId | IUser;
}

const addressSchema = new Schema<IAddress>(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, required: true },
    province: { type: String, required: true },
    district: { type: String, required: true },
    postalCode: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const AddressModel = mongoose.models.Address || mongoose.model<IAddress>("Address", addressSchema);

export default AddressModel;