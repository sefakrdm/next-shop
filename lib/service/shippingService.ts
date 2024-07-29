import { cache } from "react";
import dbConnect from "../mongodb";
import ShippingsModel, { IShipping } from "../models/ShippingModel";

export const revalidate = 3600; //! verileri en fazla saatte bir yeniden doğrulayın

const getAll = cache(async (): Promise<IShipping[] | null> => {
  await dbConnect();
  const shippings = await ShippingsModel.find({ status: true }).lean().exec();

  if (!shippings || shippings.length === 0) {
    return null;
  } else {
    return JSON.parse(JSON.stringify(shippings));
    // return addresses
  }
});

const shippingService = {
  getAll,
}

export default shippingService;