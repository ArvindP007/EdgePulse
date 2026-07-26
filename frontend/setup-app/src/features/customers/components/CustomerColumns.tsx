import type { ColumnDef } from "@tanstack/react-table";
import type { Customer } from "../types";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


export const customerColumns = (
  onEdit: (customer: Customer) => void,
  onDelete: (customer: Customer) => void
): ColumnDef<Customer>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contactPerson",
    header: "Contact",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },
  {
    id: "actions",

    cell: ({ row }) => {
          const customer = row.original;

          return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => onEdit(customer)
                        }
                    >
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDelete(customer)
                        }
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
      }
  }
];