"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getImage } from "@/lib/getImage";

export default function ClientImage({
  url,
  alt,
  width,
  height,
  fill,
  containerClass,
  className,
}: {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  containerClass?: string;
  className?: string;
}) {
  const [imageData, setImageData] = useState<{ base64: string; img: any } | null>(null);

  useEffect(() => {
    // Fetch image data on client side
    const loadImage = async () => {
        const data = await getImage(url)
      setImageData(data);
    };

    loadImage();
  }, [url]);

  if (!imageData) {
    return <div className="loading"></div>;
  }

  return (
    <Image
      {...imageData.img}
      alt={alt || ""}
      placeholder="blur"
      blurDataURL={imageData.base64}
      width={width}
      height={height}
      fill={fill}
      className={className}
    />
  );
}