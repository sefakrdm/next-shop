import { Metadata } from 'next';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import Form from './Form';

export const metadata: Metadata = {
  title: "Hesabım"
} 

const AccountPage = async () => {
  return (
    <>
      <h1 className="text-xl font-semibold">Hesap Bilgilerim</h1>
      <Separator className="my-5" />
      <Form />
    </>
  );
}

export default AccountPage