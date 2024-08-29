import { cache } from "react";
import dbConnect from "../mongodb";
import FavoriteModel, { IFavorite } from "../models/FavoritesModel";

export const revalidate = 3600; //! verileri en fazla saatte bir yeniden doğrulayın

const getByUserId = cache(async (id: string): Promise<IFavorite[] | null> => {
  await dbConnect();
  const favorites = await FavoriteModel.find({ userId: id }).exec();

  if (!favorites || favorites.length === 0) {
    return null;
  } else {
    return JSON.parse(JSON.stringify(favorites));
    // return addresses
  }
});

const favoriteServices = {
  getByUserId,
}

export default favoriteServices;