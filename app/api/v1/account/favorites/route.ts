import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({
        req,
        salt: "",
        secret: ""
    });

    if (!token || !token.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = token.sub;

    const favorites = await db.favorite.findMany({
      where: { userId: userId },
      include: { products: true },
      orderBy: { createdAt: "desc" },
    });

    if (!favorites) {
      return NextResponse.json({ favorites: [] });
    }

    return NextResponse.json({ favorites }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while fetching data.",
    });
  }
}