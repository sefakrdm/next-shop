import { db } from "@/lib/db";
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

  try {
    // const address = await db.address.create({
    //   data: {
    //     title,
    //     name,
    //     surname,
    //     addressLine1,
    //     addressLine2,
    //     province,
    //     district,
    //     postalCode,
    //     userId,
    //   },
    // });

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