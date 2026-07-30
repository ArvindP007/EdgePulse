import { useQuery } from "@tanstack/react-query";

import { getCustomerOptions } from "@/features/customers/services/customerService";

export function useCustomersOptions(){
    return useQuery({
        queryKey:["customer-options"],
        queryFn: getCustomerOptions
    });
}