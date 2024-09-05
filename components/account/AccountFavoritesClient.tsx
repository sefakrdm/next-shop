"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ProductItem from "../products/ProductItem";
import axios from "axios";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";
import { FavoriteTypes } from "@/utils/definitions";

interface AccountFavoritesClientProps {
  favorites: FavoriteTypes[];
}
const AccountFavoritesClient:React.FC<AccountFavoritesClientProps> = ({ favorites }) => {
  const { data: session } = useSession();

  const [favoriteProducts, setFavoriteProducts] = useState<any[] | null>(favorites);
  const [filteredProducts, setFilteredProducts] = useState<any[] | null>(favorites);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (searchValue && favoriteProducts) {
      const filtered = favoriteProducts.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(favoriteProducts);
    }
  }, [searchValue, favoriteProducts]);

  const handleRemoveFavorite = async (id: string) => {
    await axios
      .delete(`/api/v1/products/favorites/remove`, {
        data: { userId: session?.user.id, productId: id }
      })
      .then((response) => {
        if (
          response.data.data.products &&
          Array.isArray(response.data.data.products)
        ) {
          setFavoriteProducts(response.data.data.products);
          setFilteredProducts(response.data.data.products);
        } else {
          setFavoriteProducts(null);
          setFilteredProducts(null);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Favorilerim</h1>
        <Input
          placeholder="Favorilerde ara..."
          className="w-80"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
      </div>
      <Separator className="my-5" />
      {!filteredProducts ? (
        <div className="grid grid-cols-4 gap-5">
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index} className="w-[220px] h-[360px] rounded-xl" />
          ))}
        </div>
      ) : favoriteProducts && favoriteProducts.length > 0 ? (
        filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-4 gap-5">
            {filteredProducts.map((product, index) => (
              <ProductItem
                key={index}
                product={product}
                isFavorited
                handleRemoveFavorite={handleRemoveFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-5">
            <p>Aradığınız ürün bulunmadı.</p>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center space-y-5">
          <h2 className="text-lg font-semibold">
            Henüz favorilerinize ürün eklemediniz.
          </h2>
          <Button>Ürünlere göz at</Button>
        </div>
      )}
    </>
  );
};

export default AccountFavoritesClient;