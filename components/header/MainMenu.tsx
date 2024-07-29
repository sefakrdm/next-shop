"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import Link from "next/link";
import { ICategory } from "@/lib/models/CategoryModel";

const MainMenu: React.FC<{ categories: ICategory[] }> = ({ categories }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-10 font-semibold capitalize text-base">
        {/* <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-base font-semibold py-6">
                Item One
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
        {categories &&
          categories.length > 0 &&
          categories.map((cat, index) => (
            <NavigationMenuLink key={index} asChild>
              <Link
                href={`/category/${cat.slug}`}
                className="hover:text-primary transition-all py-3"
              >
                {cat.title}
              </Link>
            </NavigationMenuLink>
          ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainMenu;
