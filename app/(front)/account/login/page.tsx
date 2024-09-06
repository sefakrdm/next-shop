import React from 'react'
import { Metadata } from 'next';
import Form from './Form';

export const metadata: Metadata = {
  title: 'Giriş Yap',
}

export default async function LoginPage() {
  return (
    <section className="mt-20">
      <div className="flex items-center justify-center max-h-screen max-w-4xl bg-white p-10 rounded-xl drop-shadow-md">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold mb-10">Giriş Yap</h1>
          <div className="realative">
            <Form />
          </div>
        </div>
      </div>
    </section>
  );
}