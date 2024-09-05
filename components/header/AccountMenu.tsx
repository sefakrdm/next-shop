"use client"

import React from 'react'
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { User } from '@phosphor-icons/react/dist/ssr';
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const AccountMenu: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();

    const signoutHandler = () => {
        signOut({ callbackUrl: '/account/login' });
    }

    const { data: session } = useSession();

  return (
    <>
      {session && session.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center space-x-2 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white transition-all px-4 py-2 h-12 text-inherit">
              <User size={24} />
              <span>Hesabım</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{session.user.name}{" "}{session.user?.surname}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/account")}>Hesabım</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/account/orders")}>Siparişlerim</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signoutHandler}>Çıkış Yap</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href={`/account/login?callbackUrl=${pathname == "/account/login" || pathname == "/account/register" ? "/" : pathname}`}
          className="flex items-center space-x-2 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white transition-all px-4 py-2 h-12"
        >
          <User size={24} />
          <div className="flex flex-col items-start -space-y-0.5">
            <span>Giriş Yap</span>
          </div>
        </Link>
      )}
    </>
  );
}

export default AccountMenu