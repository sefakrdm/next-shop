import { cache } from "react";
import dbConnect from "../mongodb";
import PaymentModel, { IPayment } from "../models/PaymentModel";

export const revalidate = 3600; //! verileri en fazla saatte bir yeniden doğrulayın

const getAll = cache(async (): Promise<IPayment[] | null> => {
  await dbConnect();
  const payments = await PaymentModel.find({ status: true }).lean().exec();

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