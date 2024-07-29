import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    _id: string;
    name: string;
    surname: string;
    email: string;
    phone?: string;
    password: string;
    isAdmin: boolean;
    addressId: string;
    address: any[];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    addressId: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models?.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;