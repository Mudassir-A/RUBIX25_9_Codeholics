import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
export default function MenuBar() {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="pr-6">
            <Link href="/reviews" legacyBehavior passHref>
              <NavigationMenuLink className="hover:bg-primary p-3 rounded-md">
                Home
              </NavigationMenuLink>
            </Link>
            {/* <NavigationMenuTrigger className="bg-transparent">
              Home
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gapr-10 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li>Some thing</li>
                <li>Some thing</li>
              </ul>
            </NavigationMenuContent> */}
          </NavigationMenuItem>
          <NavigationMenuItem className="pr-6">
            <Link href="/ecoscore" legacyBehavior passHref>
              <NavigationMenuLink className="hover:bg-primary p-3 rounded-md">
                Check Eco Score
              </NavigationMenuLink>
            </Link>
            {/* <NavigationMenuTrigger className="bg-transparent">
              About
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gapr-10 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                <li>Some thing</li>
                <li>Some thing</li>
              </ul>
            </NavigationMenuContent> */}
          </NavigationMenuItem>
          <NavigationMenuItem className="pr-6">
            <Link href="/reviews" legacyBehavior passHref>
              <NavigationMenuLink className="hover:bg-primary p-3 rounded-md">
                Reviews
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="pr-6">
            <Link href="/reviews" legacyBehavior passHref>
              <NavigationMenuLink className="hover:bg-primary p-3 rounded-md">
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
