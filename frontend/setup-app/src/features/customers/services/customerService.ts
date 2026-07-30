import api from "@/services/api";
import type { Customer, CreateCustomerRequest, UpdateCustomerRequest } from "../types";
import type { PagedResult } from "src/types/PagedResult";

export async function getCustomers(
  pageNumber = 1,
  pageSize = 10,
  search = ""
): Promise<PagedResult<Customer>> {
  const { data } = await api.get<PagedResult<Customer>>("/customer", {
    params: { pageNumber, pageSize, search },
  });

  return data;
}

export async function getCustomerOptions(): Promise<Customer[]>{
  const { data } = await api.get<Customer[]>("/customer/options");
  return data;
}

export async function createCustomer(request: CreateCustomerRequest) {
  const { data } = await api.post<Customer>("/customer", request);

  return data;
}

export async function updateCustomer(
  id: string,
  request: UpdateCustomerRequest
) {
  await api.put(`/customer/${id}`, request);
}

export async function deleteCustomer(id: string) {
  await api.delete(`/customer/${id}`);
}
