import { cache } from "react";
import dbConnect from "../mongodb";
import AddressModel, { IAddress } from "../models/AddressModel";

export const revalidate = 3600; //! verileri en fazla saatte bir yeniden doğrulayın

const getByUserId = cache(async (userId: string | null): Promise<IAddress[] | null> => {
  await dbConnect();
  const addresses = await AddressModel.find({ userId: userId }).lean().exec();

  if (!addresses || addresses.length === 0) {
    return null;
  } else {
    return JSON.parse(JSON.stringify(addresses));
    // return addresses
  }
});

const addressService = {
    getByUserId,
}

export default addressService;