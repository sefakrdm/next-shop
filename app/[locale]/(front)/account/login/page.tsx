import React from 'react'
import { Metadata } from 'next';
import Form from './Form';
import DynamicImage from '@/components/DynamicImage';

export const metadata: Metadata = {
  title: 'Giriş Yap',
}

export default async function LoginPage() {
  return (
    <section className="my-16">
      <div className="flex items-center justify-center w-full">
        <div className="flex items-center max-h-screen max-w-5xl bg-background rounded-xl drop-shadow-md relative overflow-hidden">
          <div className="flex flex-col items-start p-10 w-[500px]">
            <h1 className="text-4xl font-extrabold mb-10">Giriş Yap</h1>
            <div className="realative w-full">
              <Form />
            </div>
          </div>
          <div>
            <div className="">
              <DynamicImage
                url={`/uploads/images/login-image.png`}
                alt={""}
                width={500}
                height={500}
                className="object-cover rounded-r-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}