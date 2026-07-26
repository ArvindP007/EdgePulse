import { Download } from "lucide-react";
import type { Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

interface ExportDropdownProps<TData> {
  table: Table<TData>;
}

function toCsv(rows: Array<Record<string, unknown>>, columns: string[]) {
  const header = columns.join(",");
  const lines = rows.map((row) =>
    columns.map((column) => JSON.stringify(row[column] ?? "")).join(",")
  );
  return [header, ...lines].join("\n");
}

export default function ExportDropdown<TData>({ table }: ExportDropdownProps<TData>) {
  const exportCsv = () => {
    const visibleColumns = table
      .getAllLeafColumns()
      .filter(col => col.getIsVisible())
      .map(col => col.id);

    const rows = table.getRowModel().rows.map((row) => {
      const obj: Record<string, unknown> = {};
      row.getVisibleCells().forEach((cell) => {
        obj[cell.column.id] = cell.getValue();
      });
      return obj;
    });

    const csv = toCsv(rows, visibleColumns);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportCsv}>Export Visible CSV</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
