"use server"
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { getImage } from '@/lib/getImage'

export default async function DynamicImage({
  url,
  alt,
  width,
  height,
  fill,
  containerClass,
  className,
  priority,
  ...props
}: {
  url: string
  alt?: string
  width?: number
  height?: number
  fill?: boolean
  containerClass?: string
  className?: string
  priority?: boolean
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
        fill={fill}
        className={className}
        priority={priority}
        {...props}
      />
    </div>
  )
}