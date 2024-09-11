import type { Metadata } from "next";
import CheckoutHeader from "@/components/checkout/Header";
import CheckoutDetail from "@/components/checkout/CheckoutDetail";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="flex justify-between w-full">
        <div className="w-7/12 py-5 px-10">
          <CheckoutHeader />
          <Separator className="my-5" />
          {children}
        </div>
        <div className="w-5/12 sticky top-0 overflow-x-auto max-h-screen bg-slate-100 py-5 px-10">
          <CheckoutDetail />
        </div>
      </div>
    </section>
  );
}
