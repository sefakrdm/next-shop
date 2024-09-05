"use client";

import React from "react";
import { Button } from "../ui/button";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { FavoriteTypes, ProductTypes } from "@/utils/definitions";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface AddFavoriteProps {
  product?: ProductTypes | null;
  isFavorite: boolean;
}

const AddFavoriteButton = ({ product, isFavorite }: AddFavoriteProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleAddFavorite = async () => {
    if (isFavorite) {
      await axios
        .delete(`/api/v1/products/favorites/remove`, {
          data: { userId: session?.user.id, productId: product?.id },
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success(response.data.message);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.response.data.message);
        });
    } else {
      await axios
        .post(`/api/v1/products/favorites/add/`, {
          product: product,
          userId: session?.user.id,
        })
        .then((response) => {
          if (response.status === 201) {
            toast.success(response.data.message);
          }
          if (response.status === 409) {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.response.data.message);
        });
    }
    router.refresh();
  };

  return (
    <Button
      variant="outline"
      className="group rounded-md flex-none h-11 w-11"
      size="icon"
      onClick={handleAddFavorite}
    >
      <Heart
        size={26}
        weight={isFavorite ? "fill" : "regular"}
        className={cn(
          "block transition-all duration-300 text-slate-800 group-hover:text-red-500",
          isFavorite && "text-red-500"
        )}
      />
    </Button>
  );
};

export default AddFavoriteButton;