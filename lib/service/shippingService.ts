import { ShippingTypes } from "@/utils/definitions";
import { cache } from "react";
import { db } from "../db";

export const revalidate = 3600; //! verileri en fazla saatte bir yeniden doğrulayın

const getAll = cache(async (): Promise<ShippingTypes[] | null> => {

  const shippings = await db.shipping.findMany({
    where: { status: true },
    orderBy: { createdAt: "desc" },
  });

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