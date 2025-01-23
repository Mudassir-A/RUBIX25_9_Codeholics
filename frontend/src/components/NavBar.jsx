import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token") !== null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar fixed at the top with margin from the top */}
      <div className="fixed top-5 left-0 right-0 mx-auto p-5 bg-secondary shadow-lg dark:bg-secondary rounded-2xl max-w-screen-lg w-full">
        <div className="flex flex-row justify-between items-center">
          {/* Logo */}
          <div className="w-[50px]">
            <Link to="/">
              <img src="src/assets/logo.png" alt="Logo" />
            </Link>
          </div>

          {/* Menu Bar for larger screens */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-accent">
              Home
            </Link>
            {/* <Link to="/about" className="text-white hover:text-accent">
              About
            </Link> */}
            <Link to="/ecoscore" className="text-white hover:text-accent">
              Check Eco Score
            </Link>
            {isLoggedIn && (
              <Link to="/community" className="text-white hover:text-accent">
                Community
              </Link>
            )}
          </div>

          {/* Login / Profile / Logout */}
          <div className="flex flex-row items-center space-x-4">
            <div className="hidden md:flex">
              {isLoggedIn ? (
                <>
                  <Link to="/profile">
                    <Button variant="muted" className="text-white mr-2">
                      <User className="mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Button
                    variant="muted"
                    className="text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button variant="muted" className="text-white">
                    <User className="mr-2" />
                    Login/Signup
                  </Button>
                </Link>
              )}
            </div>
            {/* Mobile menu */}
            <div className="md:hidden">
              <LogSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
