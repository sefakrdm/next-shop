"use client";

import { ProductTypes } from "@/utils/definitions";
import React from "react";
import { Button } from "../ui/button";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import { IProduct } from "@/lib/models/ProductModel";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface AddFavoriteProps {
    product?: IProduct | null;
}

const AddFavoriteButton = ({ product }: AddFavoriteProps) => {
  const { data: session } = useSession();

  const handleAddFavorite = async () => {
    await axios
      .post(`/api/v1/products/favorites/add/`, { "product": product, "userId": session?.user._id,  })
      .then((response) => {
        if(response.status === 201) {
          toast.success(response.data.message);
        }
        if(response.status === 409) {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message);
      });
  };

  return (
    <Button
      variant="link"
      className="flex items-center space-x-1.5 text-sm font-semibold text-gray-600 p-0 h-auto"
      onClick={handleAddFavorite}
    >
      <Heart size={16} weight="bold" />
      <span>İstek Listesine Ekle</span>
    </Button>
  );
};

export default AddFavoriteButton;
