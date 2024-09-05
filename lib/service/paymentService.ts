import { cache } from "react";
import { PaymentTypes } from "@/utils/definitions";
import { db } from "../db";

export const revalidate = 3600; //! verileri en fazla saatte bir yeniden doğrulayın

const getAll = cache(async (): Promise<PaymentTypes[] | null> => {

  const payments = await db.payment.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (!payments || payments.length === 0) {
    return null;
  } else {
    return JSON.parse(JSON.stringify(payments));
    // return addresses
  }
});

const paymentService = {
  getAll,
}

export default paymentService;