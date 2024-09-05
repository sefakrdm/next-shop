import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { productId: string } }) {

  try {
    const reviews = await db.review.findMany({
      where: { productId: params.productId },
      orderBy: { createdAt: "desc" },
    });

    if(!reviews || reviews.length === 0) {
      return NextResponse.json({ reviews: null });
    }

    return NextResponse.json({ reviews }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred while fetching data." });
  }

}