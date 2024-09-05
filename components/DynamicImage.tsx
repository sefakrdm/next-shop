"use server"
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { getImage } from '@/lib/getImage'

export default async function DynamicImage({
  url,
  alt,
  width,
  height,
  containerClass,
  className
}: {
  url: string
  alt?: string
  width?: number
  height?: number
  containerClass?: string
  className?: string
}) {
  const { base64, img } = await getImage(url)

  return (
    <div className={cn('relative', containerClass)}>
      <Image
        {...img}
        alt={alt || ''}
        placeholder='blur'
        blurDataURL={base64}
        width={width}
        height={height}
        className={className}
      />
    </div>
  )
}