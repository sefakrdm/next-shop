"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ClientImageComponent = ({
  src,
  alt,
  width,
  height,
  fill,
  className,
  style,
  priority,
  ...props
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}) => {
  const [isImageLoading, setImageLoading] = React.useState(true);

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      height={fill ? undefined : height}
      width={fill ? undefined : width}
      onLoad={() => setImageLoading(false)}
      className={cn(
        className,
        "transition-all duration-200 ease-in-out",
        isImageLoading ? "blur-md" : "blur-none"
      )}
      style={style}
      decoding="async"
      priority={priority}
      {...props}
    />
  );
};

export default ClientImageComponent;