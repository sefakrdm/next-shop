import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <section>
        <div className="container">
          <Separator className="my-8" />
          <div className="flex items-center justify-between">
            <div>
              <div className='text-xl font-semibold'>E-Bültenimize Kayıt Olun!</div>
              <p>Hemen kayıt olun, yeni ürünler ve size öze fırsatları kaçırmayın!</p>
            </div>
            <div className="flex items-center space-x-2.5">
              <Input placeholder="E-Posta Adresiniz" />
              <Button>Kayıt Ol</Button>
            </div>
          </div>
          <Separator className="my-8" />
            <div className="grid grid-cols-7 gap-8">
              <div className='col-span-3'>
                <Image src="/images/bercostore-yeni-logo.png" alt="logo" width={200} height={200} />
                <div>Müşteri Hizmetleri: 0232 328 3424</div>
                <div>E-Posta Adresi: info@bersa.com.tr</div>
                <div>Ulaşım Bilgileri: AOSB Mahallesi 10001 Sokak No: 7 Çiğli/İzmir - Türkiye</div>
              </div>
              <div>
                <div className="text-sm font-bold uppercase">Kategoriler</div>
                <div className="text-sm">Bersa</div>
                <div className="text-sm">Bersa</div>
                <div className="text-sm">Bersa</div>
              </div>
              <div>
                <div className="text-sm font-bold uppercase">Müşteri Hizmetleri</div>
                <div className="text-sm">Bersa</div>
                <div className="text-sm">Bersa</div>
              </div>
              <div>
                <div className="text-sm font-bold uppercase">Yardım</div>
                <div className="text-sm">Bersa</div>
                <div className="text-sm">Bersa</div>
              </div>
              <div>
                <div className="text-sm font-bold uppercase">Kurumsal</div>
                <div className="text-sm">Bersa</div>
                <div className="text-sm">Bersa</div>
              </div>
            </div>
            <Separator className="mt-8" />
            <div className="flex items-center justify-center my-4">
              <div>Bercostore.com Tüm Hakları Saklıdır</div>
            </div>
        </div>
    </section>
  )
}

export default Footer