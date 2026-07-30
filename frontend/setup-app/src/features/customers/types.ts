export interface Customer {
  id: string;
  name: string;
  code?: string;
  email?: string;
  contactPerson?: string;
  phoneNumber?: string;
  address: string;
}

export interface GetCustomersRequest {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
}

export interface CustomerOption {
    id: string;
    name: string;
}
export interface CreateCustomerRequest {
  name: string;
  code: string;
  email: string;
  contactPerson: string;
  phoneNumber: string;
  address: string;
}

export type UpdateCustomerRequest = CreateCustomerRequest;
