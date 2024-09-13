import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { rate, comment, images, hiddenName, userId, productId } = await req.json();

    const userObjectId = userId ? ObjectId.createFromHexString(userId) : null;
    const productObjectId = productId ? ObjectId.createFromHexString(productId) : null;

    const user = await db.user.findUnique({
      where: { id: userObjectId?.toString() },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const reviewData: any = {
      rate,
      comment,
      images,
      hiddenName,
      userId,
      productId
    };

    const review = await db.review.create({
      data: reviewData,
    });

    return NextResponse.json({ status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Ürün değerlendirmasi oluşturulurken bir hata oluştu. HATA: ${error.message}`,
      },
      { status: 500 }
    );
  }
}