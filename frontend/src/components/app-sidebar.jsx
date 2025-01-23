import * as React from "react";
import { GalleryVerticalEnd, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import ThemeToggle from "./themeToggle";

export default function AppSidebar({ ...props }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Navigation data
  const data = {
    navMain: [
      {
        title: "Settings",
        url: "/settings",
      },
      {
        title: "Logout",
        url: "#",
        onClick: handleLogout,
      },
    ],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem >
            <div className="p-3">
              <Avatar>
                <AvatarImage
                  className="rounded-md"
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
              <div className="flex flex-col gap-0.5 leading-none p-4">
                <h2 className="font-semibold">{user.username || "Guest"}</h2>
                <h2 className="">{user.email || "Not logged in"}</h2>
              </div>

          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="p-4">
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 1}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton onClick={item.onClick}>
                      {item.title}{" "}
                      {item.title === "Logout" && <LogOut className="ml-2 h-4 w-4" />}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
