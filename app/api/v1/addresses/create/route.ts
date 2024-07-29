import AddressModel, { IAddress } from "@/lib/models/AddressModel";
import dbConnect from "@/lib/mongodb";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const {
    title,
    name,
    surname,
    addressLine1,
    addressLine2,
    province,
    district,
    postalCode,
    userId,
  } = await request.json();

  await dbConnect();

  const newAddress: IAddress = new AddressModel({
    title,
    name,
    surname,
    addressLine1,
    addressLine2,
    province,
    district,
    postalCode,
    userId,
  });

  try {
    await newAddress.save();

    return Response.json({ message: "Adres oluşturuldu" }, { status: 201 });
  } catch (error: any) {
    return Response.json(
      {
        message: `Adres oluşturulurken bir hata oluştu. HATA: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
