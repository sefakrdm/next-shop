"use client"

import { ArrowLeft, Lock, Password } from '@phosphor-icons/react/dist/ssr'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const CheckoutHeader = () => {

  const router = useRouter();

    const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between w-full">
        <Button variant="outline" onClick={() => router.push("/")}>
          <ArrowLeft className='mr-2' />
          Alışverişe devam et
        </Button>
        <Link href="/">
            <Image src="/images/bercostore-yeni-logo.png" alt="logo" width={190} height={190} />
        </Link>
        <div className="flex items-center space-x-2">
            <div className="text-base font-semibold">Güvenli Alışveriş</div>
            <div className="flex items-center border rounded-md px-1 bg-green-600/20 text-green-600">
              <Lock size={22} />
              <Password size={28} />
            </div>

        </div>
    </div>
  )
}

export default CheckoutHeader