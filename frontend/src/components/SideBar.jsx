import React from "react";
import { Button } from "./ui/button";
import { LogOutIcon, Menu, MoonIcon, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";

// import { Switch } from "./ui/switch";
import ThemeToggle from "@/components/themeToggle";

export default function LogSidebar() {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <Sheet>
        <SheetTrigger className="md:hidden flex">
          <Button variant="secondary">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex flex-row items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {isLoggedIn ? (
                JSON.parse(localStorage.getItem("user"))?.username || "User"
              ) : (
                "Guest"
              )}
            </SheetTitle>
            <SheetDescription>
              <hr />
            </SheetDescription>
          </SheetHeader>
          <div className="text-base">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-base">
                  Menu
                </AccordionTrigger>
                <AccordionContent>
                  <Link to="/" className="block py-2">
                    Home
                  </Link>
                  <Link to="/about" className="block py-2">
                    About
                  </Link>
                  <Link to="/ecoscore" className="block py-2">
                    Check Eco Score
                  </Link>
                  {isLoggedIn && (
                    <>
                      <Link to="/community" className="block py-2">
                        Community
                      </Link>
                      <Link to="/profile" className="block py-2">
                        Profile
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full text-left py-2"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </>
                  )}
                  {!isLoggedIn && (
                    <Link to="/login" className="block py-2">
                      Login/Signup
                    </Link>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex-row gap-2 flex items-center mt-4 justify-evenly ">
              <ThemeToggle />
              Toggle Dark/Light Mode
              {/* to be removed */}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
