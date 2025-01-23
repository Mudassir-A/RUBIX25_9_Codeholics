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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Menu, User } from "lucide-react";
// import Sidebar from "./Sidebar";
import MenuBar from "@/components/MenuBar";
import LogSidebar from "@/components/SideBar";
import ThemeToggle from "@/components/themeToggle";

export default function NavBar() {
  return (
    <>
      {/* Navbar fixed at the top with margin from the top */}
      <div className="fixed top-5 left-0 right-0 mx-auto p-5 bg-secondary shadow-lg dark:bg-secondary rounded-2xl max-w-screen-lg w-full">
        <div className="flex flex-row justify-between items-center">
          {/* Logo */}
          <div className="w-[50px]">
            <img src="src/assets/logo.png" alt="Logo" />
          </div>

          {/* Menu Bar for larger screens */}
          <div className="hidden md:flex">
            <MenuBar />
          </div>

          {/* Login / Hamburger / Sidebar */}
          <div className="flex flex-row items-center justify-evenly">
            <div className="hidden md:flex">
              <Link to="/login">
                <Button variant="muted" className="text-white">
                  <User />
                  Login/Signup
                </Button>
              </Link>
            </div>
            <div className="hidden md:flex text-white">
              {/* Theme Toggle & Avatar Dropdown (commented for now) */}
            </div>
            {/* LogSidebar component */}
            <LogSidebar />
          </div>
        </div>
      </div>
    </>
  );
}
