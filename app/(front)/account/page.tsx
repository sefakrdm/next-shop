import AccountSidebar from '@/components/account/AccountSidebar';
import { Metadata } from 'next';
import React from 'react';
import Form from './Form';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: "Hesabım"
} 

const AccountPage = async () => {
  return (
    <section className="mt-10">
      <div className="container">
        <div className="flex items-start gap-10">
          <div className="w-3/12">
            <AccountSidebar />
          </div>
          <div className="w-9/12 bg-white drop-shadow-sm rounded-lg p-5">
            <h1 className="text-xl font-semibold">Hesap Bilgilerim</h1>
            <Separator className="my-5" />
            <Form />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AccountPage