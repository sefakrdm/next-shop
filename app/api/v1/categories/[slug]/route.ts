import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {

  try {

    const searchParams = request.nextUrl.searchParams;
    const get = searchParams.get('get');
    const limitParam = searchParams.get('limit');

    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    const category = await db.category.findMany({
      where: { slug: params.slug },
      include: { childCategories: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    })

    if(category.length > 0) {
      return Response.json({ category: null });
    } else {
      return Response.json({ category }, { status: 200 });
    }

  } catch (error) {
    console.log(error);
    return Response.json({ error: "An error occurred while fetching data." });
  }

}