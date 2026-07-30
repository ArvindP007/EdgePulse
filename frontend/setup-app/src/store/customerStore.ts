import {create} from "zustand";
import type { CustomerOption } from "@/features/customers/types";

interface CustomerState {
    selectedCustomer: CustomerOption | null;
    setSelectedCustomer:(customer: CustomerOption) => void;
    clearSelectedCustomer: () => void;
}

export const useCustomerStore = 
create<CustomerState>((set) => ({
    selectedCustomer :null,
    setSelectedCustomer:(customer) => 
        set({
            selectedCustomer:customer,
        }),
    clearSelectedCustomer:()=>
        set({
            selectedCustomer:null,
        }),
}));
