import ReviewModel, { IReview } from "@/lib/models/ReviewModel";
import dbConnect from "@/lib/mongodb";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { rate, comment, userName, userId, productId } = await request.json(); // Gelen JSON verisini al

  const spaceIndex = userName.indexOf(" "); // İsim ve soyadın arasındaki boşluk indeksi
  const firstName = userName.substring(0, spaceIndex); // İsim
  const lastName = userName.substring(spaceIndex + 1); // Soyad
  const maskedLastName = lastName[0] + "*".repeat(lastName.length - 1); // İlk harften sonra gizlenen soyad
  const maskedFullName = firstName + " " + maskedLastName; // İsim ve gizlenen soyadın birleştirilmiş hali

  await dbConnect(); // MongoDB bağlantısını başlat

  const newReview: IReview = new ReviewModel({
    rate,
    comment,
    userName: maskedFullName,
    userId,
    productId,
  });

  try {
    await newReview.save();

    return Response.json({ message: "İnceleme oluşturuldu" }, { status: 201 });
  } catch (error: any) {
    return Response.json(
      {
        message: `İnceleme oluşturulurken bir hata oluştu. HATA: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
