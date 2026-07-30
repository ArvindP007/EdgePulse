import EdgePulseLogo from "@/assets/device-logo.svg";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { ChevronsUpDown,Check } from "lucide-react";

import { useCustomersOptions } from "@/hooks/useCustomerOptions";
import { useCustomerStore} from "@/store/customerStore";
import { Spinner } from "../ui/spinner";

export default function CustomerSelector(){

    const { data:customers = [], isLoading} = useCustomersOptions();
    const { selectedCustomer, setSelectedCustomer} = useCustomerStore();

    useEffect(()=>{
        if(!selectedCustomer && customers.length > 0){
            setSelectedCustomer(customers[0]);
        }
    }, [customers, selectedCustomer, setSelectedCustomer]);

    return (
        <SidebarMenu>
            <SidebarMenuItem> 
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" 
                className="data-[state=open]:bg-sidebar-accent
                 data-[state=open]:text-sidebar-accent-foreground"
                >
                    <img
                        src={EdgePulseLogo}
                        alt="EdgePulse"
                        className="h-6 w-6 shrink-0"
                    />

                    <div className="flex flex-col text-left">
                        <span className="text-sm font-semibold">
                        EdgePulse
                        </span>

                        <span className="text-xs text-muted-foreground">
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Spinner className="size-3" />
                                    Loading...
                                </span>
                                ) : (
                                selectedCustomer?.name ?? "Select Customer"
                            )}
                        </span>
                    </div>
                    <ChevronsUpDown className="truncate text-xs text-muted-foreground"/>
                </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="start"
                side="bottom"
                className="min-w-56"
            >
                <DropdownMenuLabel>
                Customers
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {customers.map((customer)=>
                    <DropdownMenuItem key={customer.id}
                     onClick={()=> setSelectedCustomer(customer)}
                    >
                        {customer.name}
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
            </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu> 
    );
}