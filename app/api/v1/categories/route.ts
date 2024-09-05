import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  try {
    const searchParams = request.nextUrl.searchParams;
    const get = searchParams.get('get');
    const limitParam = searchParams.get('limit');

    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const categories = await db.category.findMany({
      where: { parentCategoryId: null },
      include: { childCategories: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    if (!categories) {
      return NextResponse.json({ categories: null });
    }

    return NextResponse.json(categories, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "An error occurred while fetching data." });
  }

}