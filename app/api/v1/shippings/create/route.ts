import ShippingsModel, { IShipping } from "@/lib/models/ShippingModel";
import dbConnect from "@/lib/mongodb";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const {
    title,
    image,
    price,
    status
  } = await request.json();

  await dbConnect();

  const newAddress: IShipping = new ShippingsModel({
    title,
    image,
    price,
    status
  });

  try {
    await newAddress.save();

    return Response.json({ message: "Kargo seçeneği oluşturuldu" }, { status: 201 });
  } catch (error: any) {
    return Response.json(
      {
        message: `Kargo seçeneği oluşturulurken bir hata oluştu. HATA: ${error.message}`,
      },
      { status: 500 }
    );
  }
}