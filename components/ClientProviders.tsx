"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from 'next-auth/react';

export default function ClientProviders({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {

  return (
    <SessionProvider session={session}>
      <Toaster />
      {children}
    </SessionProvider>
  );
}
