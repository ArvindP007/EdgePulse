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

import  CustomerSelector from "../common/CustomerSelector";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { NavLink, useLocation } from "react-router-dom";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Roles", url: "/roles", icon: Shield },
  { title: "Devices", url: "/devices", icon: Cpu },
  { title: "Gateways", url: "/gateways", icon: HardDrive },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <CustomerSelector>
        </CustomerSelector>

        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>

          <SidebarMenu>
            {items.map((item) => {
              const isActive = location.pathname === item.url;

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* <div className="rounded-2xl border border-border bg-surface p-3 text-sm text-muted-foreground data-[state=collapsed]:hidden">
          <p className="font-medium">Need help?</p>
          <p className="mt-1 text-xs">Ask your team for access or check docs.</p>
          <button className="mt-3 inline-flex items-center justify-center rounded-full bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90">
            Learn more
          </button>
        </div> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-sidebar-accent group-data-[state=collapsed]:justify-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start group-data-[state=collapsed]:hidden">
                <span className="text-sm font-medium">Arvind Patkal</span>
                <span className="text-xs text-muted-foreground">Super Admin</span>
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