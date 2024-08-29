"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import { Button } from "../ui/button";

const FavoritesButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className="h-12 rounded-xl"
      onClick={() => router.push("/account/my-favorites")}
    >
      <Heart size={24} />
    </Button>
  );
};

export default FavoritesButton;
