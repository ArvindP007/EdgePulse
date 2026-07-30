import { useMemo, useState } from "react";
import type { Table } from "@tanstack/react-table";
import DataToolbar from "@/components/common/DataToolbar";
import { DataTable } from "@/components/common/DataTable";
import ColumnsDropdown from "@/components/common/ColumnsDropdown";
import ExportDropdown from "@/components/common/ExportDropdown";
import PageLoader from "@/components/common/PageLoader";

import CustomerDialog from "../components/CustomerDialog";
import { customerColumns } from "../components/CustomerColumns";
import { useCustomers } from "../hooks/useCustomers";
import type { Customer } from "../types";
import DeleteCustomerDialog from "../components/DeleteCustomerDialog";

export default function CustomerPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const { data, isLoading } = useCustomers(
    1,
    10,
    search
  );

  const [tableInstance, setTableInstance] = useState<Table<Customer> | null>(null);

  // if (isLoading && !data) {
  //   return <PageLoader />;
  // }

  const columns = useMemo(
    () =>
      customerColumns(
        (customer) => {
          setSelectedCustomer(customer);
          setOpen(true);
        },
        (customer) => {
          setSelectedCustomer(customer);
          setDeleteOpen(true);
        }
      ),
    []
  );

  return (
    <div className="space-y-6">
        <DataToolbar
      search={search}
      onSearchChange={setSearch}
      addButtonText="Add Customer"
      onAdd={() => {
        setSelectedCustomer(null);
        setOpen(true);
      }}
      actions={
        <>
          {tableInstance && <ColumnsDropdown table={tableInstance} />}
          {tableInstance && <ExportDropdown table={tableInstance} />}
        </>
      }
    />

    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
      <DataTable
        columns={columns}
        data={data?.items ?? []}
        isLoading={isLoading}
        onTableInstance={setTableInstance}
      />
    </div>
      <CustomerDialog
        open={open}
        onOpenChange={setOpen}
        customer={selectedCustomer}
      />
      <DeleteCustomerDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          customer={selectedCustomer}
      />
    </div>
  );
}

