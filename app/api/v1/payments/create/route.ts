import PaymentModel, { IPayment } from "@/lib/models/PaymentModel";
import dbConnect from "@/lib/mongodb";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const {
    title,
    description,
    image,
    type,
    transactionCost,
    status,
    queue,
    apiKey,
    privApiKey,
  } = await request.json();

  await dbConnect();

  const newAddress: IPayment = new PaymentModel({
    title,
    description,
    image,
    type,
    transactionCost,
    status,
    queue,
    apiKey,
    privApiKey,
  });

  try {
    await newAddress.save();

    return Response.json({ message: "Ödeme seçeneği oluşturuldu" }, { status: 201 });
  } catch (error: any) {
    return Response.json(
      {
        message: `Ödeme seçeneği oluşturulurken bir hata oluştu. HATA: ${error.message}`,
      },
      { status: 500 }
    );
  }
}