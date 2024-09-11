"use client"

import { cn } from '@/lib/utils';
import { Chats, Heart, IdentificationCard, MapPinLine, ShoppingBagOpen } from '@phosphor-icons/react/dist/ssr';
import moment from 'moment';
import "moment/locale/tr";
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const AccountSidebar: React.FC = () => {

    const { data: session } = useSession();
    const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-col justify-center bg-white drop-shadow-md rounded-lg space-y-2.5 p-5">
        <div className="font-semibold text-xl">Hesabım</div>
        <p>
          Hoş geldin{" "}
          <strong>{session?.user.name + " " + session?.user.surname}</strong>
        </p>
        <p className='text-xs text-muted-foreground'>Son giriş:{" "} <strong>{moment(new Date(session?.user.lastLogin || new Date())).format("LLL")}</strong></p>
      </div>
      <div className="bg-white drop-shadow-md rounded-lg space-y-2.5 p-5">
        <ul className="flex flex-col w-full space-y-1">
          <li>
            <Link
              href="/account"
              className={cn(
                "flex items-center space-x-2 w-full p-3 hover:bg-blue-600/10 hover:text-blue-600 rounded-md transition-all duration-150",
                pathname === "/account" && "bg-blue-600/10 text-blue-600 font-semibold"
              )}
            >
                <IdentificationCard size={26} weight={pathname === "/account" ? "fill" : "regular"} />
              <div>Hesap Bilgilerim</div>
            </Link>
          </li>
          <li>
            <Link
              href="/account/orders"
              className={cn(
                "flex items-center space-x-2 w-full p-3 hover:bg-blue-600/10 hover:text-blue-600 rounded-md transition-all duration-150",
                pathname === "/account/orders" && "bg-blue-600/10 text-blue-600 font-semibold"
              )}
            >
                <ShoppingBagOpen size={26} weight={pathname === "/account/orders" ? "fill" : "regular"} />
              <div>Siparişlerim</div>
            </Link>
          </li>
          <li>
            <Link
              href="/account/my-favorites"
              className={cn(
                "flex items-center space-x-2 w-full p-3 hover:bg-blue-600/10 hover:text-blue-600 rounded-md transition-all duration-150",
                pathname === "/account/my-favorites" && "bg-blue-600/10 text-blue-600 font-semibold"
              )}
            >
                <Heart size={26} weight={pathname === "/account/my-favorites" ? "fill" : "regular"} />
              <div>Favorilerim</div>
            </Link>
          </li>
          <li>
            <Link
              href="/account/my-assessment"
              className={cn(
                "flex items-center space-x-2 w-full p-3 hover:bg-blue-600/10 hover:text-blue-600 rounded-md transition-all duration-150",
                pathname === "/account/my-assessment" && "bg-blue-600/10 text-blue-600 font-semibold"
              )}
            >
                <Chats size={26} weight={pathname === "/account/my-assessment" ? "fill" : "regular"} />
              <div>Değerlendirmelerim</div>
            </Link>
          </li>
          <li>
            <Link
              href="/account/addresses"
              className={cn(
                "flex items-center space-x-2 w-full p-3 hover:bg-blue-600/10 hover:text-blue-600 rounded-md transition-all duration-100",
                pathname === "/account/addresses" && "bg-blue-600/10 text-blue-600 font-semibold"
              )}
            >
                <MapPinLine size={26} weight={pathname === "/account/addresses" ? "fill" : "regular"} />
              <div>Adreslerim</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AccountSidebar