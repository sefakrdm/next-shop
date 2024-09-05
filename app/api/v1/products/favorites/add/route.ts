import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { product, userId } = await request.json();

  try {
    const isFavorite = await db.favoriteProduct.findFirst({
      where: {
        favorite: {
          userId: userId,
        },
        productId: product.id,
      },
    });

    if (isFavorite) {
      return NextResponse.json(
        { message: "Bu ürün zaten favorilere eklenmiş" },
        { status: 409 }
      );
    }

    // Kullanıcının zaten bir favori listesi olup olmadığını kontrol edin
    const userFavorites = await db.favorite.findFirst({
      where: { userId: userId },
    });

    if(userFavorites) {
      // Mevcut favori listesine eklenecek ürün ekle
      await db.favoriteProduct.create({
        data: {
          favoriteId: userFavorites.id,
          productId: product.id,
        }
      });
    } else {
      // Kullanıcının favorisi yoksa, yeni bir favori listesi oluşturun ve ürünü ekleyin
      const newFavorite = await db.favorite.create({
        data: {
          userId,
        }
      });

      await db.favoriteProduct.create({
        data: {
          favoriteId: newFavorite.id,
          productId: product.id,
        }
      });
    }

    return NextResponse.json(
      { message: "Ürün favorilere eklendi" },
      { status: 201 }
    );
    
  } catch (error: any) {
    return NextResponse.json(
      {
        message: `Favorilere eklenirken bir hata oluştu. HATA: ${error.message}`,
      },
      { status: 500 }
    );
  }
}