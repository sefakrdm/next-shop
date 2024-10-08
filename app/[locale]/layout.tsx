import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const urbanist = Urbanist({ subsets: ["latin"] });

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({locale}));
// }

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale || "tr"}>
      <body className={urbanist.className}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <NextTopLoader
              color="#2563eb"
              shadow="0 0 10px #2563eb,0 0 5px #2563eb,0 0 10px #2563eb"
              height={5}
            />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}