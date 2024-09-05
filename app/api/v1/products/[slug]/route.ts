import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request, { params }: { params: { slug: string } }) {

  try {
    const product = await db.product.findMany({
      where: { slug: params.slug },
      include: {
        category: true,
        ProductImages: true,
        favorites: {
          include: {
            favorite: true
          }
        }
      },
      orderBy: { createdAt: "desc" },
    });

    if(!product || product.length === 0) {
      return NextResponse.json({ product: null });
    }

    return NextResponse.json({ product }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred while fetching data." });
  }

}