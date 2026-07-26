import { Search, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ReactNode } from "react";

interface DataToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  searchPlaceholder?: string;

  addButtonText: string;
  onAdd: () => void;

  actions?: ReactNode;
}

export default function DataToolbar({
  search,
  onSearchChange,
  addButtonText,
  onAdd,
  actions,
}: DataToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

      <div className="flex flex-1 flex-col gap-3 sm:flex-row">

        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            className="pl-9"
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          {addButtonText}
        </Button>

      </div>

      <div className="flex gap-2">
        {actions}
      </div>

    </div>
  );
}