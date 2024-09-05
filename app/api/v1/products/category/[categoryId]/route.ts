import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
// defaults to auto
export async function GET(request: NextRequest, { params }: { params: { categoryId: string } }) {

  try {
    const searchParams = request.nextUrl.searchParams;
    const get = searchParams.get('get');
    const limitParam = searchParams.get('limit');

    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const products = await db.product.findMany({
      where: { categoryId: params.categoryId },
      include: { category: true, ProductImages: true},
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    if(!products || products.length === 0) {
      return NextResponse.json({ products: null });
    }

    return NextResponse.json({ products }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred while fetching data." });
  }

}