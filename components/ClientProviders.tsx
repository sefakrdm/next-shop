"use client";

import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from 'next-auth/react';
import { useRouter } from "next/navigation";

export default function ClientProviders({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {

  const router = useRouter();

  useEffect(() => {
    const id = setInterval(async () => {
      /* 
       The first time reload is called, you would get the cached page,
       and in the background, Next.js will revalidate the page so that
       the next time reload is called, you get the updated page.
      */
      router.refresh();
    }, 120000);

    return () => clearInterval(id);
  }, [router]);

  return (
    <SessionProvider session={session}>
      <Toaster />
      {children}
    </SessionProvider>
  );
}
