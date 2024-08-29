import FavoriteModel, { IFavorite } from "@/lib/models/FavoritesModel";
import dbConnect from "@/lib/mongodb";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { userId } = await request.json(); // Gelen JSON verisini al

  await dbConnect(); // MongoDB bağlantısını başlat

  try {
    // Ürünün zaten kullanıcının favorilerinde olup olmadığını kontrol edin
    const favorites = await FavoriteModel.findOne({
      userId: userId
    }).lean().exec();

    if (!favorites || favorites.length === 0) {
      return Response.json(
        { message: "Veri bulunamadı", data: null },
        { status: 204 }
      );
    } else {
      return Response.json(
        { message: "OK", data: favorites },
        { status: 201 }
      );
      // return addresses
    }
  } catch (e) {
    return Response.json(
      { message: "Veriler getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}