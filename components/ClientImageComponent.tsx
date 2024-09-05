"use client"

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
 
const ClientImageComponent = ({ src, alt, width, height, fill, className }: {
    src: string
    alt: string
    width?: number
    height?: number
    fill?: boolean
    className?: string
}) => {
  const [isImageLoading, setImageLoading] = React.useState(true);

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      height={width}
      width={height}
      onLoad={() => setImageLoading(false)}
      className={cn(
        "transition-all duration-300 ease-in-out",
        className,
        isImageLoading ? "blur-xl" : "blur-none"
      )}
      loading="lazy"
      decoding="async"
    />
  );
}

export default ClientImageComponent;