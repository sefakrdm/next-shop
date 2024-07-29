import React from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import {
  Heart,
  MagnifyingGlass,
  ShoppingBag,
  User,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import BasketSheet from "./BasketSheet";
import { Button } from "../ui/button";
import AccountMenu from "./AccountMenu";

const MainHead: React.FC = () => {
  return (
    <section className="">
      <div className="container">
        <div className="flex items-center justify-between flex-nowrap h-20">
          <div>
            <Link href="/">
              <Image
                src="/images/bercostore-yeni-logo.png"
                className="object-contain"
                width="200"
                height="130"
                alt=""
              />
            </Link>
          </div>
          <div className="flex items-center justify-between w-96 h-12 relative">
            <Input
              type="text"
              placeholder="Ürün ara..."
              className="w-full outline-none rounded-xl focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 h-full"
            />
            <button className="bg-slate-100 py-2 px-4 rounded-r-xl absolute top-0 right-0 h-full border uppercase text-sm font-semibold">
              {/* <MagnifyingGlass size={18} /> */}
              Ara
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <AccountMenu />
            <Button variant="ghost" className="h-12 rounded-xl">
              <Heart size={24} />
            </Button>
            <BasketSheet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainHead;
