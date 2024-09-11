import TopBar from "@/components/header/TopBar";
import MainHead from "@/components/header/MainHead";
import MainNav from "@/components/header/MainNav";
import Footer from "./Footer";

// const LazyFooter = dynamic(() => import("../Footer").then((mod) => mod.SaleProducts), {
//   loading: () => <div>Yükleniyor...</div>,
//   ssr: false,
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <TopBar />
        <MainHead />
      </header>
      <MainNav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
