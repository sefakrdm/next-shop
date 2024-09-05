import React from "react";
import ClientProviders from "./ClientProviders";
import { auth } from '@/lib/auth';

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await auth();
  
  return <ClientProviders session={session}>{children}</ClientProviders>;
}