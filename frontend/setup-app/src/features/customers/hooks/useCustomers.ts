import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../services/customerService";

export function useCustomers(
  pageNumber: number,
  pageSize: number,
  search: string
) {
  return useQuery({
    queryKey: ["customers", pageNumber, pageSize, search],

    queryFn: () =>
      getCustomers(pageNumber, pageSize, search),
  });
}