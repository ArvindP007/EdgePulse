import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  type Table as TanTable,
} from "@tanstack/react-table";
import { useEffect, useState, type ReactNode } from "react";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Table as UiTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Spinner } from "@/components/ui/spinner";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading: boolean;
  onTableInstance?: (table: TanTable<TData>) => void;
  topActions?: (table: TanTable<TData>) => ReactNode;
}

export function DataTable<TData>({
  columns,
  data,
  isLoading = false,
  onTableInstance,
  topActions,
}: DataTableProps<TData>) {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  useEffect(() => {
    onTableInstance?.(table as unknown as TanTable<TData>);
  }, [table, onTableInstance]);

  return (
    <div className="rounded-md border">

      {topActions ? (
        <div className="flex items-center justify-end gap-2 p-2">
          {topActions(table as unknown as TanTable<TData>)}
        </div>
      ) : null}

      <UiTable>
        <TableHeader className="sticky top-0 bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="font-semibold whitespace-nowrap"
                >
                  {header.isPlaceholder ? null : header.column.getCanSort() ? (
                    <Button
                      variant="ghost"
                      className="h-8 p-0 hover:bg-transparent"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-32 text-center text-muted-foreground"
              >
                <div className="flex items-center justify-center gap-2">
                  <Spinner className="size-4" />
                  <span>Loading customers...</span>
                </div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                className={`
                  hover:bg-muted/50 transition-colors
                  ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}
                `}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-32 text-center text-muted-foreground"
              >
                No records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </UiTable>

      <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground">
        <span>
          Total Records: <strong>{data.length}</strong>
        </span>
      </div>
    </div>
  );
}