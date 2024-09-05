import { AddressTypes } from "@/utils/definitions";
import { cache } from "react";
import { db } from "../db";

export const revalidate = 3600; //! verileri en fazla saatte bir yeniden doğrulayın

const getByUserId = cache(async (userId: string | null): Promise<AddressTypes[] | null> => {

  const addresses = await db.address.findMany({
    where: { userId: userId || "" },
    orderBy: { createdAt: "desc" },
  })

  if (!addresses || addresses.length === 0) {
    return null;
  } else {
    return addresses as unknown as AddressTypes[];
  }
});

const addressService = {
    getByUserId,
}

export default addressService;