import {
  LayoutDashboard,
  Users,
  Shield,
  Cpu,
  HardDrive,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { NavLink } from "react-router-dom";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Roles", url: "/roles", icon: Shield },
  { title: "Devices", url: "/devices", icon: Cpu },
  { title: "Gateways", url: "/gateways", icon: HardDrive },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>EdgePulse</SidebarGroupLabel>

          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                    <NavLink to="/">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    </NavLink>
                </SidebarMenuButton>
            </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-accent">
                <Avatar className="h-9 w-9">
                    <AvatarFallback>AP</AvatarFallback>
                </Avatar>

                <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">
                    Arvind Patkal
                    </span>

                    <span className="text-xs text-muted-foreground">
                    Super Admin
                    </span>
                </div>
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" side="top">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </SidebarFooter>
    </Sidebar>
  );
}