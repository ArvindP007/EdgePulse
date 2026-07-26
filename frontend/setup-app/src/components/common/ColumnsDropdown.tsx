import { Columns3 } from "lucide-react";
import type { Table } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

interface ColumnsDropdownProps<TData> {
  table: Table<TData>;
}

export default function ColumnsDropdown<TData>({
  table,
}: ColumnsDropdownProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Columns3 className="mr-2 h-4 w-4" />
          Columns
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {table
          .getAllLeafColumns()
          .filter((column) => column.getCanHide() && column.id !== "actions")
          .map((column) => {
            const rawHeader = column.columnDef.header;
            const label =
              typeof rawHeader === "string"
                ? rawHeader
                : column.id;

            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {label}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}