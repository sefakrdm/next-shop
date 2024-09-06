import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(request: NextRequest) {
  const { userId, productId } = await request.json();

  try {
    const favorite = await db.favorite.findFirst({
      where: { userId: userId },
    });

    if(!favorite) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const result = await db.favoriteProduct.delete({
      where: {
        productId_favoriteId: {
          favoriteId: favorite.id,
          productId: productId,
        },
      }
    });

    if (!result) {
      return NextResponse.json(
        { message: "Product not found in favorites" },
        { status: 404 }
      );
    }
    const favorites = await db.favoriteProduct.findMany({
      where: {
        favorite: {
          userId: userId,
        },
      },
      include: {
        product: true,
      },
    });

    const products = favorites.map(fp => fp.product);

    return NextResponse.json({
      message: "Product removed from favorites",
      data: { products: products || [] },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Error removing product from favorites. ERROR: ${error.message}`,
      },
      { status: 500 }
    );
  }
}