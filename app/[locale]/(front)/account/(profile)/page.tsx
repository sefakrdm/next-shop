import { Metadata } from 'next';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import dynamic from 'next/dynamic';
import { auth } from '@/lib/auth';
import { redirect } from '@/i18n/routing';

const Form = dynamic(() => import('./Form').then((mod) => mod.default), {
  loading: () => <div>Yükleniyor...</div>,
});

export const metadata: Metadata = {
  title: "Hesabım"
} 

const AccountPage = async () => {
    const session = await auth();

    if (!session) {
      redirect("/account/login")
    };

  return (
    <>
      <h1 className="text-xl font-semibold">Hesap Bilgilerim</h1>
      <Separator className="my-5" />
      <Form />
    </>
  );
}

export default AccountPage