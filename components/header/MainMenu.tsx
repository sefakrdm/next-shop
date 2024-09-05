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
import { cn } from "@/lib/utils";
import { CategoryTypes } from "@/utils/definitions";

const MainMenu: React.FC<{ categories: CategoryTypes[] }> = ({ categories }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-10 font-semibold capitalize text-base">
        {categories.length > 0 &&
          categories.map((cat, index) =>
            cat.childCategories && cat.childCategories.length !== 0 ? (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger
                  className="hover:text-primary transition-all py-3 !bg-transparent hover:!bg-transparent text-base font-semibold"
                >
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-primary transition-all py-3"
                  >
                    {cat.title}
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px] ">
                    {cat.childCategories.map((subCat, subIndex) => (
                      <ListItem
                        key={subIndex}
                        title={subCat.title}
                        href={`/category/${subCat.slug}`}
                      >
                        {subCat.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-primary transition-all py-3"
                  >
                    {cat.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainMenu;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href ?? "#"}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"