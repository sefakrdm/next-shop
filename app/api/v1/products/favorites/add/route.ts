import FavoriteModel, { IFavorite } from "@/lib/models/FavoritesModel";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { product, userId } = await request.json(); // Gelen JSON verisini al

  await dbConnect(); // MongoDB bağlantısını başlat

  try {
    // Ürünün zaten kullanıcının favorilerinde olup olmadığını kontrol edin
    const isFavorite = await FavoriteModel.findOne({
      userId: userId,
      "products._id": product._id,
    }).lean();

    if (isFavorite) {
      return Response.json(
        { message: "Bu ürün zaten favorilere eklenmiş" },
        { status: 409 }
      );
    }

    // Kullanıcının zaten bir favori girişi olup olmadığını kontrol edin
    const userFavorites = await FavoriteModel.findOne({ userId: userId });

    if (userFavorites) {
      // Add the new product to the existing user's favorites
      userFavorites.products.push(product);
      await userFavorites.save();

      return Response.json(
        { message: "Ürün favorilere eklendi" },
        { status: 201 }
      );
    } else {
      // If the user has no favorites, create a new favorites entry
      const newFavorite: IFavorite = new FavoriteModel({
        userId,
        products: [product],
      });

      await newFavorite.save();

      return Response.json(
        { message: "Ürün favorilere eklendi" },
        { status: 201 }
      );
    }
  } catch (error: any) {
    return Response.json(
      {
        message: `Favorilere eklenirken bir hata oluştu. HATA: ${error.message}`,
      },
      { status: 500 }
    );
  }
}