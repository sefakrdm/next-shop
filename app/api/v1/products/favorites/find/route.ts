import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // const { userId } = await request.json(); // Gelen JSON verisini al

  try {
    // Ürünün kullanıcının favorilerinde olup olmadığını kontrol edin
    const favorites = await db.favoriteProduct.findMany({
      where: {
        favorite: {
          userId: "66d85564f7ddaea39511105c",
        },
      },
      include: {
        product: true,
      },
    });

    if (Array(favorites) && favorites.length === 0) {
      return NextResponse.json(
        { favorites: null, message: "Veri bulunamadı" },
        { status: 204 }
      );
    } else {
      const products = favorites.map(fp => fp.product);
      return NextResponse.json(
        { products },
        { status: 201 }
      );
      // return addresses
    }
  } catch (e) {
    return NextResponse.json(
      { message: "Veriler getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}